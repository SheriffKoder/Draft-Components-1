import { ChevronDown, Check, FilterIcon, Search } from "lucide-react";
import { useRef, useEffect, useState, useMemo } from "react";
import { DateRangeFilter } from "./DateRangePicker";
import NumberRangeFilter from "./NumberRangeFilter";
import HourRangeFilter from "./HourRangeFilter";
/**
 * TableFilter Component
 * Provides a reusable dropdown filter for table columns
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.columnKey - The key of the column to filter
 * @param {string} props.columnName - The display name of the column
 * @param {Array<any>} props.data - The data to filter
 * @param {Array<string>} props.activeFilters - Currently active filters for this column
 * @param {Function} props.onFilterChange - Callback when filters change
 * @param {boolean} props.isDateField - Whether this column contains date values
 * @param {boolean} props.isNumberField - Whether this column contains numeric values
 * @param {boolean} props.isLastColumn - Whether this is the last column in the table
 * @param {Function} props.formatDisplayValue - Optional function to format display values
 * @param {number} props.decimalPlaces - Number of decimal places for number fields
 * @returns {JSX.Element} A filter dropdown for a table column
 */
interface TableFilterProps {
  columnKey: string;
  columnName: string;
  data: any[];
  activeFilters: string[];
  onFilterChange: any;
  isDateField?: boolean;
  isNumberField?: boolean;
  isLastColumn?: boolean;
  isHourField?: boolean;
  formatDisplayValue?: (value: any) => string;
  decimalPlaces?: number;
}

const TableFilter = ({ 
  columnKey, // The key of the data to filter in the data object
  columnName, // The name will be displayed to the user in the table header
  data, // The data to filter
  activeFilters, // Currently active filters for this column
  onFilterChange, // Callback when filters change
  isDateField = false, // Add this new prop to identify date fields
  isNumberField = false, // Add this new prop to identify number fields
  isLastColumn,   // to make the dropdown not exceed width with the last column
  isHourField = false, // Add this new prop
  formatDisplayValue, // Optional function to format display values
  decimalPlaces = 2, // Number of decimal places for number fields
}: TableFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Add state to store date filter values
  const [dateFilteredData, setDateFilteredData] = useState<any[]>([]);
  const [fromDateInput, setFromDateInput] = useState<string>("");
  const [toDateInput, setToDateInput] = useState<string>("");
  const [isDateFilterActive, setIsDateFilterActive] = useState(false);

  // Add state to store number range filter values
  const [minNumberInput, setMinNumberInput] = useState<string>("");
  const [maxNumberInput, setMaxNumberInput] = useState<string>("");
  const [isNumberFilterActive, setIsNumberFilterActive] = useState(false);
  const [numberFilteredData, setNumberFilteredData] = useState<any[]>([]);
  const [noMatchesMessage, setNoMatchesMessage] = useState<string | null>(null);

  // Get unique values for this column with their counts
  const uniqueValuesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const originalValues: Record<string, string> = {}; // Store original values
    
    // Count occurrences of each value
    data.forEach(item => {
      let value = String(item[columnKey] ?? "No value");
      let displayValue = value;
      
      // Apply custom formatting if provided
      if (formatDisplayValue) {
        displayValue = formatDisplayValue(value);
        originalValues[displayValue] = value; // Store mapping of display to original
      }
      
      if (displayValue) {
        counts[displayValue] = (counts[displayValue] || 0) + 1;
      }
    });
    
    // Convert to array of objects with value, displayValue and count
    return Object.entries(counts)
      .map(([displayValue, count]) => ({ 
        value: originalValues[displayValue] || displayValue, // Use original value for filtering
        displayValue, // Use formatted value for display
        count 
      }))
      .sort((a, b) => a.displayValue.localeCompare(b.displayValue));
  }, [data, columnKey, formatDisplayValue]);

  // Filter values based on search term
  const filteredValues = useMemo(() => {
    if (!searchTerm) return uniqueValuesWithCounts;
    
    return uniqueValuesWithCounts.filter(item => 
      item.displayValue.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [uniqueValuesWithCounts, searchTerm]);

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

  // Toggle a filter value
  const toggleFilter = (value: string, displayValue: string) => {
    const newFilters = activeFilters.includes(value)
      ? activeFilters.filter(v => v !== value)
      : [...activeFilters, value];
    
    onFilterChange(columnKey, newFilters);
  };

  // Handle date filtered data
  const handleDateFilteredData = (filteredData: any[]) => {
    setDateFilteredData(filteredData);
    
    // Extract the values from the filtered data
    const filteredValues = filteredData.map(item => 
      String(item[columnKey as keyof any] || "")
    );
    
    // Update the filter with these values
    onFilterChange(columnKey, filteredValues);
  };

  // Store date filter state
  const handleDateFilterChange = (fromDate: string, toDate: string, isActive: boolean) => {
    setFromDateInput(fromDate);
    setToDateInput(toDate);
    setIsDateFilterActive(isActive);
  };

  // Handle clearing the date filter completely
  const handleClearDateFilter = () => {
    // Reset the date filter state
    setFromDateInput("");
    setToDateInput("");
    setIsDateFilterActive(false);
    
    // Clear the filter by passing an empty array to onFilterChange
    // This tells the parent component to remove this filter entirely
    onFilterChange(columnKey, []);
  };

  // Handle number filtered data
  const handleNumberFilteredData = (filteredData: any[]) => {
    setNumberFilteredData(filteredData);
    
    // Extract the values from the filtered data
    const filteredValues = filteredData.map(item => 
      String(item[columnKey as keyof any] || "")
    );
    
    // Update the filter with these values
    onFilterChange(columnKey, filteredValues);
  };

  // Store number filter state
  const handleNumberFilterChange = (min: string, max: string, isActive: boolean) => {
    setMinNumberInput(min);
    setMaxNumberInput(max);
    setIsNumberFilterActive(isActive);
  };

  // Handle clearing the number filter completely
  const handleClearNumberFilter = () => {
    // Reset the number filter state
    setMinNumberInput("");
    setMaxNumberInput("");
    setIsNumberFilterActive(false);
    setNoMatchesMessage(null);
    
    // Clear the filter by passing an empty array to onFilterChange
    onFilterChange(columnKey, []);
  };

  // Check if filter is active
  const isFilterActive = activeFilters.length > 0 || isDateFilterActive || isNumberFilterActive;

  // Get button text for number filter
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

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className={`flex items-center justify-center cursor-pointer ${isFilterActive ? 'text-primary' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {columnName}
        <div className={`ml-1 p-1 right-1/2 rounded-full ${isOpen || isFilterActive ? 'bg-[#00e6c7] text-white' : 'text-gray-500'}`}>
          <FilterIcon size={10} />
        </div>
      </div>
      
      {isOpen && (
        <div className={`absolute z-10 mt-1 w-64 ${isNumberField || isHourField || isDateField ? "max-h-[300px]" : "max-h-60"} overflow-auto bg-white border border-gray-200 rounded-md shadow-lg top-[1.5rem] ${isLastColumn ? "right-[0rem] " : ""}`}>
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
              />
            </div>
          )}

          <div className="p-2">
            {filteredValues.length > 0 ? (
              filteredValues.map(({ value, displayValue, count }) => (
                <div 
                  key={value} 
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => toggleFilter(value, displayValue)}
                >
                  <div className={`w-4 h-4 border rounded mr-2 flex items-center justify-start ${activeFilters.includes(value) ? 'bg-[#00e6c7] border-primary' : 'border-gray-300'}`}>
                    {activeFilters.includes(value) && <Check size={12} className="text-white" />}
                  </div>
                  <span className="truncate flex-grow text-left">{displayValue}</span>
                  <span className="text-gray-500 text-sm ml-2">({count})</span>
                </div>
              ))
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