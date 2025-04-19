"use client";

import * as React from "react";
import { formatCurrency, formatDate } from "../utils/format";
import { useRouter } from "next/navigation";
import TableFilter from "./TableFilters/TableFilter";
import { useTableData } from "../hooks/useTableData";
import { SortButton } from "./TableFilters/SortButton";
import HourRangeFilter from "./TableFilters/HourRangeFilter";
import "../styles/table_styling.css";
/**
 * Interface for the GenericTable component props
 * @interface
 * @property {any[]} data - Array of data objects to display
 * @property {Object} columns - Configuration for table columns
 * @property {string} detailsPath - Base path for detail pages
 * @property {string} idField - Field to use as ID for row clicks
 */
interface GenericTableProps {
  data: any[];
  columns: Record<string, {
    header: string;
    render?: (value: any, row: any) => React.ReactNode;
    sortable?: boolean;
    filterable?: boolean;
    filterType?: 'default' | 'hour' | 'date';
    isNumberField?: boolean;
    isHourField?: boolean;
    isDateField?: boolean;
    decimalPlaces?: number;
    formatDisplayValue?: (value: any) => string;
  }>;
  detailsPath?: string;
  idField?: string;
}

/**
 * GenericTable Component
 * A reusable table component with sorting and filtering capabilities
 * 
 * @param {GenericTableProps} props - Component props
 * @returns {JSX.Element} Rendered table
 */
export default function GenericTable({ 
  columns, // table headers <thhead>
  data, // table data <tbody>
  detailsPath = "", // part of the url to navigate to when clicking on a row
  idField = "id" // the field to use as ID for row clicks
}: GenericTableProps) {
  const router = useRouter();
  
  // Use the table data hook for filtering and sorting
  const { 
    filters, 
    sortConfig, 
    sortedData, 
    handleFilterChange, 
    handleSort 
  } = useTableData({ 
    data,
    defaultSortKey: idField
  });

  /**
   * Handles click events on table rows
   * Navigates to the details page for the clicked row
   * @param {string} id - ID of the clicked row
   */
  const handleRowClick = (id: string) => {
    if (detailsPath) {
      router.push(`${detailsPath}/${id}`);
    }
  };

  return (
    <table className="text-[14px] w-full" id="test-table">
      {/* Table headers */}
      <thead className="w-full">
        <tr>
          {Object.entries(columns).map(([key, column], index) => (
            <th key={key} className="text_table_header px-3 py-2 whitespace-normal" style={{opacity: "1"}}>
              <div className="flex items-center justify-center relative">
                {/* filter icons container */}
                <div className="flex items-center justify-center bottom-[-1.2rem]">
                  {column.filterable ? (
                    <TableFilter 
                      columnKey={key} // the key in the data object to filter on
                      columnName={column.header} // the header text to display
                      data={data} // the data to filter instead of sortedData for the wide-scope filter
                      filteredData={sortedData} // Add this new prop to pass the currently filtered data (for the wide scope)
                      activeFilters={filters[key] || []} // the active filters for this column
                      onFilterChange={handleFilterChange} // the function to handle filter changes (from hook)
                      
                      isNumberField={column.isNumberField} // to display the number range filter
                      isHourField={column.isHourField} // to display the hour range filter
                      isDateField={column.isDateField} // to display the date range filter

                      decimalPlaces={column.decimalPlaces} // the number of decimal places to display
                      formatDisplayValue={column.formatDisplayValue} // the format to display the filter value
                      // if last column in the table, set to true
                      isLastColumn={index === Object.entries(columns).length - 1}
                    />
                  ) : (
                    <span>{column.header}</span>
                  )}
                  
                  {column.sortable && (
                    <SortButton 
                      columnKey={key}
                      currentSortKey={sortConfig.key as string}
                      sortDirection={sortConfig.direction}
                      onSort={handleSort}
                    />
                  )}
                </div>
              </div>
            </th>
          ))}
        </tr>
      </thead>

      {/* Table body */}
      <tbody>
        {sortedData.map((row, index) => (

          // Table body xRows
          <tr
            className={`trans_anim solid cursor-pointer
                ${row.status === "active" ? "active" : ""}`}
            key={index}
            onClick={() => handleRowClick(row[idField])}
          >
            {/* Table body row xColumns */}
            {Object.entries(columns).map(([key, column]) => (
              <td key={key} className={`text-center text_table px-3 py-2 ${key === 'amount' ? 'text-right' : ''}`}>
                <div className="break-words">
                  {column.render ? column.render(row[key], row) : row[key]}
                </div>
              </td>
            ))}
          </tr>

        ))}
      </tbody>
    </table>
  );
}