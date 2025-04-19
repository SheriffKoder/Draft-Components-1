/**
 * HourRangeFilter Component
 * 
 * A specialized filter component for filtering time values stored as decimal days.
 * Allows users to input time ranges in HH:MM format and filters table data accordingly.
 * 
 * The component handles conversion between user-friendly HH:MM format and the 
 * decimal day format (where 1.0 = 24 hours) used in the data.
 * 
 * Enhanced Features:
 * - Proper conversion between decimal days and minutes for accurate comparison
 * - Filter count validation to prevent showing items with zero occurrences
 * - Validation of time inputs with appropriate error messages
 * - Collapsible interface with clear visual indicators
 * - Proper handling of edge cases (e.g., minutes rounding to 60)
 * 
 * Filter behavior:
 * - Hours input is required when minutes are provided
 * - Minutes default to 00 when not provided
 * - When only "From" time is provided: Matches all values >= the minimum time
 * - When only "To" time is provided: Matches all values <= the maximum time
 * - When both times are provided: Matches all values between min and max (inclusive)
 * - The filter collects all unique matching values and passes them to the parent component
 */

import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon } from "lucide-react";

//==========================================================================
// COMPONENT INTERFACE
//==========================================================================

interface HourRangeFilterProps {
  /** The key in the data object that contains the hour values */
  columnKey: string;
  /** Display name for the column */
  columnName: string;
  /** Array of data objects to filter */
  data: any[];
  /** Callback function to update filters in parent component */
  onFilterChange: (columnKey: string, values: string[]) => void;
  /** Currently active filters */
  activeFilters: string[];
  /** Optional function to format display values */
  formatDisplayValue?: (value: string) => string;
  /** Optional function to get filter count */
  getFilterCount?: (item: any) => number;
}

/**
 * Time value interface for internal use
 * Represents a time as hours and minutes components
 */
interface TimeValue {
  hours: number;
  minutes: number;
}

/**
 * HourRangeFilter Component
 * Provides time range filtering functionality for data stored as decimal days
 * 
 * @component
 * @param {HourRangeFilterProps} props - Component props
 * @returns {JSX.Element} A time range filter component with HH:MM inputs
 */
export default function HourRangeFilter({
  columnKey,
  columnName,
  data,
  onFilterChange,
  activeFilters,
  formatDisplayValue = (value) => value?.toString() || "",
  getFilterCount
}: HourRangeFilterProps) {

  //==========================================================================
  // STATE MANAGEMENT
  //==========================================================================
  
  // UI state
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Time input state
  const [minHours, setMinHours] = useState<string>("");
  const [minMinutes, setMinMinutes] = useState<string>("");
  const [maxHours, setMaxHours] = useState<string>("");
  const [maxMinutes, setMaxMinutes] = useState<string>("");
  
  // Error message state
  const [noMatchesMessage, setNoMatchesMessage] = useState<string | null>(null);
  
  // Check if filter is active
  const isFilterActive = activeFilters && activeFilters.length > 0;

  //==========================================================================
  // TIME CONVERSION FUNCTIONS
  //==========================================================================

  /**
   * Parse time string in format "HH:MM" to hours and minutes
   * @param {string} timeString - Time string in HH:MM format
   * @returns {TimeValue | null} Object with hours and minutes, or null if invalid
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
   * Convert hours and minutes to the decimal format used in the data
   * @param {number} hours - Hours component of the time
   * @param {number} minutes - Minutes component of the time
   * @returns {number} Decimal representation of the time as fraction of a day
   */
  const toDecimalHours = (hours: number, minutes: number): number => {
    // Convert hours and minutes to days (since the data stores time as fraction of a day)
    return (hours + (minutes / 60)) / 24;
  };

  /**
   * Format decimal hours to "HH:MM" string
   * @param {number} decimalHours - Decimal representation of time as fraction of a day
   * @returns {string} Formatted time string in HH:MM format
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
   * Convert decimal hours to minutes for comparison
   * ENHANCED: Added this function for more accurate time comparison
   * 
   * @param {number} decimalHours - Decimal representation of time as fraction of a day
   * @returns {number | null} Total minutes, or null if invalid
   */
  const convertToMinutes = (decimalHours: number): number | null => {
    if (decimalHours === undefined || decimalHours === null || isNaN(decimalHours)) {
      return null;
    }
    
    // Convert decimal days to minutes
    return Math.round(decimalHours * 24 * 60);
  };

  //==========================================================================
  // EFFECTS
  //==========================================================================

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

  //==========================================================================
  // EVENT HANDLERS
  //==========================================================================

  /**
   * Toggle the collapsed state of the filter
   */
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  /**
   * Validate time input to ensure it's a valid number within range
   * @param {string} value - The input value to validate
   * @param {boolean} isHours - Whether this is hours (true) or minutes (false)
   * @returns {boolean} Boolean indicating if the input is valid
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
   * @param {string} value - The new input value
   * @param {boolean} isMin - Whether this is the minimum (true) or maximum (false) value
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
   * @param {string} value - The new input value
   * @param {boolean} isMin - Whether this is the minimum (true) or maximum (false) value
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

  //==========================================================================
  // FILTER LOGIC
  //==========================================================================

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
    
    // Filter the data based on the hour range
    const filteredData = data.filter(item => {
      const value = item[columnKey];
      if (value === undefined || value === null) return false;
      
      // ENHANCED: Convert to number of minutes for comparison
      // This provides more accurate time comparison than using decimal days directly
      const minutes = convertToMinutes(value);
      if (minutes === null) return false;
      
      // Check if within range
      let aboveMin = true;
      let belowMax = true;
      
      if (minDecimal !== null) {
        const minMinutes = convertToMinutes(minDecimal);
        if (minMinutes !== null) {
          aboveMin = minutes >= minMinutes;
        }
      }
      
      if (maxDecimal !== null) {
        const maxMinutes = convertToMinutes(maxDecimal);
        if (maxMinutes !== null) {
          belowMax = minutes <= maxMinutes;
        }
      }
      
      // ENHANCED: Only include items that have a filter count > 0
      // This prevents showing items with zero occurrences in the filtered results
      const filterCount = getFilterCount ? getFilterCount(item) : 1;
      
      return aboveMin && belowMax && filterCount > 0;
    });
    
    // Handle case where no matches are found
    if (filteredData.length === 0 && (minDecimal !== null || maxDecimal !== null)) {
      setNoMatchesMessage("No matches found for this range");
      return;
    }
    
    // Extract the values from the filtered data
    const filteredValues = filteredData
      .map(item => {
        const value = item[columnKey];
        return value !== undefined && value !== null ? String(value) : '';
      })
      .filter(value => value !== '');
    
    // Update the filter
    onFilterChange(columnKey, filteredValues);
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

  //==========================================================================
  // COMPONENT RENDER
  //==========================================================================

  return (
    <div className={`flex flex-col border rounded-md border-sgrey2`}>
      <div className="flex flex-col">
        {/* Filter header - always visible */}
        <div className={`p-2 flex flex-row justify-between items-center gap-2 w-full border-sgrey2 transition-all duration-100  ${isCollapsed ? 'text-white bg-blue-500' : 'text-black bg-white'}
        ${isCollapsed ? 'rounded-t-md border-b  border-sgrey2 ' : 'rounded-md'}`}
        onClick={toggleCollapse}>
            <div className={`text-xs font-medium ml-1 py-[0.35rem] ${isCollapsed ? 'text-white' : 'text-black'}`}>Filter hours range</div>
            
            {/* Collapse/expand icon */}
            {!isCollapsed && (
                <div className="mr-1 bg-blue-500 rounded-full p-1 text-white flex items-center">
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
                      e.stopPropagation();  // Prevent collapsing when clicking button
                      applyHourFilter();    // Apply the filter
                    }}
                    className="text-[11px] py-[5px] px-2.5 rounded-[8px] bg-white text-black hover:text-white hover:bg-blue-5001 transition-colors"
                  >
                    Apply
                  </button>
                )}
                
                {/* Reset/Clear button */}
                {isFilterActive && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();  // Prevent collapsing when clicking button
                    e.preventDefault();
                    resetFilter();        // Reset the filter
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
                    onClick={(e) => e.stopPropagation()}  // Prevent collapsing when clicking input
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
                    onClick={(e) => e.stopPropagation()}  // Prevent collapsing when clicking input
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
                    onClick={(e) => e.stopPropagation()}  // Prevent collapsing when clicking input
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
                    onClick={(e) => e.stopPropagation()}  // Prevent collapsing when clicking input
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