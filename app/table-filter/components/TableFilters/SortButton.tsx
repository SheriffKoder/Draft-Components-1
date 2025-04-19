import React from 'react';

interface SortButtonProps {
  columnKey: string;
  currentSortKey: string;
  sortDirection: 'ascending' | 'descending';
  onSort: (key: string) => void;
  className?: string;
}

/**
 * Reusable sort button component for table headers
 * @param {SortButtonProps} props - The component props
 * @returns {JSX.Element} A button that handles column sorting
 */
export function SortButton({ 
  columnKey, // The key of the data to sort in the data object
  currentSortKey, // The current sort key
  sortDirection, // The current sort direction
  onSort, // Callback when the sort is changed
  className = '' // Additional class names for styling
}: SortButtonProps) {
  // Determine if this column is currently being sorted
  const isActive = currentSortKey === columnKey;
  
  // Render appropriate sort indicator
  const renderSortIndicator = () => {
    if (!isActive) {
      return <span className="p-1 w-5 h-5 rounded-full bg-gray-200
      flex items-center justify-center pl-[4px] pb-[4px]">
        ↑
        </span>
        ;
    }
    
    return sortDirection === 'ascending' 
      ? <span className="p-1 w-5 h-5 rounded-full bg-blue-500
      flex items-center justify-center text-white pl-[4px]">↑</span> 
      : <span className="p-1 w-5 h-5 rounded-full bg-blue-500
      flex items-center justify-center text-white pl-[4px]">↓</span>;
  };

  return (
    <button 
      onClick={() => onSort(columnKey)}
      className={`mr-auto focus:outline-none ${className}`}
      aria-label={`Sort by ${columnKey}`}
    >
      {renderSortIndicator()}
    </button>
  );
}