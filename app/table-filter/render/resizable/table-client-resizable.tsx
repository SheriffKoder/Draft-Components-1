"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import SustainButton from "../../components/ui/sustain_button";
import LoadingLogo from "../../components/ui/LoadingLogo";
import PageHeader from "../../components/ui/pageHeader";
import GenericTable from "../../components/generic-table";
import { useDummyData, DummyDataItem } from "../../hooks/use-data-fetching";
import { formatCurrency, formatDate, formatHour } from "../../utils/format";

/**
 * DemoTableClient Component
 * 
 * Table holder, for fetching data and positioning
 * 
 * @returns {JSX.Element} The rendered demo interface
 */
export function DemoTableClient() {
  // Custom hook to manage dummy data and filtering
  const { isLoading, isError, filteredData, updateFilter } = useDummyData();
  
  // Define table columns
  const columns = {
    id: {
      header: "ID",
      sortable: true,
      filterable: true
    },
    name: {
      header: "Name",
      sortable: true,
      filterable: true
    },
    category: {
      header: "Category",
      sortable: true,
      filterable: true
    },
    date: {
      header: "Date",
      sortable: true,
      filterable: true,
      isDateField: true, // to display the date range filter
      render: (value: string) => formatDate(new Date(value)), // data cell display format
      formatDisplayValue: formatDate // filter display format
    },
    amount: {
      header: "Amount",
      sortable: true,
      filterable: true,
      isNumberField: true, // to display the number range filter
      decimalPlaces: 2,
      render: (value: number) => formatCurrency(value), // data cell display format
      formatDisplayValue: (value: number) => formatCurrency(Number(value || 0)) // filter display format
    },
    hours: {
      header: "Hours",
      sortable: true,
      filterable: true,
      isHourField: true, // to display the hour range filter
      decimalPlaces: 3,
      render: (value: number) => formatHour(value), // data cell display format,
      formatDisplayValue: (value: number) => formatHour(Number(value || 0)) // filter display format
    },
    status: {
      header: "Status",
      sortable: true,
      filterable: true,
      render: (value: string, row: DummyDataItem) => (
        <div className="flex items-center justify-center">
          <span
            className={`w-[95px] flex items-center justify-center
                  rounded-[5px] py-1
                  ${value === "active" && "bg-blue-500 text-black/70"} 
                  ${value === "completed" && "bg-green-500 text-white"} 
                  ${value === "pending" && "bg-yellow-500 text-black/70"} 
                  ${value === "cancelled" && "bg-[#EC849B] text-black/70"}`}
          >
            <span className="mt-[0px]">{value}</span>
          </span>
        </div>
      )
    }
  };

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return <LoadingLogo text="Loading demo data..." />;
  }

  // Show error message if data fetching failed
  if (isError) {
    return <div className="p-8 text-center text-red-500">Error loading data</div>;
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">

        {/* responsible for width setting and paddings */}
        <div className="flex flex-col p-1 h-full">
          

          {/* Table container - take remaining height space no scroll outside */}
          <div className="table_container flex-1 border-sgrey border rounded-[14px] overflow-hidden flex flex-col">
            <div className="overflow-auto flex-1">
              <GenericTable 
                data={filteredData} 
                columns={columns}
                detailsPath="/demo/item"
                idField="id"
              />
            </div>
          </div>
        </div>
    </div>
  );
}