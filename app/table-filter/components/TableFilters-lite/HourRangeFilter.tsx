/**
 * HourRangeFilter Component
 * 
 * A specialized filter component for filtering time values stored as decimal days.
 * Allows users to input time ranges in HH:MM format and filters table data accordingly.
 * 
 * The component handles conversion between user-friendly HH:MM format and the 
 * decimal day format (where 1.0 = 24 hours) used in the data.
 * 
 * Filter behavior:
 * - Hours input is required when minutes are provided
 * - Minutes default to 00 when not provided
 * - When only "From" time is provided: Matches all values >= the minimum time
 * - When only "To" time is provided: Matches all values <= the maximum time
 * - When both times are provided: Matches all values between min and max (inclusive)
 * - The filter collects all unique matching values and passes them to the parent component
 * 
 * Implementation notes:
 * - Time values in the data are stored as decimal days (e.g., 0.2083... = 5 hours)
 * - The filter converts between HH:MM format and decimal days for user-friendly input
 * - Error messages guide users when inputs are invalid or no matches are found
 */

import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon } from "lucide-react";

interface HourRangeFilterProps {
  /** The key in the data object that contains the hour values */
  columnKey: string;
  /** Display name for the column */
  columnName: string;
  /** Array of data objects to filter */
  data: any[];
  /** Callback function to update filters in parent component */
  onFilterChange: (columnKey: string, values: any[]) => void;
  /** Currently active filters */
  activeFilters: any[];
  /** Optional function to format display values */
  formatDisplayValue?: (value: any) => string;
}

interface TimeValue {
  hours: number;
  minutes: number;
}

export default function HourRangeFilter({
  columnKey,
  columnName,
  data,
  onFilterChange,
  activeFilters,
  formatDisplayValue = (value) => value?.toString() || "",
}: HourRangeFilterProps) {
  // Component state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [minHours, setMinHours] = useState<string>("");
  const [minMinutes, setMinMinutes] = useState<string>("");
  const [maxHours, setMaxHours] = useState<string>("");
  const [maxMinutes, setMaxMinutes] = useState<string>("");
  const [noMatchesMessage, setNoMatchesMessage] = useState<string | null>(null);
  
  const isFilterActive = activeFilters && activeFilters.length > 0;

  /**
   * Parse time string in format "HH:MM" to hours and minutes
   * @param timeString - Time string in HH:MM format
   * @returns Object with hours and minutes, or null if invalid
   */
  const parseTimeString = (timeString: string): TimeValue | null => {
    if (!timeString) return null;
    
    const parts = timeString.split(":");
    if (parts.length !== 2) return null;
    
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    
    if (isNaN(hours) || isNaN(minutes)) return null;
    
    return { hours, minutes };
  };

  /**
   * Initialize filter inputs from active filters when component mounts
   * or when active filters change
   */
  useEffect(() => {
    if (isFilterActive && activeFilters.length === 1) {
      const [min, max] = activeFilters[0].split("-");
      
      if (min && !isNaN(parseFloat(min))) {
        const timeValue = formatToTimeString(parseFloat(min));
        const parts = timeValue.split(":");
        setMinHours(parts[0]);
        setMinMinutes(parts[1]);
      }
      
      if (max && !isNaN(parseFloat(max))) {
        const timeValue = formatToTimeString(parseFloat(max));
        const parts = timeValue.split(":");
        setMaxHours(parts[0]);
        setMaxMinutes(parts[1]);
      }
    }
  }, [activeFilters, isFilterActive]);

  /**
   * Toggle the collapsed state of the filter
   */
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  /**
   * Validate time input to ensure it's a valid number within range
   * @param value - The input value to validate
   * @param isHours - Whether this is hours (true) or minutes (false)
   * @returns Boolean indicating if the input is valid
   */
  const validateTimeInput = (value: string, isHours: boolean): boolean => {
    if (value === "") return true;
    
    const num = parseInt(value, 10);
    if (isNaN(num)) return false;
    
    if (isHours) {
      return num >= 0;
    } else {
      return num >= 0 && num < 60;
    }
  };

  /**
   * Handle changes to hours input fields
   * @param value - The new input value
   * @param isMin - Whether this is the minimum (true) or maximum (false) value
   */
  const handleHoursChange = (value: string, isMin: boolean) => {
    if (validateTimeInput(value, true)) {
      if (isMin) {
        setMinHours(value);
      } else {
        setMaxHours(value);
      }
    }
  };

  /**
   * Handle changes to minutes input fields
   * @param value - The new input value
   * @param isMin - Whether this is the minimum (true) or maximum (false) value
   */
  const handleMinutesChange = (value: string, isMin: boolean) => {
    if (validateTimeInput(value, false)) {
      if (isMin) {
        setMinMinutes(value);
      } else {
        setMaxMinutes(value);
      }
    }
  };

  /**
   * Convert hours and minutes to the decimal format used in the data
   * @param hours - Hours component of the time
   * @param minutes - Minutes component of the time
   * @returns Decimal representation of the time as fraction of a day
   */
  const toDecimalHours = (hours: number, minutes: number): number => {
    // Convert hours and minutes to days (since the data stores time as fraction of a day)
    return (hours + (minutes / 60)) / 24;
  };

  /**
   * Format decimal hours to "HH:MM" string
   * @param decimalHours - Decimal representation of time as fraction of a day
   * @returns Formatted time string in HH:MM format
   */
  const formatToTimeString = (decimalHours: number): string => {
    // Convert decimal days to hours and minutes
    const totalHours = decimalHours * 24;
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    
    // Handle case where minutes is rounded to 60
    const adjustedHours = minutes === 60 ? hours + 1 : hours;
    const adjustedMinutes = minutes === 60 ? 0 : minutes;
    
    return `${adjustedHours.toString().padStart(2, '0')}:${adjustedMinutes.toString().padStart(2, '0')}`;
  };

  /**
   * Apply the hour range filter based on user input
   * Collects all values in the data that match the filter criteria
   * and passes them to the onFilterChange callback
   */
  const applyHourFilter = () => {
    // Check if data is empty
    if (!data || data.length === 0) {
      setNoMatchesMessage("No data available to filter");
      return;
    }

    // Validate that at least hours are entered for both min and max if either is provided
    if ((minHours === "" && minMinutes !== "") || (maxHours === "" && maxMinutes !== "")) {
      setNoMatchesMessage("Please specify the hours");
      return;
    }

    // Convert input values to decimal format
    let minDecimal: number | null = null;
    let maxDecimal: number | null = null;
    
    if (minHours !== "") {
      const hours = parseInt(minHours, 10);
      const minutes = minMinutes === "" ? 0 : parseInt(minMinutes, 10);
      minDecimal = toDecimalHours(hours, minutes);
    }
    
    if (maxHours !== "") {
      const hours = parseInt(maxHours, 10);
      const minutes = maxMinutes === "" ? 0 : parseInt(maxMinutes, 10);
      maxDecimal = toDecimalHours(hours, minutes);
    }
    
    // Validate input: min cannot be greater than max
    if (minDecimal !== null && maxDecimal !== null && minDecimal > maxDecimal) {
      setNoMatchesMessage("Min time cannot be greater than max time");
      return;
    }
    
    // Validate that at least one filter is provided
    if (minDecimal === null && maxDecimal === null) {
      setNoMatchesMessage("Please enter at least one filter value");
      return;
    }
    
    // Find all values in the data that are between min and max
    const matchingValues = new Set<string>();
    
    data.forEach(item => {
      const value = item[columnKey];
      if (value === undefined || value === null) return;
      
      // Convert the item value to a number
      let itemValue: number;
      if (typeof value === 'number') {
        itemValue = value;
      } else {
        itemValue = parseFloat(value);
      }
      
      if (isNaN(itemValue)) return;
      
      // Check if the value passes the filter
      const passesMin = minDecimal === null || itemValue >= minDecimal;
      const passesMax = maxDecimal === null || itemValue <= maxDecimal;
      
      // If the value is in range, add it to the set of matching values
      if (passesMin && passesMax) {
        matchingValues.add(String(value));
      }
    });
    
    // Handle case where no matches are found
    if (matchingValues.size === 0 && (minDecimal !== null || maxDecimal !== null)) {
      setNoMatchesMessage("No matches found for this range");
      return;
    }
    
    // Apply the filter with all matching values
    if (matchingValues.size > 0) {
      onFilterChange(columnKey, Array.from(matchingValues));
      setNoMatchesMessage(null);
    } else {
      resetFilter();
    }
  };

  /**
   * Reset the filter to its initial state
   */
  const resetFilter = () => {
    setMinHours("");
    setMinMinutes("");
    setMaxHours("");
    setMaxMinutes("");
    setNoMatchesMessage(null);
    onFilterChange(columnKey, []);
  };

  return (
    <div className={`flex flex-col border rounded-md border-sgrey2`}>
      <div className="flex flex-col">
        {/* Filter header - always visible */}
        <div className={`p-2 flex flex-row justify-between items-center gap-2 w-full border-sgrey2 transition-all duration-100  ${isCollapsed ? 'text-white bg-[#00e6c7]' : 'text-black bg-white'}
        ${isCollapsed ? 'rounded-t-md border-b  border-sgrey2 ' : 'rounded-md'}`}
        onClick={toggleCollapse}>
            <div className={`text-xs font-medium ml-1 py-[0.35rem] ${isCollapsed ? 'text-white' : 'text-black'}`}>Filter hours range</div>
            
            {/* Collapse/expand icon */}
            {!isCollapsed && (
                <div className="mr-1 bg-[#00e6c7] rounded-full p-1 text-white flex items-center">
                    <ClockIcon className="w-4 h-4" />
                </div>
            )}

            {/* Action buttons when expanded */}
            {isCollapsed && (
            <div className="flex flex-row gap-1">
                {/* Apply button - only shown when filter is not active */}
                {!isFilterActive && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      applyHourFilter();
                    }}
                    className="text-[11px] py-[5px] px-2.5 rounded-[8px] bg-white text-black hover:text-white hover:bg-[#00e6c7]1 transition-colors"
                  >
                    Apply
                  </button>
                )}
                
                {/* Reset/Clear button */}
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

        {/* Filter content - only visible when expanded */}
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isCollapsed ? 'max-h-[120px] opacity-100' : 'max-h-0 opacity-0 m-0 p-0'
          }`}
        >
          {/* Time range inputs */}
          <div className="flex flex-col gap-2 w-full p-2">
            <div className="flex flex-row justify-between gap-2 w-full">
              {/* From time input */}
              <div className="flex flex-col w-1/2">
                <label className="text-[11px] mb-1 text-gray-700">From</label>
                <div className="flex">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="HH"
                    value={minHours}
                    onChange={(e) => handleHoursChange(e.target.value, true)}
                    className="w-1/2 h-[36px] text-[12px] px-2 rounded-l-md border border-gray-300 focus:outline-none focus:border-primary"
                    onClick={(e) => e.stopPropagation()}
                    maxLength={2}
                  />
                  <span className="flex items-center justify-center px-1 border-t border-b border-gray-300">:</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM"
                    value={minMinutes}
                    onChange={(e) => handleMinutesChange(e.target.value, true)}
                    className="w-1/2 h-[36px] text-[12px] px-2 rounded-r-md border border-gray-300 focus:outline-none focus:border-primary"
                    onClick={(e) => e.stopPropagation()}
                    maxLength={2}
                  />
                </div>
              </div>
              
              {/* To time input */}
              <div className="flex flex-col w-1/2">
                <label className="text-[11px] mb-1 text-gray-700">To</label>
                <div className="flex">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="HH"
                    value={maxHours}
                    onChange={(e) => handleHoursChange(e.target.value, false)}
                    className="w-1/2 h-[36px] text-[12px] px-2 rounded-l-md border border-gray-300 focus:outline-none focus:border-primary"
                    onClick={(e) => e.stopPropagation()}
                    maxLength={2}
                  />
                  <span className="flex items-center justify-center px-1 border-t border-b border-gray-300">:</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM"
                    value={maxMinutes}
                    onChange={(e) => handleMinutesChange(e.target.value, false)}
                    className="w-1/2 h-[36px] text-[12px] px-2 rounded-r-md border border-gray-300 focus:outline-none focus:border-primary"
                    onClick={(e) => e.stopPropagation()}
                    maxLength={2}
                  />
                </div>
              </div>
            </div>

            {/* Error message display */}
            {noMatchesMessage && (
              <div className="text-red-500 text-xs">
                {noMatchesMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 