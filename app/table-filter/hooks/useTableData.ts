/**
 * useTableData.ts
 * 
 * A custom React hook for managing table data with sorting and filtering capabilities.
 * This hook provides a complete solution for interactive data tables, handling the
 * state and logic for filtering and sorting operations.
 * 
 * INDEX:
 * 1. Type definitions
 * 2. Hook initialization and state setup
 * 3. Data filtering implementation
 * 4. Data sorting implementation
 * 5. Event handlers
 * 6. Return values
 */

import { useState, useMemo } from 'react';

///////////////////////////////////////////////////////////////////////////////
// 1. TYPE DEFINITIONS
///////////////////////////////////////////////////////////////////////////////

/**
 * Defines the possible sort directions for table columns
 */
type SortDirection = 'ascending' | 'descending';

/**
 * Configuration for the current sort state
 * @template T The data type of the table rows
 */
interface SortConfig<T> {
  key: keyof T;        // The property key to sort by
  direction: SortDirection; // The direction to sort (ascending/descending)
}

/**
 * Props for the useTableData hook
 * @template T The data type of the table rows
 */
interface UseTableDataProps<T> {
  data: T[];                              // The source data array
  defaultSortKey?: keyof T;               // Optional initial sort column
  defaultSortDirection?: SortDirection;   // Optional initial sort direction
}

/**
 * A custom hook that provides sorting and filtering functionality for tabular data
 * @template T The data type of the table rows
 * @param props Configuration options for the hook
 * @returns Object containing filtered/sorted data and handler functions
 */
export function useTableData<T>({ 
  data, 
  defaultSortKey, 
  defaultSortDirection = 'ascending' 
}: UseTableDataProps<T>) {
  
  ///////////////////////////////////////////////////////////////////////////////
  // 2. HOOK INITIALIZATION AND STATE SETUP
  ///////////////////////////////////////////////////////////////////////////////
  
  /**
   * Filters state stores active filters as a map of column keys to arrays of
   * allowed values for that column
   */
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  
  /**
   * Sort configuration state determines which column to sort by and in which direction
   * Defaults to the first column if no default is provided
   */
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    key: defaultSortKey as keyof T || Object.keys(data[0] || {})[0] as keyof T,
    direction: defaultSortDirection,
  });

  ///////////////////////////////////////////////////////////////////////////////
  // 3. DATA FILTERING IMPLEMENTATION
  ///////////////////////////////////////////////////////////////////////////////
  
  /**
   * Apply all active filters to the data
   * Recalculates whenever data or filters change
   */
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Check if item passes all active filters
      return Object.entries(filters).every(([key, values]) => {
        // If no filter values for this key, pass the filter
        if (!values || values.length === 0) return true;
        
        // Get the item's value for this key
        const rawValue = item[key as keyof T];
        const itemValue = rawValue !== undefined && rawValue !== null 
          ? String(rawValue) 
          : '';
        
        // Check if the item's value is in the filter values
        return values.includes(itemValue);
      });
    });
  }, [data, filters]);

  ///////////////////////////////////////////////////////////////////////////////
  // 4. DATA SORTING IMPLEMENTATION
  ///////////////////////////////////////////////////////////////////////////////
  
  /**
   * Apply sorting to the filtered data
   * Recalculates whenever filtered data or sort configuration changes
   */
  const sortedData = useMemo(() => {
    const sortableData = [...filteredData];
    
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        // Extract values to compare
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        // For numbers: use numeric comparison
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'ascending' 
            ? aValue - bValue 
            : bValue - aValue;
        }
        
        // For dates: convert to timestamps for comparison
        if (aValue instanceof Date || bValue instanceof Date) {
          const getTimestamp = (val: any) => {
            if (!val) return 0;
            return val instanceof Date ? val.getTime() : new Date(val).getTime();
          };
          
          const aTimestamp = getTimestamp(aValue);
          const bTimestamp = getTimestamp(bValue);
          
          return sortConfig.direction === 'ascending' 
            ? aTimestamp - bTimestamp 
            : bTimestamp - aTimestamp;
        }
        
        // For strings and other values: use string comparison
        const aString = String(aValue || '');
        const bString = String(bValue || '');
        
        return sortConfig.direction === 'ascending' 
          ? aString.localeCompare(bString) 
          : bString.localeCompare(aString);
      });
    }
    
    return sortableData;
  }, [filteredData, sortConfig]);

  ///////////////////////////////////////////////////////////////////////////////
  // 5. EVENT HANDLERS
  ///////////////////////////////////////////////////////////////////////////////
  
  /**
   * Updates the filters for a specific column
   * @param columnKey The column to filter
   * @param values Array of allowed values for the column
   */
  const handleFilterChange = (columnKey: keyof T, values: string[]) => {
    setFilters(prev => ({
      ...prev,
      [columnKey]: values
    }));
  };

  /**
   * Handles column header clicks to change sort configuration
   * If clicking the same column, toggles direction
   * If clicking a different column, sorts by that column in ascending order
   * @param key The column key to sort by
   */
  const handleSort = (key: string) => {
    let direction: SortDirection = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key: key as keyof T, direction });
  };

  ///////////////////////////////////////////////////////////////////////////////
  // 6. RETURN VALUES
  ///////////////////////////////////////////////////////////////////////////////
  
  return {
    filters,         // Current filter state
    sortConfig,      // Current sort configuration
    filteredData,    // Data after filters applied
    sortedData,      // Data after filters and sorting applied
    handleFilterChange, // Function to update filters
    handleSort       // Function to update sorting
  };
} 