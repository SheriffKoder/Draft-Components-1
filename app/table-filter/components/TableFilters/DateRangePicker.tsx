"use client";

import React, { useState, useEffect, useRef } from "react";

/**
 * DateRangeFilter Component
 * 
 * This component provides date range filtering functionality for data collections.
 * It allows users to filter data by specifying from and to dates with a user-friendly interface.
 * 
 * Enhanced Features:
 * - Proper date validation and comparison
 * - Auto-advancing focus between date parts (day → month → year)
 * - Filter count validation to prevent showing items with zero occurrences
 * - Visual feedback for active filters and no matches
 * - Proper handling of empty date values
 * - Consistent date formatting for display
 * 
 * @component
 * @template T - The type of data objects being filtered
 */

export interface DateRangeFilterProps<T> {
  data: T[];                                        // The data collection to filter
  dateField: keyof T;                               // The field containing date values
  onFilteredDataChange: (filteredData: T[]) => void; // Callback when filtered data changes
  className?: string;                               // Optional CSS class
  header?: string;                                  // Optional header text
  fromDateValue?: string;                           // Initial from date value (DD-MM-YYYY format)
  toDateValue?: string;                             // Initial to date value (DD-MM-YYYY format)
  isFilterActive?: boolean;                         // Whether filter is active
  onFilterStateChange?: (fromDate: string, toDate: string, isActive: boolean) => void; // Callback for filter state changes
  onClearFilter?: () => void;                       // Callback to clear the filter
  getFilterCount?: (item: T) => number;             // Function to get filter count for an item
}

/**
 * DateRangeFilter Component
 * Provides date range filtering functionality for data collections
 * 
 * @component
 * @template T - The type of data objects being filtered
 * @param {DateRangeFilterProps<T>} props - Component props
 * @returns {JSX.Element} A date range filter component with from/to inputs
 */
export function DateRangeFilter<T>({ 
  data, 
  dateField, 
  onFilteredDataChange,
  className = "",
  header,
  fromDateValue = "",
  toDateValue = "",
  isFilterActive: externalFilterActive = false,
  onFilterStateChange,
  onClearFilter,
  getFilterCount                                    // New prop to get filter count for items
}: DateRangeFilterProps<T>) {

  //==========================================================================
  // EVENT HANDLERS
  //==========================================================================
  
  // Handle container click to prevent propagation
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  //==========================================================================
  // DATE PARSING AND FORMATTING
  //==========================================================================

  /**
   * Parse date string in DD-MM-YYYY format
   * Returns a default date if parsing fails or date is invalid
   * 
   * @param {string} dateStr - Date string in DD-MM-YYYY format
   * @param {Date} defaultDate - Default date to return if parsing fails
   * @returns {Date} Parsed date or default date
   */
  const parseDate = (dateStr: string, defaultDate: Date): Date => {
    if (!dateStr || dateStr.length === 0) return defaultDate;
    
    const parts = dateStr.split('-');
    const defaultDay = defaultDate.getDate();
    const defaultMonth = defaultDate.getMonth(); // 0-indexed
    const defaultYear = defaultDate.getFullYear();
    
    let day = defaultDay;
    let month = defaultMonth;
    let year = defaultYear;
    
    // Parse day if available
    if (parts.length > 0 && parts[0]) {
      const parsedDay = parseInt(parts[0], 10);
      if (!isNaN(parsedDay) && parsedDay >= 1 && parsedDay <= 31) {
        day = parsedDay;
      }
    }
    
    // Parse month if available
    if (parts.length > 1 && parts[1]) {
      const parsedMonth = parseInt(parts[1], 10);
      if (!isNaN(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12) {
        month = parsedMonth - 1; // JS months are 0-indexed
      }
    }
    
    // Parse year if available
    if (parts.length > 2 && parts[2]) {
      const parsedYear = parseInt(parts[2], 10);
      if (!isNaN(parsedYear) && parsedYear >= 1900 && parsedYear <= 2100) {
        year = parsedYear;
      }
    }
    
    // Create date with the parsed values
    const date = new Date(year, month, day);
    
    // Validate the date is real (e.g., not 31-02-2023)
    if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
      // If invalid, return the default date
      return defaultDate;
    }
    
    return date;
  };

  /**
   * Split date string into day, month, year parts
   * 
   * @param {string} dateStr - Date string in DD-MM-YYYY format
   * @returns {[string, string, string]} Array of [day, month, year] parts
   */
  const splitDateString = (dateStr: string): [string, string, string] => {
    if (!dateStr) return ["", "", ""];
    const parts = dateStr.split('-');
    return [
      parts[0] || "",
      parts.length > 1 ? parts[1] : "",
      parts.length > 2 ? parts[2] : ""
    ];
  };

  /**
   * Combine day, month, year into date string
   * 
   * @param {string} day - Day part
   * @param {string} month - Month part
   * @param {string} year - Year part
   * @returns {string} Combined date string in DD-MM-YYYY format
   */
  const combineDateParts = (day: string, month: string, year: string): string => {
    if (!day && !month && !year) return "";
    return `${day}-${month}-${year}`;
  };

  //==========================================================================
  // STATE MANAGEMENT
  //==========================================================================
  
  // State for the from date input parts (what user sees)
  const [fromDay, setFromDay] = useState<string>("");
  const [fromMonth, setFromMonth] = useState<string>("");
  const [fromYear, setFromYear] = useState<string>("");
  
  // State for the to date input parts (what user sees)
  const [toDay, setToDay] = useState<string>("");
  const [toMonth, setToMonth] = useState<string>("");
  const [toYear, setToYear] = useState<string>("");
  
  // Refs for input fields to handle focus
  const fromMonthRef = useRef<HTMLInputElement>(null);
  const fromYearRef = useRef<HTMLInputElement>(null);
  const toDayRef = useRef<HTMLInputElement>(null);
  const toMonthRef = useRef<HTMLInputElement>(null);
  const toYearRef = useRef<HTMLInputElement>(null);
  
  // State for the actual from date (with defaults)
  const [actualFromDate, setActualFromDate] = useState<Date>(() => {
    return fromDateValue ? parseDate(fromDateValue, new Date(1900, 0, 1)) : new Date(1900, 0, 1);
  });
  
  // State for the actual to date (with defaults)
  const [actualToDate, setActualToDate] = useState<Date>(() => {
    return toDateValue ? parseDate(toDateValue, new Date(2100, 0, 1)) : new Date(2100, 0, 1);
  });
  
  // Add state to control visibility of date picker
  const [isOpen, setIsOpen] = useState(false);

  // Add state to track if filter is active
  const [isFilterActive, setIsFilterActive] = useState(externalFilterActive);

  // Add state to show no matches message
  const [noMatchesMessage, setNoMatchesMessage] = useState<string | null>(null);

  //==========================================================================
  // EFFECTS
  //==========================================================================

  // Initialize date parts from props
  useEffect(() => {
    const [day, month, year] = splitDateString(fromDateValue);
    setFromDay(day);
    setFromMonth(month);
    setFromYear(year);
    
    const [toD, toM, toY] = splitDateString(toDateValue);
    setToDay(toD);
    setToMonth(toM);
    setToYear(toY);
  }, []);

  // Update internal state when external props change
  useEffect(() => {
    const newFromDateStr = combineDateParts(fromDay, fromMonth, fromYear);
    if (fromDateValue !== newFromDateStr) {
      const [day, month, year] = splitDateString(fromDateValue);
      setFromDay(day);
      setFromMonth(month);
      setFromYear(year);
      setActualFromDate(parseDate(fromDateValue, new Date(1900, 0, 1)));
    }
    
    const newToDateStr = combineDateParts(toDay, toMonth, toYear);
    if (toDateValue !== newToDateStr) {
      const [day, month, year] = splitDateString(toDateValue);
      setToDay(day);
      setToMonth(month);
      setToYear(year);
      setActualToDate(parseDate(toDateValue, new Date(2100, 0, 1)));
    }
    
    setIsFilterActive(externalFilterActive);
  }, [fromDateValue, toDateValue, externalFilterActive]);

  //==========================================================================
  // INPUT HANDLERS
  //==========================================================================

  /**
   * Handle from day input change
   * Auto-advances to month field when 2 digits entered
   */
  const handleFromDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 2);
    setFromDay(value);
    
    // Auto-advance to month field when 2 digits entered
    if (value.length === 2 && fromMonthRef.current) {
      fromMonthRef.current.focus();
    }
    
    updateFromDate(value, fromMonth, fromYear);
  };

  /**
   * Handle from month input change
   * Auto-advances to year field when 2 digits entered
   */
  const handleFromMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 2);
    setFromMonth(value);
    
    // Auto-advance to year field when 2 digits entered
    if (value.length === 2 && fromYearRef.current) {
      fromYearRef.current.focus();
    }
    
    updateFromDate(fromDay, value, fromYear);
  };

  /**
   * Handle from year input change
   */
  const handleFromYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 4);
    setFromYear(value);
    updateFromDate(fromDay, fromMonth, value);
  };

  /**
   * Handle to day input change
   * Auto-advances to month field when 2 digits entered
   */
  const handleToDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 2);
    setToDay(value);
    
    // Auto-advance to month field when 2 digits entered
    if (value.length === 2 && toMonthRef.current) {
      toMonthRef.current.focus();
    }
    
    updateToDate(value, toMonth, toYear);
  };

  /**
   * Handle to month input change
   * Auto-advances to year field when 2 digits entered
   */
  const handleToMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 2);
    setToMonth(value);
    
    // Auto-advance to year field when 2 digits entered
    if (value.length === 2 && toYearRef.current) {
      toYearRef.current.focus();
    }
    
    updateToDate(toDay, value, toYear);
  };

  /**
   * Handle to year input change
   */
  const handleToYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 4);
    setToYear(value);
    updateToDate(toDay, toMonth, value);
  };

  //==========================================================================
  // DATE UPDATE FUNCTIONS
  //==========================================================================

  /**
   * Update from date with new parts
   * Notifies parent component of state change
   */
  const updateFromDate = (day: string, month: string, year: string) => {
    const dateStr = combineDateParts(day, month, year);
    const newFromDate = parseDate(dateStr, new Date(1900, 0, 1));
    setActualFromDate(newFromDate);
    
    // Notify parent component of state change
    if (onFilterStateChange) {
      onFilterStateChange(dateStr, combineDateParts(toDay, toMonth, toYear), 
        dateStr !== "" || combineDateParts(toDay, toMonth, toYear) !== "");
    }
  };

  /**
   * Update to date with new parts
   * Notifies parent component of state change
   */
  const updateToDate = (day: string, month: string, year: string) => {
    const dateStr = combineDateParts(day, month, year);
    const newToDate = parseDate(dateStr, new Date(2100, 0, 1));
    setActualToDate(newToDate);
    
    // Notify parent component of state change
    if (onFilterStateChange) {
      onFilterStateChange(combineDateParts(fromDay, fromMonth, fromYear), dateStr, 
        combineDateParts(fromDay, fromMonth, fromYear) !== "" || dateStr !== "");
    }
  };

  //==========================================================================
  // FILTER FUNCTIONS
  //==========================================================================

  /**
   * Applies date filtering to the data based on current date inputs
   * Enhanced to respect filter counts and handle empty values properly
   */
  const applyDateFilter = () => {
    let filteredData = [...data];
    
    // If we have a to date, set it to end of day
    const endOfDayToDate = new Date(actualToDate);
    endOfDayToDate.setHours(23, 59, 59, 999);
    
    // Apply date filtering
    filteredData = filteredData.filter(item => {
      // Get the date value from the item
      const dateValue = item[dateField];
      if (!dateValue) return false;
      
      // Convert to Date object
      const itemDate = new Date(dateValue as string);
      if (isNaN(itemDate.getTime())) return false;
      
      // Check if the date is within the range
      const afterFromDate = actualFromDate <= itemDate;
      const beforeToDate = itemDate <= endOfDayToDate;
      
      // ENHANCED: Only include items that have a filter count > 0
      // This prevents showing items with zero occurrences in the filtered results
      const filterCount = getFilterCount ? getFilterCount(item) : 1;
      
      return afterFromDate && beforeToDate && filterCount > 0;
    });
    
    // Mark filter as active if user has entered any date values
    const fromDateStr = combineDateParts(fromDay, fromMonth, fromYear);
    const toDateStr = combineDateParts(toDay, toMonth, toYear);
    const newFilterActive = fromDateStr !== "" || toDateStr !== "";
    setIsFilterActive(newFilterActive);
    
    // Notify parent component of state change
    if (onFilterStateChange) {
      onFilterStateChange(fromDateStr, toDateStr, newFilterActive);
    }
    
    // Pass the filtered data back to the parent component
    onFilteredDataChange(filteredData);

    // Provide feedback if no records match
    if (filteredData.length === 0) {
      setNoMatchesMessage("No records match");
      alert("No records match the selected date range");
    } else {
      setNoMatchesMessage(null);
    }
  };

  /**
   * Resets all date inputs and clears the filter
   */
  const resetFilter = () => {
    // Reset the input fields (what user sees)
    setFromDay("");
    setFromMonth("");
    setFromYear("");
    setToDay("");
    setToMonth("");
    setToYear("");
    
    // Reset the actual dates to the full range
    setActualFromDate(new Date(1900, 0, 1));
    setActualToDate(new Date(2100, 0, 1));
    
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
    
    // Close the dropdown after reset
    setIsOpen(false);
  };

  //==========================================================================
  // DISPLAY HELPERS
  //==========================================================================

  /**
   * Format a date to display in the button when filter is active
   * 
   * @param {string} day - Day part
   * @param {string} month - Month part
   * @param {string} year - Year part
   * @param {string} defaultText - Default text if date is empty
   * @returns {string} Formatted date string for display
   */
  const formatDateForDisplay = (day: string, month: string, year: string, defaultText: string): string => {
    if (!day && !month && !year) return defaultText;
    
    const formattedDay = day || "DD";
    const formattedMonth = month || "MM";
    const formattedYear = year || "YYYY";
    
    return `${formattedDay}.${formattedMonth}.${formattedYear}`;
  };

  /**
   * Get display text for the button based on filter state
   * 
   * @returns {string} Text to display on the filter button
   */
  const getButtonText = (): string => {
    // If we have a "no matches" message, display that instead
    if (noMatchesMessage) {
      return noMatchesMessage;
    }
    
    if (!isFilterActive) return "Enter Date Range";
    
    if ((fromDay || fromMonth || fromYear) && (toDay || toMonth || toYear)) {
      return `${formatDateForDisplay(fromDay, fromMonth, fromYear, "DD.MM.YYYY")} to ${formatDateForDisplay(toDay, toMonth, toYear, "DD.MM.YYYY")}`;
    } else if (fromDay || fromMonth || fromYear) {
      return `${formatDateForDisplay(fromDay, fromMonth, fromYear, "DD.MM.YYYY")} to Today`;
    } else if (toDay || toMonth || toYear) {
      return `From: 01.01.1900 to ${formatDateForDisplay(toDay, toMonth, toYear, "DD.MM.YYYY")}`;
    }
    
    return "Date Filter Active";
  };

  // Clear the no matches message when inputs change
  useEffect(() => {
    setNoMatchesMessage(null);
  }, [fromDay, toDay, fromMonth, toMonth, fromYear, toYear]);

  //==========================================================================
  // COMPONENT RENDER
  //==========================================================================

  return (
    <div className={`flex flex-col ${className}`} onClick={handleContainerClick}>
      <div className="bg-white border border-sgrey2 rounded-md shadow-sm transition-all duration-300 ease-in-out">
        {/* Filter toggle button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
          className={`w-full flex items-center justify-between space-x-2 transition-colors px-4 py-2 ${
            isOpen ? 'rounded-t-md' : 'rounded-md'
          } ${
            isFilterActive 
              ? noMatchesMessage
                ? 'bg-white text-red-500 font-medium' 
                : 'bg-blue-500 text-white font-medium'
              : isOpen 
                ? 'bg-blue-500 text-white'
                : ''
          }`}
        >
          <span className="truncate text-left text-xs">{getButtonText()}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${
            noMatchesMessage && isFilterActive 
              ? 'text-red-500' 
              : isFilterActive || isOpen 
                ? 'text-white' 
                : ''
          }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        
        {/* Expandable filter content */}
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          onClick={handleContainerClick}
        >
          <div className="p-3 border-t border-sgrey2">
            <div className="flex flex-col gap-2">
              {/* From date input */}
              <div className="flex flex-row justify-start gap-2">
                <label 
                  className="text-[11px] w-[300px] border flex items-center justify-center bg-blue-500 text-white rounded-md"
                >
                  From
                </label>
                <div className="flex items-center space-x-1">
                  <input
                    type="text"
                    placeholder="DD"
                    value={fromDay}
                    onChange={handleFromDayChange}
                    className={`w-[2.2rem] h-7 text-[10px] px-1 text-center rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary ${fromDay ? 'ring-1 ring-primary' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                    maxLength={2}
                  />
                  <span className="text-[10px]">.</span>
                  <input
                    ref={fromMonthRef}
                    type="text"
                    placeholder="MM"
                    value={fromMonth}
                    onChange={handleFromMonthChange}
                    className={`w-[2.2rem] h-7 text-[10px] px-1 text-center rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary ${fromMonth ? 'ring-1 ring-primary' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                    maxLength={2}
                  />
                  <span className="text-[10px]">.</span>
                  <input
                    ref={fromYearRef}
                    type="text"
                    placeholder="YYYY"
                    value={fromYear}
                    onChange={handleFromYearChange}
                    className={`w-[3rem] h-7 text-[10px] px-1 text-center rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary ${fromYear ? 'ring-1 ring-primary' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                    maxLength={4}
                  />
                </div>
              </div>
              
              {/* To date input */}
              <div className="flex flex-row justify-start gap-2">
                <label 
                  className="text-[11px] w-[300px] border flex items-center justify-center bg-blue-500 text-white rounded-md"
                >
                  To
                </label>
                <div className="flex items-center space-x-1">
                  <input
                    ref={toDayRef}
                    type="text"
                    placeholder="DD"
                    value={toDay}
                    onChange={handleToDayChange}
                    className={`w-[2.2rem] h-7 text-[10px] px-1 text-center rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary ${toDay ? 'ring-1 ring-primary' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                    maxLength={2}
                  />
                  <span className="text-[10px]">.</span>
                  <input
                    ref={toMonthRef}
                    type="text"
                    placeholder="MM"
                    value={toMonth}
                    onChange={handleToMonthChange}
                    className={`w-[2.2rem] h-7 text-[10px] px-1 text-center rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary ${toMonth ? 'ring-1 ring-primary' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                    maxLength={2}
                  />
                  <span className="text-[10px]">.</span>
                  <input
                    ref={toYearRef}
                    type="text"
                    placeholder="YYYY"
                    value={toYear}
                    onChange={handleToYearChange}
                    className={`w-[3rem] h-7 text-[10px] px-1 text-center rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary ${toYear ? 'ring-1 ring-primary' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                    maxLength={4}
                  />
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex items-center justify-center space-x-2 mt-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    applyDateFilter();
                  }}
                  className="text-[11px] py-[5px] px-2.5 rounded-[8px] bg-blue-500 text-white hover:bg-blue-5001 transition-colors"
                >
                  Apply Range
                </button>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    resetFilter();
                  }}
                  className="text-[11px] py-[5px] px-2.5 rounded-[8px] border border-sgrey2 bg-background hover:bg-secondary transition-colors"
                >
                  Remove Range
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}