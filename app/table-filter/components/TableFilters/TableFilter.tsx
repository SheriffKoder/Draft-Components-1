/**
 * TableFilter Component
 * 
 * This component provides a reusable dropdown filter for table columns with various filtering capabilities:
 * - Text filtering with search
 * - Multi-select filtering within columns
 * - Date range filtering
 * - Number range filtering
 * - Hour range filtering
 * 
 * Enhanced Features:
 * - Proper handling of zero values (0, 0.00) in numeric filters
 * - Visual distinction between available and unavailable filter options
 * - Active filter badges with ability to remove individual filters
 * - Accurate filter counts that respect other active column filters
 * - Sorting of filter options to prioritize available items
 * 
 * Flow:
 * 1. Component initialization and state setup
 * 2. Data processing to get unique values with counts
 * 3. Filter value processing based on search term
 * 4. Event handlers for various filter types
 * 5. Rendering filter UI with proper styling
 */

import { ProjectWithStats } from "@/types/dashboard";
import { ChevronDown, Check, FilterIcon, Search } from "lucide-react";
import { useRef, useEffect, useState, useMemo } from "react";
import { DateRangeFilter } from "./DateRangePicker";
import { formatDate } from "../../utils/format";
import NumberRangeFilter from "./NumberRangeFilter";
import HourRangeFilter from "./HourRangeFilter";

/**
 * TableFilter Component Props
 * 
 * @param {string} columnKey - The key of the column to filter
 * @param {string} columnName - The display name of the column
 * @param {Array<any>} data - The original data to compare against
 * @param {Array<any>} filteredData - The filtered data
 * @param {Array<string>} activeFilters - Currently active filters for this column
 * @param {Function} onFilterChange - Callback when filters change
 * @param {boolean} isDateField - Whether this column contains date values
 * @param {boolean} isNumberField - Whether this column contains numeric values
 * @param {boolean} isLastColumn - Whether this is the last column in the table
 * @param {boolean} isHourField - Whether this column contains hour values
 * @param {Function} formatDisplayValue - Optional function to format display values
 * @param {number} decimalPlaces - Number of decimal places for number fields
 * @param {Array<string>} allActiveFilterColumns - Information about all active filters
 */
interface TableFilterProps {
  columnKey: string;
  columnName: string;
  data: any[]; // original data to compare against
  filteredData: any[]; // filtered data
  activeFilters: string[];
  onFilterChange: any;
  isDateField?: boolean;
  isNumberField?: boolean;
  isLastColumn?: boolean;
  isHourField?: boolean;
  formatDisplayValue?: (value: any) => string;
  decimalPlaces?: number;
  allActiveFilterColumns?: Record<string, string[]>;
}

//==========================================================================
// HELPER FUNCTIONS
//==========================================================================

/**
 * Helper function to get a value from an item using a key path
 * Supports nested keys with dot notation (e.g., "user.name")
 * 
 * @param {any} item - The object to extract value from
 * @param {string} key - The key or path to the value
 * @returns {any} The extracted value or undefined if not found
 */
const getValueFromItem = (item: any, key: string): any => {
  if (!item) return undefined;
  
  // Handle nested keys with dot notation (e.g., "user.name")
  if (key.includes('.')) {
    const keys = key.split('.');
    let value = item;
    for (const k of keys) {
      if (value === undefined || value === null) return undefined;
      value = value[k];
    }
    return value;
  }
  
  // Handle simple keys
  return item[key];
};

const TableFilter = ({ 
  columnKey, // The key of the data to filter in the data object
  columnName, // The name will be displayed to the user in the table header
  data, // original data to compare against
  filteredData, // The filtered data
  activeFilters, // Currently active filters for this column
  onFilterChange, // Callback when filters change
  isDateField = false, // Add this new prop to identify date fields
  isNumberField = false, // Add this new prop to identify number fields
  isLastColumn,   // to make the dropdown not exceed width with the last column
  isHourField = false, // Add this new prop
  formatDisplayValue, // Optional function to format display values
  decimalPlaces = 2, // Number of decimal places for number fields
  allActiveFilterColumns = {},
}: TableFilterProps) => {

  //==========================================================================
  // 1. STATE INITIALIZATION
  //==========================================================================
  
  // Core filter state
  const [isOpen, setIsOpen] = useState(false);                // Controls dropdown visibility
  const [searchTerm, setSearchTerm] = useState("");           // Search input value
  const dropdownRef = useRef<HTMLDivElement>(null);           // Reference to dropdown container
  const searchInputRef = useRef<HTMLInputElement>(null);      // Reference to search input
  
  // Date filter state
  const [dateFilteredData, setDateFilteredData] = useState<any[]>([]);  // Data filtered by date range
  const [fromDateInput, setFromDateInput] = useState<string>("");       // From date input value
  const [toDateInput, setToDateInput] = useState<string>("");           // To date input value
  const [isDateFilterActive, setIsDateFilterActive] = useState(false);  // Whether date filter is active

  // Number filter state
  const [minNumberInput, setMinNumberInput] = useState<string>("");           // Min number input value
  const [maxNumberInput, setMaxNumberInput] = useState<string>("");           // Max number input value
  const [isNumberFilterActive, setIsNumberFilterActive] = useState(false);    // Whether number filter is active
  const [numberFilteredData, setNumberFilteredData] = useState<any[]>([]);    // Data filtered by number range
  const [noMatchesMessage, setNoMatchesMessage] = useState<string | null>(null);  // Message when no matches found

  //==========================================================================
  // 2. DATA PROCESSING - Get unique values with counts
  //==========================================================================
  
  /**
   * Calculate unique values with counts for filtering
   * For each unique value, calculates:
   * 1. Total count (from all data)
   * 2. Filtered count (from filtered data with ALL filters)
   * 3. Column-independent filtered count (from data filtered by OTHER columns only)
   * 
   * @returns {Array} Array of objects with value, displayValue, and count information
   */
  const calculateUniqueValuesWithCounts = () => {
    // Get unique values from the original data
    const uniqueValues = Array.from(new Set(data.map(item => {
      const value = getValueFromItem(item, columnKey);
      return value !== undefined && value !== null ? String(value) : '';
    }).filter(Boolean)));

    // For each unique value, calculate counts
    return uniqueValues.map(value => {
      // Calculate total count from all data
      const totalCount = data.filter(item => {
        const itemValue = getValueFromItem(item, columnKey);
        return itemValue !== undefined && itemValue !== null && String(itemValue) === value;
      }).length;

      // Calculate filtered count from filtered data (with ALL filters)
      const filteredCount = filteredData.filter(item => {
        const itemValue = getValueFromItem(item, columnKey);
        return itemValue !== undefined && itemValue !== null && String(itemValue) === value;
      }).length;

      // Calculate column-independent filtered count
      // This is the count of items that match filters from OTHER columns only
      let columnIndependentCount = totalCount;
      
      // If there are filters in other columns, calculate how many items match those filters
      if (allActiveFilterColumns && 
          Object.keys(allActiveFilterColumns).some(col => 
            col !== columnKey && allActiveFilterColumns[col].length > 0)) {
        
        // Create a filter function that applies only filters from other columns
        const otherColumnsFilter = (item: any) => {
          // Check if the item passes all filters from other columns
          for (const col in allActiveFilterColumns) {
            if (col === columnKey || allActiveFilterColumns[col].length === 0) continue;
            
            const itemValue = getValueFromItem(item, col);
            if (itemValue === undefined || itemValue === null) {
              // If the item doesn't have this column value, it can't match
              return false;
            }
            
            const itemValueStr = String(itemValue);
            
            // Special handling for zero values - ENHANCED FEATURE
            if (itemValueStr === '0' || itemValueStr === '0.00') {
              // Check if any of the filter values are zero-like
              const hasZeroFilter = allActiveFilterColumns[col].some(
                filterVal => filterVal === '0' || filterVal === '0.00'
              );
              if (!hasZeroFilter) return false;
            } 
            // Normal case - check if the value is in the filter list
            else if (!allActiveFilterColumns[col].includes(itemValueStr)) {
              return false;
            }
          }
          return true;
        };
        
        // Count items that match this value AND pass filters from other columns
        columnIndependentCount = data.filter(item => {
          const itemValue = getValueFromItem(item, columnKey);
          return itemValue !== undefined && 
                 itemValue !== null && 
                 String(itemValue) === value && 
                 otherColumnsFilter(item);
        }).length;
      }

      // Format the display value
      let displayValue = value;
      if (formatDisplayValue) {
        displayValue = formatDisplayValue(value);
      }

      return {
        value,
        displayValue,
        totalCount,
        filteredCount,
        columnIndependentCount
      };
    });
  };

  //==========================================================================
  // 3. FILTER PROCESSING - Filter values based on search term
  //==========================================================================
  
  /**
   * Filter and sort values based on search term and active filters
   * Prioritizes available items over greyed-out items
   */
  const filteredValues = useMemo(() => {
    if (!searchTerm) {
      // Get the values with counts
      const valuesWithCounts = calculateUniqueValuesWithCounts();
      
      // Sort the values: 
      // 1. Non-greyed out items first (including selected items)
      // 2. Then greyed out items
      // 3. Within each group, maintain alphabetical order
      return valuesWithCounts.sort((a, b) => {
        // Check if this column has active filters
        const isCurrentColumnFiltering = activeFilters.length > 0;
        
        // Check if there are any active filters in other columns
        const hasOtherColumnFilters = allActiveFilterColumns && 
          Object.keys(allActiveFilterColumns).some(col => 
            col !== columnKey && allActiveFilterColumns[col].length > 0
          );
        
        // Get effective filtered counts
        const aEffectiveCount = isCurrentColumnFiltering ? a.columnIndependentCount : a.filteredCount;
        const bEffectiveCount = isCurrentColumnFiltering ? b.columnIndependentCount : b.filteredCount;
        
        // Check if items are selected
        const aIsSelected = activeFilters.includes(a.value);
        const bIsSelected = activeFilters.includes(b.value);
        
        // Check if items are greyed out
        const aIsGreyedOut = !aIsSelected && aEffectiveCount === 0 && hasOtherColumnFilters;
        const bIsGreyedOut = !bIsSelected && bEffectiveCount === 0 && hasOtherColumnFilters;
        
        // Sort by greyed out status first (both selected and non-selected enabled items stay together)
        if (!aIsGreyedOut && bIsGreyedOut) return -1;
        if (aIsGreyedOut && !bIsGreyedOut) return 1;
        
        // Then sort alphabetically
        return a.displayValue.localeCompare(b.displayValue);
      });
    }
    
    // If there's a search term, filter and then sort
    return calculateUniqueValuesWithCounts()
      .filter(item => 
        item.displayValue.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        // Same sorting logic as above
        const isCurrentColumnFiltering = activeFilters.length > 0;
        const hasOtherColumnFilters = allActiveFilterColumns && 
          Object.keys(allActiveFilterColumns).some(col => 
            col !== columnKey && allActiveFilterColumns[col].length > 0
          );
        
        const aEffectiveCount = isCurrentColumnFiltering ? a.columnIndependentCount : a.filteredCount;
        const bEffectiveCount = isCurrentColumnFiltering ? b.columnIndependentCount : b.filteredCount;
        
        const aIsSelected = activeFilters.includes(a.value);
        const bIsSelected = activeFilters.includes(b.value);
        
        const aIsGreyedOut = !aIsSelected && aEffectiveCount === 0 && hasOtherColumnFilters;
        const bIsGreyedOut = !bIsSelected && bEffectiveCount === 0 && hasOtherColumnFilters;
        
        // Sort by greyed out status first
        if (!aIsGreyedOut && bIsGreyedOut) return -1;
        if (aIsGreyedOut && !bIsGreyedOut) return 1;
        
        // Then sort alphabetically
        return a.displayValue.localeCompare(b.displayValue);
      });
  }, [calculateUniqueValuesWithCounts, searchTerm, activeFilters, allActiveFilterColumns, columnKey]);

  //==========================================================================
  // 4. EVENT HANDLERS AND EFFECTS
  //==========================================================================
  
  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  /**
   * Toggle a filter value
   * Adds or removes the value from active filters
   * 
   * @param {string} value - The value to toggle
   * @param {string} displayValue - The display value (for logging/debugging)
   */
  const toggleFilter = (value: string, displayValue: string) => {
    // Add or remove the value from active filters
    // Ensure consistent string comparison
    const newFilters = activeFilters.includes(value)
      ? activeFilters.filter(v => v !== value)
      : [...activeFilters, value];
    
    onFilterChange(columnKey, newFilters);
  };

  //==========================================================================
  // 5. DATE FILTER HANDLERS
  //==========================================================================
  
  /**
   * Handle date filtered data
   * Updates the filter with values from the filtered data
   * 
   * @param {Array} filteredData - Data filtered by date range
   */
  const handleDateFilteredData = (filteredData: any[]) => {
    setDateFilteredData(filteredData);
    
    // Extract the values from the filtered data
    const filteredValues = filteredData.map(item => 
      String(item[columnKey as keyof any] || "")
    );
    
    // Update the filter with these values
    onFilterChange(columnKey, filteredValues);
  };

  /**
   * Store date filter state
   * 
   * @param {string} fromDate - From date value
   * @param {string} toDate - To date value
   * @param {boolean} isActive - Whether the filter is active
   */
  const handleDateFilterChange = (fromDate: string, toDate: string, isActive: boolean) => {
    setFromDateInput(fromDate);
    setToDateInput(toDate);
    setIsDateFilterActive(isActive);
  };

  /**
   * Handle clearing the date filter completely
   */
  const handleClearDateFilter = () => {
    // Reset the date filter state
    setFromDateInput("");
    setToDateInput("");
    setIsDateFilterActive(false);
    
    // Clear the filter by passing an empty array to onFilterChange
    // This tells the parent component to remove this filter entirely
    onFilterChange(columnKey, []);
  };

  //==========================================================================
  // 6. NUMBER FILTER HANDLERS
  //==========================================================================
  
  /**
   * Handle number filtered data
   * Updates the filter with values from the filtered data
   * 
   * @param {Array} filteredData - Data filtered by number range
   */
  const handleNumberFilteredData = (filteredData: any[]) => {
    setNumberFilteredData(filteredData);
    
    // Extract the values from the filtered data
    const filteredValues = filteredData
      .map(item => {
        const value = getValueFromItem(item, columnKey);
        
        // Handle special cases
        if (value === undefined || value === null) {
          return '';
        }
        
        // Convert to string, but handle zero specially
        return String(value);
      })
      .filter(value => {
        // Filter out empty strings
        return value !== '';
      });
    
    // Update the filter with these values
    onFilterChange(columnKey, filteredValues);
  };

  /**
   * Store number filter state
   * 
   * @param {string} min - Min number value
   * @param {string} max - Max number value
   * @param {boolean} isActive - Whether the filter is active
   */
  const handleNumberFilterChange = (min: string, max: string, isActive: boolean) => {
    setMinNumberInput(min);
    setMaxNumberInput(max);
    setIsNumberFilterActive(isActive);
  };

  /**
   * Handle clearing the number filter completely
   */
  const handleClearNumberFilter = () => {
    // Reset the number filter state
    setMinNumberInput("");
    setMaxNumberInput("");
    setIsNumberFilterActive(false);
    setNoMatchesMessage(null);
    
    // Clear the filter by passing an empty array to onFilterChange
    onFilterChange(columnKey, []);
  };

  //==========================================================================
  // 7. HELPER FUNCTIONS
  //==========================================================================
  
  // Check if filter is active
  const isFilterActive = activeFilters.length > 0 || isDateFilterActive || isNumberFilterActive;

  /**
   * Get button text for number filter
   * Shows appropriate text based on filter state
   * 
   * @returns {string} Button text
   */
  const getNumberFilterButtonText = (): string => {
    if (noMatchesMessage) {
      return noMatchesMessage;
    }
    
    if (!isNumberFilterActive) return `Filter ${columnName} by range`;
    
    if (minNumberInput && maxNumberInput) {
      return `${minNumberInput} to ${maxNumberInput}`;
    } else if (minNumberInput) {
      return `Min: ${minNumberInput}`;
    } else if (maxNumberInput) {
      return `Max: ${maxNumberInput}`;
    }
    
    return "Number Filter Active";
  };

  //==========================================================================
  // 8. RENDER FUNCTIONS
  //==========================================================================
  
  /**
   * Render each filter option with appropriate styling
   * Handles selected state, greyed-out state, and count display
   * 
   * @param {Object} option - Filter option with value and count information
   * @returns {JSX.Element} Rendered filter option
   */
  const renderFilterOption = ({ value, displayValue, totalCount, filteredCount, columnIndependentCount }: { 
    value: string, 
    displayValue: string, 
    totalCount: number, 
    filteredCount: number,
    columnIndependentCount: number 
  }) => {
    // Check if this column has active filters
    const isCurrentColumnFiltering = activeFilters.length > 0;
    
    // Check if there are any active filters in other columns
    const hasOtherColumnFilters = allActiveFilterColumns && 
      Object.keys(allActiveFilterColumns).some(col => 
        col !== columnKey && allActiveFilterColumns[col].length > 0
      );
    
    // For options in the current column, use the column-independent count
    // For options in other columns, use the regular filtered count
    const effectiveFilteredCount = isCurrentColumnFiltering 
      ? columnIndependentCount 
      : filteredCount;
    
    // Check if this value is in the active filters
    const isSelected = activeFilters.includes(value);
    
    // Determine if this option should be greyed out:
    // 1. If this option is already selected, never grey it out
    // 2. If other columns have filters AND this option has zero matches, grey it out
    const shouldGreyOut = isSelected 
      ? false  // Never grey out selected options
      : (effectiveFilteredCount === 0 && hasOtherColumnFilters);  // Grey out options with zero matches when other columns are filtered
    
    // Show count as ratio when there are other column filters and counts differ
    const showCountAsRatio = hasOtherColumnFilters && effectiveFilteredCount !== totalCount;
    
    // Determine if this option is selectable
    const isSelectable = !shouldGreyOut;
    
    return (
      <div 
        key={value} 
        className={`flex items-center p-2 hover:bg-gray-100 cursor-pointer ${shouldGreyOut ? 'text-gray-400' : ''}`}
        onClick={() => isSelectable ? toggleFilter(value, displayValue) : null}
      >
        <div className={`w-4 h-4 border rounded mr-2 flex items-center justify-center ${isSelected ? 'bg-blue-500 border-black/5' : 'border-gray-300'}`}>
          {isSelected && <Check size={12} className="text-white" />}
        </div>
        <span className="truncate flex-grow text-left">{displayValue}</span>

        <div className={`py-[2px] text-xs rounded-full min-w-[40px] flex items-center justify-center ${
          isSelected ? 'bg-blue-500 text-white px-1' : 'text-gray-400'
        }`}>
          {showCountAsRatio && <span className={`mr-auto ${isSelected ? 'hidden' : ''}`}>(</span>}
          <span className="mx-[1px]">
            {effectiveFilteredCount}
            {showCountAsRatio && ` / ${totalCount}`}
          </span>
          {showCountAsRatio && <span className={`ml-auto ${isSelected ? 'hidden' : ''}`}>)</span>}
        </div>
      </div>
    );
  };

  //==========================================================================
  // 9. MAIN RENDER
  //==========================================================================
  
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Filter header with column name and icons */}
      <div 
        className={`table_filter_header flex items-center justify-start cursor-pointer ${isFilterActive ? 'text-primary' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {columnName}
        <div className={`ml-1 p-1 right-1/2 rounded-full ${isOpen || isFilterActive ? 'bg-blue-500 text-white' : 'text-gray-500'}`}>
          <FilterIcon size={10} />
        </div>
        
        {/* X button to clear filters for this column */}
        {/* {activeFilters.length > 0 && (
          <div 
            className="ml-1 p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening the dropdown
              onFilterChange(columnKey, []); // Clear filters for this column
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        )} */}
      </div>
      
      {/* Filter dropdown */}
      {isOpen && (
        <div className={`absolute z-10 mt-1 w-64 ${isNumberField || isHourField || isDateField ? "max-h-[300px]" : "max-h-60"} overflow-auto bg-white border border-gray-200 rounded-md shadow-lg top-[1.5rem] ${isLastColumn ? "right-[0rem] " : ""}`}>
          {/* Active filters section */}
          {activeFilters.length > 0 && (
            <div className="p-3 pb-2 bg-gray-100 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold mb-1">Active Filters:</div>
                <button 
                  className="text-xs text-gray-500 hover:text-gray-700"
                  onClick={() => onFilterChange(columnKey, [])}
                >
                  Clear all
                </button>
              </div>
              <div className="text-xs mt-1 w-full flex-wrap flex flex-row">
                {/* Show unique badges for each value, sorted */}
                {Array.from(new Set(activeFilters))
                  .sort((a, b) => {
                    // For number fields, sort numerically
                    if (isNumberField) {
                      return Number(a) - Number(b);
                    }
                    // For other fields, sort alphabetically
                    return String(a).localeCompare(String(b));
                  })
                  .map((filter, index) => {
                    // Format the display value if a formatter is provided
                    const displayValue = formatDisplayValue ? formatDisplayValue(filter) : filter;
                    
                    return (
                      <span key={index} className="inline-flex items-center bg-blue-500 text-white rounded px-1 py-0.5 mr-1 mb-1">
                        {displayValue}
                        <button 
                          className="ml-1 hover:bg-white/20 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            const newFilters = activeFilters.filter(f => f !== filter);
                            onFilterChange(columnKey, newFilters);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </span>
                    );
                  })}
              </div>
            </div>
          )}
          
          {/* Search input */}
          <div className="sticky top-0 p-2 bg-white border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <Search size={14} className="text-gray-400" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                className="w-full pl-8 pr-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          
          {/* Date range filter for date fields */}
          {isDateField && (
            <div className="p-2 border-b">
              <DateRangeFilter
                data={data}
                dateField={columnKey as keyof any}
                onFilteredDataChange={handleDateFilteredData}
                className="text-xs"
                header={`Filter ${columnName} by date range`}
                fromDateValue={fromDateInput}
                toDateValue={toDateInput}
                isFilterActive={isDateFilterActive}
                onFilterStateChange={handleDateFilterChange}
                onClearFilter={handleClearDateFilter}
                getFilterCount={(item) => {
                  // Calculate how many times this item appears in the filtered data
                  const itemValue = getValueFromItem(item, columnKey);
                  if (itemValue === undefined || itemValue === null) return 0;
                  
                  // Count how many items in the filtered data have this value
                  return filteredData.filter(filteredItem => {
                    const filteredItemValue = getValueFromItem(filteredItem, columnKey);
                    return filteredItemValue !== undefined && 
                           filteredItemValue !== null && 
                           String(filteredItemValue) === String(itemValue);
                  }).length;
                }}
              />
            </div>
          )}

          {/* Number range filter for number fields */}
          {isNumberField && !isHourField && (
            <div className="p-2 border-b">
              <NumberRangeFilter
                data={data}
                numberField={columnKey as keyof any}
                onFilteredDataChange={handleNumberFilteredData}
                className="text-xs"
                header={`Filter ${columnName} by range`}
                minValue={minNumberInput}
                maxValue={maxNumberInput}
                isFilterActive={isNumberFilterActive}
                onFilterStateChange={handleNumberFilterChange}
                onClearFilter={handleClearNumberFilter}
                decimalPlaces={decimalPlaces}
                getFilterCount={(item) => {
                  // Calculate how many times this item appears in the filtered data
                  const itemValue = getValueFromItem(item, columnKey);
                  if (itemValue === undefined || itemValue === null) return 0;
                  
                  // Count how many items in the filtered data have this value
                  return filteredData.filter(filteredItem => {
                    const filteredItemValue = getValueFromItem(filteredItem, columnKey);
                    return filteredItemValue !== undefined && 
                           filteredItemValue !== null && 
                           String(filteredItemValue) === String(itemValue);
                  }).length;
                }}
              />
            </div>
          )}

          {/* Hour range filter for hour fields */}
          {isHourField && (
            <div className="p-2 border-b">
              <HourRangeFilter
                columnKey={columnKey}
                columnName={columnName}
                data={data}
                onFilterChange={onFilterChange}
                activeFilters={activeFilters}
                formatDisplayValue={formatDisplayValue}
                getFilterCount={(item) => {
                  // Calculate how many times this item appears in the filtered data
                  const itemValue = getValueFromItem(item, columnKey);
                  if (itemValue === undefined || itemValue === null) return 0;
                  
                  // Count how many items in the filtered data have this value
                  return filteredData.filter(filteredItem => {
                    const filteredItemValue = getValueFromItem(filteredItem, columnKey);
                    return filteredItemValue !== undefined && 
                           filteredItemValue !== null && 
                           String(filteredItemValue) === String(itemValue);
                  }).length;
                }}
              />
            </div>
          )}

          {/* Filter options list */}
          <div className="p-2">
            {filteredValues.length > 0 ? (
              filteredValues.map(item => renderFilterOption(item))
            ) : (
              <div className="p-2 text-center text-gray-500">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableFilter;


/*

Name and role example:
First level - others selectable
- Select name in the names col, other names are text-black with total count
- 2nd level filter, relevant roles are text-black, non relevant (0 matches) are greyed out with filterValue/totalCount

This is implemented through the shouldGreyOut logic in the renderFilterOption function:

issue arised: first filter selection gives first level items 0 filtered count instead of just the total count.
query: they should not affect each other
select items in same filter without greyeing them out and display only the total value
- provide object of filters keys and items for each helped to 

situation in 2nd filter:
roles i get admin (7/32) and manager (3/51) both in black and have count / count 
roles with 0 are greyed out 

issue arised in second filter: select admin and manager gets the number (0/51)
What we need is for options within the same column to maintain their counts relative to filters from other columns only, not from filters within the same column.

query:
Let's think about how to fix this without writing code yet. We need to:
Calculate filtered counts based only on filters from other columns
Ensure that selecting one value in a column doesn't affect the counts of other values in the same column
Maintain the correct visual indicators for what's selected and what's available

solution:
Looking at the useTableData hook, I can see how the filtering works. The issue is that when you select "Admin" in the Role column, the filteredData gets updated to only include records with Role="Admin", which makes the filteredCount for "Manager" become 0.
In the TableFilter component, we need to calculate two sets of counts:
Regular counts (based on all active filters)
"Column-independent" counts (ignoring filters in the current column)
For options in the current column, we'll use the column-independent counts
This ensures that selecting "Admin" doesn't affect the count for "Manager"
For options in other columns, we'll use the regular counts
This ensures that selecting "John" properly affects counts in the Role column

This approach requires modifying how we calculate the unique values and their counts. Let me know if you'd like me to propose a solution based on this approach.
Calculates a new columnIndependentCount for each option, which represents how many items match this option AND pass filters from other columns (but ignores filters from the current column)
Uses this count for options in the current filtering column, ensuring that selecting "Admin" doesn't affect the count for "Manager"
Uses the regular filtered count for options in other columns
Maintains the same visual styling and behavior for greying out options

getValueFromItem 
Handle simple keys like "name" or "role"
Also support nested keys with dot notation like "user.profile.name"
Return undefined if the item or any part of the path is null/undefined


issue arised:
third filter level and some things we need to tackle. i selected an item. when i selected it ALL disabled got enabled
in the shouldGreyOut logic. I've removed the condition that was preventing greying out of all options in a column with active filters. Now:
Selected options are never greyed out
Options with zero matches (when other columns have filters) are greyed out, regardless of whether this column has active filters or not


question:make the items which are in black appear at the top of the list 
the enabled (can check) items keep place when checking them

calculateUniqueValuesWithCounts
Sorts the filter options in this priority order:
Selected items first
Then non-greyed out items (items with matches)
Then greyed out items (items with zero matches)
Within each group, maintains alphabetical order
Applies the same sorting logic to both the unfiltered list and the search-filtered list
Uses the same logic we use in renderFilterOption to determine if an item should be greyed out
We only sort by whether items are greyed out or not (enabled items first)
Within each group (enabled and disabled), we sort alphabetically


question: items with 0.00 value when selected do not show in the table when checked. what is causing this?
answer: The filter contains the string "0" (which is correct)
But the item value is an empty string "" (not "0")
The issue is in this line of the useTableData hook const itemValue


question the range filter when applied from 0 to 1 it displays badges for say 0x15 times
answer: {isNumberField && isNumberFilterActive ? (
Uses [...new Set(activeFilters)] to create an array of unique filter values
Maps over these unique values to create badges
Ensures that when you remove a badge, all instances of that value are removed from the filters
Adds a sort function to the unique filter values

question: number filter range duplicate badges and 0 items checked
can make this condition Data Filtering: The NumberRangeFilter component filters the data to include only items where the value is within the specified range AND have filtercount more than 0 right?
this made us to add the getFilterCount function to the tableFilter when using the number range filter

solved the badges but the items with 0 value still got checked
this was caused by The activeFilters array contains empty strings ("") instead of the string "0"


issue: with the filtering. when i check project budget 0.00 only and then go to Project manager and select an item there you know what happens? other available project managers get the filter count of 0 and are greyed out
fix this issue by improving the filter count calculation in the TableFilter component:
answer: 
Improves the otherColumnsFilter function to handle zero values correctly
Adds special handling for values like '0' and '0.00'
Ensures that zero values are properly matched against zero filters
Handles the case where an item doesn't have a value for a filtered colum
This should fix the issue where project managers get incorrectly greyed out when you select a project budget of 0.00.


*/