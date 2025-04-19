"use client";

import React, { useState, useEffect } from "react";
import { useFormattedNumberInput } from '../../hooks/useFormattedNumberInput';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface NumberRangeFilterProps<T> {
  data: T[];
  numberField: keyof T;
  onFilteredDataChange: (filteredData: T[]) => void;
  className?: string;
  header?: string;
  minValue?: string;
  maxValue?: string;
  isFilterActive?: boolean;
  onFilterStateChange?: (min: string, max: string, isActive: boolean) => void;
  onClearFilter?: () => void;
  decimalPlaces?: number;
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
  decimalPlaces = 2
}: NumberRangeFilterProps<T>) {
  // Use the hook for min input
  const minInputHandler = useFormattedNumberInput(minValue);
  
  // Use the hook for max input
  const maxInputHandler = useFormattedNumberInput(maxValue);
  
  // Add state to track if filter is active
  const [isFilterActive, setIsFilterActive] = useState(externalFilterActive);

  // Add state to show no matches message
  const [noMatchesMessage, setNoMatchesMessage] = useState<string | null>(null);

  // Add state to track if the filter is collapsed
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Update internal state when external props change
  useEffect(() => {
    if (minValue !== minInputHandler.rawValue) {
      minInputHandler.setRawValue(minValue);
    }
    
    if (maxValue !== maxInputHandler.rawValue) {
      maxInputHandler.setRawValue(maxValue);
    }
    
    setIsFilterActive(externalFilterActive);
  }, [minValue, maxValue, externalFilterActive]);

  /**
   * Applies number filtering to the data based on current inputs
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
      // CHANGE: Get the raw numeric value without formatting to avoid precision loss
      // This ensures values like 0.16666667 are compared correctly
      let itemValue: number | null = null;
      
      if (item[numberField] !== undefined && item[numberField] !== null) {
        // Convert the item value to a number, handling any type
        const rawValue = parseFloat(String(item[numberField]));
        if (!isNaN(rawValue)) {
          // CHANGE: Don't use toFixed() here to avoid rounding the actual value
          // Instead, use the raw value for comparison to maintain full precision
          itemValue = rawValue;
        }
      }
      
      // Skip items without a valid numeric value
      if (itemValue === null) return false;
      
      // CHANGE: Use simple numeric comparison without formatting
      // This ensures that values like 0.16666667 are properly included in ranges like 0.1 to 0.2
      const aboveMin = min === null || itemValue >= min;
      const belowMax = max === null || itemValue <= max;
      
      return aboveMin && belowMax;
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
    
    // CHANGE: Format the display values to the specified decimal places for consistency
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

  // Add this toggle function
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`flex flex-col border rounded-md border-sgrey2`}>
      <div className="flex flex-col">
        {/* <div className="text-xs font-medium mb-1">{getButtonText()}</div> */}

        <div className={`p-2 flex flex-row justify-between items-center gap-2 w-full border-sgrey2 transition-all duration-100  ${isCollapsed ? 'text-white bg-[#00e6c7]' : 'text-black bg-white'}
        ${isCollapsed ? 'rounded-t-md border-b  border-sgrey2 ' : 'rounded-md'}`}
        onClick={toggleCollapse}>
            <div className={`text-xs font-medium ml-1 py-[0.35rem] ${isCollapsed ? 'text-white' : 'text-black'}`}>Find within range</div>
            
            {!isCollapsed && (
                <div className="mr-1 bg-[#00e6c7] rounded-full px-1 aspect-square text-white flex items-center">
                    <ChevronLeftIcon className="w-2 h-2 stroke-[5px]" />
                    <div className="w-1 h-[2px] bg-white mt-[0px]"></div>
                    <ChevronRightIcon className="w-2 h-2 stroke-[5px]" />
                </div>
            )}

            {isCollapsed && (
            <div className="flex flex-row gap-1">
                {/* Only show Apply button when filter is not active */}
                {!isFilterActive && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      applyNumberFilter();
                    }}
                    className="text-[11px] py-[5px] px-2.5 rounded-[8px] bg-white text-black hover:text-white hover:bg-[#00e6c7]1 transition-colors"
                  >
                    Apply
                  </button>
                )}
                
                {/* Reset button */}
                {isFilterActive && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    resetFilter();
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

        {/* Add transition for smooth height animation */}
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isCollapsed ? 'max-h-[100px] opacity-100' : 'max-h-0 opacity-0 m-0 p-0'
          }`}
        >
          {/* CHANGE: Place From and To inputs in a row with equal width */}
          <div className="flex flex-row justify-between gap-2 w-full p-2">
            {/* From input - takes 50% of the width */}
            <div className="flex flex-row w-1/2 gap-0">
              <label className="text-[11px] w-full border flex items-center justify-center bg-[#00e6c7] text-white rounded-l-md mr-[-4px] border-primary">
                From
              </label>
              <input
                type="text"
                inputMode="decimal"
                placeholder="Min"
                value={minInputHandler.formattedValue}
                onChange={(e) => {
                  minInputHandler.handleChange(e);
                  setNoMatchesMessage(null);
                }}
                className={`w-full h-full text-[10px] px-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary ${minInputHandler.rawValue ? 'border-primary' : ''}`}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            {/* To input - takes 50% of the width */}
            <div className="flex flex-row w-1/2 h-[30px]">
            <label className="text-[11px] w-full border flex items-center justify-center bg-[#00e6c7] text-white rounded-l-md mr-[-4px] border-primary">
                To
              </label>
              <input
                type="text"
                inputMode="decimal"
                placeholder="Max"
                value={maxInputHandler.formattedValue}
                onChange={(e) => {
                  maxInputHandler.handleChange(e);
                  setNoMatchesMessage(null);
                }}
                className={`w-full h-full text-[10px] px-2 rounded-md border border-gray-300 focus:outline-none focus:border-primary ${maxInputHandler.rawValue ? 'border-primary' : ''}`}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {noMatchesMessage && (
            <div className="text-red-500 text-xs mt-[-1rem] p-2">
              {noMatchesMessage}
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NumberRangeFilter;