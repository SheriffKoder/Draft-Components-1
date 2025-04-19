"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface DateRangeFilterProps<T> {
  data: T[];
  dateField: keyof T;
  onFilteredDataChange: (filteredData: T[]) => void;
  className?: string;
  header?: string;
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
  header
}: DateRangeFilterProps<T>) {
  // State for the from date components
  const [fromDay, setFromDay] = useState<string | null>(null);
  const [fromMonth, setFromMonth] = useState<string | null>(null);
  const [fromYear, setFromYear] = useState<string | null>(null);
  
  // State for the to date components
  const [toDay, setToDay] = useState<string | null>(null);
  const [toMonth, setToMonth] = useState<string | null>(null);
  const [toYear, setToYear] = useState<string | null>(null);

  // Generate month options
  const months = [
    { value: "1", label: "Jan" },
    { value: "2", label: "Feb" },
    { value: "3", label: "Mar" },
    { value: "4", label: "Apr" },
    { value: "5", label: "May" },
    { value: "6", label: "Jun" },
    { value: "7", label: "Jul" },
    { value: "8", label: "Aug" },
    { value: "9", label: "Sep" },
    { value: "10", label: "Oct" },
    { value: "11", label: "Nov" },
    { value: "12", label: "Dec" }
  ];

  // Generate days 1-31
  const days = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1)
  }));

  // Dynamically determine available years from the data
  const years = useMemo(() => {
    // Default to current year if no data
    if (!data || data.length === 0) {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 6 }, (_, i) => ({
        value: String(currentYear - 5 + i),
        label: String(currentYear - 5 + i)
      }));
    }

    // Extract years from the data
    const yearsSet = new Set<number>();
    const currentYear = new Date().getFullYear();
    
    // Add current year and previous year as fallbacks
    yearsSet.add(currentYear);
    yearsSet.add(currentYear - 1);
    
    // Add years from the data
    data.forEach(item => {
      const dateValue = item[dateField];
      if (dateValue) {
        const date = new Date(dateValue as unknown as string);
        if (!isNaN(date.getTime())) {
          yearsSet.add(date.getFullYear());
        }
      }
    });
    
    // Convert to array and sort
    const yearsArray = Array.from(yearsSet).sort((a, b) => a - b);
    
    // Map to the format needed for the dropdown
    return yearsArray.map(year => ({
      value: String(year),
      label: String(year)
    }));
  }, [data, dateField]);

  /**
   * Applies date filtering to the data based on current date range inputs
   */
  const applyDateFilter = () => {
    let filteredData = [...data];
    
    // Check if we have complete from date
    const hasFromDate = fromDay && fromMonth && fromYear;
    
    // Check if we have complete to date
    const hasToDate = toDay && toMonth && toYear;
    
    // Only proceed if at least one complete date is provided
    if (!hasFromDate && !hasToDate) {
      // If no complete date, don't filter
      return;
    }
    
    // Create from date if all components are provided
    let fromDate: Date | null = null;
    if (hasFromDate) {
      fromDate = new Date(
        parseInt(fromYear!),
        parseInt(fromMonth!) - 1, // JavaScript months are 0-indexed
        parseInt(fromDay!)
      );
    }
    
    // Create to date if all components are provided
    let toDate: Date | null = null;
    if (hasToDate) {
      toDate = new Date(
        parseInt(toYear!),
        parseInt(toMonth!) - 1, // JavaScript months are 0-indexed
        parseInt(toDay!)
      );
      // Set to end of day
      toDate.setHours(23, 59, 59, 999);
    }
    
    // Apply date filtering if we have at least one date
    if (fromDate || toDate) {
      filteredData = filteredData.filter(item => {
        const itemDate = item[dateField] ? new Date(item[dateField] as unknown as string) : null;
        
        // Skip items without a date
        if (!itemDate) return false;
        
        // Check if item date is after fromDate (if provided)
        const afterFromDate = fromDate ? itemDate >= fromDate : true;
        
        // Check if item date is before toDate (if provided)
        const beforeToDate = toDate ? itemDate <= toDate : true;
        
        return afterFromDate && beforeToDate;
      });
    }
    
    // Pass the filtered data back to the parent component
    onFilteredDataChange(filteredData);
  };

  /**
   * Resets all date inputs and clears the filter
   */
  const resetFilter = () => {
    setFromDay(null);
    setFromMonth(null);
    setFromYear(null);
    setToDay(null);
    setToMonth(null);
    setToYear(null);
    onFilteredDataChange(data);
  };

  return (
    <div className={`flex flex-row items-center justify-end gap-4 ${className}
    bg-white border border-sgrey2 hover:bg-sgrey1 transition-colors shadow-sm px-4 py-2 rounded-md`}>
      {header && <h3 className="text-sm font-semibold text-primary1">{header}</h3>}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Label className="whitespace-nowrap text-gray-500 font-normal text-xs">From:</Label>
          <div className="flex space-x-2">
            <div className="relative">
              <Label htmlFor="fromDay" className="absolute top-[-14px] -left-3 text-[10px] text-white bg-primary px-2 py-[1px] rounded-[10px] border border-gray-300">Day</Label>
              <Select value={fromDay || undefined} onValueChange={setFromDay}>
                <SelectTrigger 
                  id="fromDay" 
                  className={`w-[3.5rem] h-7 text-[12px] bg-background ${fromDay ? 'ring-1 ring-primary' : ''}`}
                >
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  {days.map(day => (
                    <SelectItem 
                      key={`from-day-${day.value}`} 
                      value={day.value}
                      className="hover:bg-primary hover:text-white focus:bg-primary focus:text-white"
                    >
                      {day.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="relative">
              <Label htmlFor="fromMonth" className="absolute top-[-14px] -left-3 text-[10px] text-white bg-primary px-2 py-[1px] rounded-[10px] border border-gray-300">Month</Label>
              <Select value={fromMonth || undefined} onValueChange={setFromMonth}>
                <SelectTrigger 
                  id="fromMonth" 
                  className={`w-[4rem] h-7 text-[12px] bg-background ${fromMonth ? 'ring-1 ring-primary' : ''}`}
                >
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  {months.map(month => (
                    <SelectItem 
                      key={`from-month-${month.value}`} 
                      value={month.value}
                      className="hover:bg-primary hover:text-white focus:bg-primary focus:text-white"
                    >
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="relative">
              <Label htmlFor="fromYear" className="absolute top-[-14px] -left-3 text-[10px] text-white bg-primary px-2 py-[1px] rounded-[10px] border border-gray-300">Year</Label>
              <Select value={fromYear || undefined} onValueChange={setFromYear}>
                <SelectTrigger 
                  id="fromYear" 
                  className={`w-[4.5rem] h-7 text-[12px] bg-background ${fromYear ? 'ring-1 ring-primary' : ''}`}
                >
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  {years.map(year => (
                    <SelectItem 
                      key={`from-year-${year.value}`} 
                      value={year.value}
                      className="hover:bg-primary hover:text-white focus:bg-primary focus:text-white"
                    >
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Label className="whitespace-nowrap text-gray-500 font-normal text-xs">To:</Label>
          <div className="flex space-x-1">
            <div className="relative">
              <Label htmlFor="toDay" className="absolute top-[-14px] -left-3 text-[10px] text-white bg-primary px-2 py-[1px] rounded-[10px] border border-gray-300">Day</Label>
              <Select value={toDay || undefined} onValueChange={setToDay}>
                <SelectTrigger 
                  id="toDay" 
                  className={`w-[3.5rem] h-7 text-[12px] bg-background ${toDay ? 'ring-1 ring-primary' : ''}`}
                >
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  {days.map(day => (
                    <SelectItem 
                      key={`to-day-${day.value}`} 
                      value={day.value}
                      className="hover:bg-primary hover:text-white focus:bg-primary focus:text-white"
                    >
                      {day.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="relative">
              <Label htmlFor="toMonth" className="absolute top-[-14px] -left-3 text-[10px] text-white bg-primary px-2 py-[1px] rounded-[10px] border border-gray-300">Month</Label>
              <Select value={toMonth || undefined} onValueChange={setToMonth}>
                <SelectTrigger 
                  id="toMonth" 
                  className={`w-[4rem] h-7 text-[12px] bg-background ${toMonth ? 'ring-1 ring-primary' : ''}`}
                >
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  {months.map(month => (
                    <SelectItem 
                      key={`to-month-${month.value}`} 
                      value={month.value}
                      className="hover:bg-primary hover:text-white focus:bg-primary focus:text-white"
                    >
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="relative">
              <Label htmlFor="toYear" className="absolute top-[-14px] -left-3 text-[10px] text-white bg-primary px-2 py-[1px] rounded-[10px] border border-gray-300">Year</Label>
              <Select value={toYear || undefined} onValueChange={setToYear}>
                <SelectTrigger 
                  id="toYear" 
                  className={`w-[4.5rem] h-7 text-[12px] bg-background ${toYear ? 'ring-1 ring-primary' : ''}`}
                >
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  {years.map(year => (
                    <SelectItem 
                      key={`to-year-${year.value}`} 
                      value={year.value}
                      className="hover:bg-primary hover:text-white focus:bg-primary focus:text-white"
                    >
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={applyDateFilter}
            className="text-[13px] py-[6px] px-3 rounded-[10px] bg-primary text-white hover:bg-primary1 transition-colors"
          >
            Apply Filter
          </button>
          
          <button 
            onClick={resetFilter}
            className="text-[13px] py-[6px] px-3 rounded-[10px] border border-sgrey2 bg-background hover:bg-secondary transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}