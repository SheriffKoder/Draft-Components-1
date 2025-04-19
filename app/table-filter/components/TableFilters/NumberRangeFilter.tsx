"use client";

import React, { useState, useEffect } from "react";
import { useFormattedNumberInput } from '../../hooks/useFormattedNumberInput';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

/**
 * NumberRangeFilter Component
 * 
 * This component provides number range filtering functionality for data collections.
 * It allows users to filter data by specifying minimum and maximum numeric values.
 * 
 * Enhanced Features:
 * - Proper handling of zero values (0, 0.00) in filters
 * - Configurable decimal places for consistent number formatting
 * - Filter count validation to prevent showing items with zero occurrences
 * - Collapsible interface with clear visual indicators
 * - Proper validation of numeric ranges
 * - Feedback for incorrect ranges or no matching records
 * 
 * @component
 * @template T - The type of data objects being filtered
 */

interface NumberRangeFilterProps<T> {
  data: T[];                                        // The data collection to filter
  numberField: keyof T;                             // The field containing numeric values
  onFilteredDataChange: (filteredData: T[]) => void; // Callback when filtered data changes
  className?: string;                               // Optional CSS class
  header?: string;                                  // Optional header text
  minValue?: string;                                // Initial minimum value
  maxValue?: string;                                // Initial maximum value
  isFilterActive?: boolean;                         // Whether filter is active
  onFilterStateChange?: (min: string, max: string, isActive: boolean) => void; // Callback for filter state changes
  onClearFilter?: () => void;                       // Callback to clear the filter
  decimalPlaces?: number;                           // Number of decimal places for formatting
  getFilterCount?: (item: T) => number;             // Function to get filter count for an item
}

/**
 * NumberRangeFilter Component
 * Provides number range filtering functionality for data collections
 * 
 * @component
 * @template T - The type of data objects being filtered
 * @param {NumberRangeFilterProps<T>} props - Component props
 * @returns {JSX.Element} A number range filter component with min/max inputs
 */
export function NumberRangeFilter<T>({ 
  data, 
  numberField, 
  onFilteredDataChange,
  className = "",
  header = "Filter by number range",
  minValue = "",
  maxValue = "",
  isFilterActive: externalFilterActive = false,
  onFilterStateChange,
  onClearFilter,
  decimalPlaces = 2,
  getFilterCount                                    // New prop to get filter count for items
}: NumberRangeFilterProps<T>) {

  //==========================================================================
  // STATE MANAGEMENT
  //==========================================================================
  
  // Use the hook for min input - handles formatting and validation
  const minInputHandler = useFormattedNumberInput(minValue);
  
  // Use the hook for max input - handles formatting and validation
  const maxInputHandler = useFormattedNumberInput(maxValue);
  
  // Track if filter is active
  const [isFilterActive, setIsFilterActive] = useState(externalFilterActive);

  // Track feedback messages (no matches, incorrect range)
  const [noMatchesMessage, setNoMatchesMessage] = useState<string | null>(null);

  // Track if the filter UI is collapsed
  const [isCollapsed, setIsCollapsed] = useState(false);

  //==========================================================================
  // EFFECTS
  //==========================================================================

  // Update internal state when external props change
  useEffect(() => {
    // Sync min value with external state
    if (minValue !== minInputHandler.rawValue) {
      minInputHandler.setRawValue(minValue);
    }
    
    // Sync max value with external state
    if (maxValue !== maxInputHandler.rawValue) {
      maxInputHandler.setRawValue(maxValue);
    }
    
    // Sync filter active state with external state
    setIsFilterActive(externalFilterActive);
  }, [minValue, maxValue, externalFilterActive]);

  //==========================================================================
  // FILTER LOGIC
  //==========================================================================

  /**
   * Applies number filtering to the data based on current inputs
   * Enhanced to respect filter counts and handle zero values properly
   */
  const applyNumberFilter = () => {
    // Get the raw values from the hooks
    const min = minInputHandler.rawValue !== "" ? parseFloat(minInputHandler.rawValue) : null;
    const max = maxInputHandler.rawValue !== "" ? parseFloat(maxInputHandler.rawValue) : null;
    
    // Validate that min is less than max if both are provided
    if (min !== null && max !== null && min > max) {
      console.log("Incorrect range");
      setNoMatchesMessage("Incorrect range");
      return; // Stop processing if validation fails
    }
    
    let filteredData = [...data];
    
    // Apply number filtering
    filteredData = filteredData.filter(item => {
      // Get the raw numeric value without formatting to avoid precision loss
      let itemValue: number | null = null;
      
      if (item[numberField] !== undefined && item[numberField] !== null) {
        // Convert the item value to a number, handling any type
        const rawValue = parseFloat(String(item[numberField]));
        if (!isNaN(rawValue)) {
          itemValue = rawValue;
        }
      }
      
      // Skip items without a valid numeric value
      if (itemValue === null) return false;
      
      // Use simple numeric comparison without formatting
      const aboveMin = min === null || itemValue >= min;
      const belowMax = max === null || itemValue <= max;
      
      // ENHANCED: Only include items that have a filter count > 0
      // This prevents showing items with zero occurrences in the filtered results
      const filterCount = getFilterCount ? getFilterCount(item) : 1;
      
      return aboveMin && belowMax && filterCount > 0;
    });
    
    // Mark filter as active if user has entered any values
    const newFilterActive = minInputHandler.rawValue !== "" || maxInputHandler.rawValue !== "";
    setIsFilterActive(newFilterActive);
    
    // Notify parent component of state change
    if (onFilterStateChange) {
      onFilterStateChange(minInputHandler.rawValue, maxInputHandler.rawValue, newFilterActive);
    }
    
    // Pass the filtered data back to the parent component
    onFilteredDataChange(filteredData);

    // Provide feedback if no records match
    if (filteredData.length === 0 && newFilterActive) {
      setNoMatchesMessage("No records match");
    } else {
      setNoMatchesMessage(null);
    }
  };

  /**
   * Resets all inputs and clears the filter
   */
  const resetFilter = () => {
    // Reset the input fields
    minInputHandler.setRawValue("");
    maxInputHandler.setRawValue("");
    setNoMatchesMessage(null);
    
    // Mark filter as inactive
    setIsFilterActive(false);
    
    // Notify parent component of state change
    if (onFilterStateChange) {
      onFilterStateChange("", "", false);
    }
    
    // Call the onClearFilter callback to completely remove the filter
    if (onClearFilter) {
      onClearFilter();
    }
  };

  //==========================================================================
  // HELPER FUNCTIONS
  //==========================================================================

  /**
   * Gets the display text for the button based on filter state
   * @returns {string} The text to display on the filter button
   */
  const getButtonText = (): string => {
    // If we have a "no matches" message, display that instead
    if (noMatchesMessage) {
      return noMatchesMessage;
    }
    
    if (!isFilterActive) return header;
    
    // ENHANCED: Format the display values to the specified decimal places for consistency
    // This only affects what's shown to the user, not the actual comparison values
    if (minInputHandler.rawValue && maxInputHandler.rawValue) {
      const formattedMin = parseFloat(minInputHandler.rawValue).toFixed(decimalPlaces);
      const formattedMax = parseFloat(maxInputHandler.rawValue).toFixed(decimalPlaces);
      return `${formattedMin} to ${formattedMax}`;
    } else if (minInputHandler.rawValue) {
      const formattedMin = parseFloat(minInputHandler.rawValue).toFixed(decimalPlaces);
      return `Min: ${formattedMin}`;
    } else if (maxInputHandler.rawValue) {
      const formattedMax = parseFloat(maxInputHandler.rawValue).toFixed(decimalPlaces);
      return `Max: ${formattedMax}`;
    }
    
    return "Number Filter Active";
  };

  /**
   * Toggles the collapsed state of the filter UI
   */
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  //==========================================================================
  // COMPONENT RENDER
  //==========================================================================

  return (
    <div className={`flex flex-col border rounded-md border-sgrey2`}>
      <div className="flex flex-col">
        {/* Filter header with toggle functionality */}
        <div className={`p-2 flex flex-row justify-between items-center gap-2 w-full border-sgrey2 transition-all duration-100  
          ${isCollapsed ? 'text-white bg-blue-500' : 'text-black bg-white'}
          ${isCollapsed ? 'rounded-t-md border-b  border-sgrey2 ' : 'rounded-md'}`}
          onClick={toggleCollapse}>
            {/* Filter title */}
            <div className={`text-xs font-medium ml-1 py-[0.35rem] ${isCollapsed ? 'text-white' : 'text-black'}`}>
              Find within range
            </div>
            
            {/* Collapsed state icon */}
            {!isCollapsed && (
                <div className="mr-1 bg-blue-500 rounded-full px-1 aspect-square text-white flex items-center">
                    <ChevronLeftIcon className="w-2 h-2 stroke-[5px]" />
                    <div className="w-1 h-[2px] bg-white mt-[0px]"></div>
                    <ChevronRightIcon className="w-2 h-2 stroke-[5px]" />
                </div>
            )}

            {/* Filter action buttons - only shown when expanded */}
            {isCollapsed && (
            <div className="flex flex-row gap-1">
                {/* Apply button - only shown when filter is not active */}
                {!isFilterActive && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();  // Prevent collapsing when clicking button
                      applyNumberFilter();  // Apply the filter
                    }}
                    className="text-[11px] py-[5px] px-2.5 rounded-[8px] bg-white text-black hover:text-white hover:bg-blue-5001 transition-colors"
                  >
                    Apply
                  </button>
                )}
                
                {/* Reset/Clear button - changes text based on filter state */}
                {isFilterActive && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();  // Prevent collapsing when clicking button
                    e.preventDefault();
                    resetFilter();  // Reset the filter
                  }}
                  className={`text-[11px] py-[5px] px-2.5 rounded-[8px] ${
                    isFilterActive 
                      ? 'border border-primary text-black bg-white hover:bg-secondary' 
                      : 'border border-sgrey2 bg-background hover:bg-secondary'
                  } transition-colors`}
                >
                  {isFilterActive ? 'Clear' : 'Reset'}
                </button>
                )}
            </div>
            )}
        </div>

        {/* Expandable filter content - only visible when expanded */}
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isCollapsed ? 'max-h-[100px] opacity-100' : 'max-h-0 opacity-0 m-0 p-0'
          }`}
        >
          {/* ENHANCED: From/To inputs in a row with equal width for better UX */}
          <div className="flex flex-row justify-between gap-2 w-full p-2">
            {/* From (Min) input */}
            <div className="flex flex-row w-1/2 gap-0">
              <label className="text-[11px] w-full border flex items-center justify-center bg-blue-500 text-white rounded-l-md mr-[-4px] border-primary">
                From
              </label>
              <input
                type="text"
                inputMode="decimal"
                placeholder="Min"
                value={minInputHandler.formattedValue}
                onChange={(e) => {
                  minInputHandler.handleChange(e);  // Update min value
                  setNoMatchesMessage(null);  // Clear any error messages
                }}
                className={`w-full h-full text-[10px] px-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary ${minInputHandler.rawValue ? 'border-primary' : ''}`}
                onClick={(e) => e.stopPropagation()}  // Prevent collapsing when clicking input
              />
            </div>
            
            {/* To (Max) input */}
            <div className="flex flex-row w-1/2 h-[30px]">
              <label className="text-[11px] w-full border flex items-center justify-center bg-blue-500 text-white rounded-l-md mr-[-4px] border-primary">
                To
              </label>
              <input
                type="text"
                inputMode="decimal"
                placeholder="Max"
                value={maxInputHandler.formattedValue}
                onChange={(e) => {
                  maxInputHandler.handleChange(e);  // Update max value
                  setNoMatchesMessage(null);  // Clear any error messages
                }}
                className={`w-full h-full text-[10px] px-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary ${maxInputHandler.rawValue ? 'border-primary' : ''}`}
                onClick={(e) => e.stopPropagation()}  // Prevent collapsing when clicking input
              />
            </div>
          </div>
          
          {/* Error message display */}
          {noMatchesMessage && (
            <div className="text-red-500 text-xs mt-[-0.5rem] p-2">
              {noMatchesMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NumberRangeFilter;