import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * Props interface for LogSearch component
 */
interface LogSearchProps {
  /** Array of log entries to be filtered */
  logs: any[];
  /** Callback function to handle filtered logs updates */
  onFilteredLogsChange: (filteredLogs: any[]) => void;
}

/**
 * LogSearch Component
 * 
 * A search component that filters logs based on user email.
 * Provides real-time filtering with a clear search option.
 * 
 * @param {LogSearchProps} props - Component props
 * @returns {JSX.Element} Search input with clear functionality
 */
export default function LogSearch({ logs, onFilteredLogsChange }: LogSearchProps) {
  // State to store the search input value
  const [searchEmail, setSearchEmail] = useState("");

  // // whenever the logs mount or the onFilteredLogsChange function is called, set the filtered logs to the initial logs
  // useEffect(() => {
  //   onFilteredLogsChange(logs);
  // }, [logs, onFilteredLogsChange]);

  console.log(logs);

  // Filter logs based on e.target.value from the initial logs
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchEmail(searchValue);

    // Reset to show all logs if search is empty
    if (searchValue.trim() === "") {
      onFilteredLogsChange(logs);
      return;
    }

    // Filter logs based on user email (case-insensitive)
    const filtered = logs.filter((log) =>
      log.user?.email?.toLowerCase().includes(searchValue.toLowerCase())
    );
    onFilteredLogsChange(filtered);

    
  };

  // clear search: clear email and reset filtered logs to all logs
  const clearSearch = () => {
    setSearchEmail("");
    onFilteredLogsChange(logs);
  };

  return (
    <div className="relative rounded-[7px] bg-primary text-[0.75rem] flex flex-row items-center justify-start gap-2">
      <Search className="w-[15px] h-[15px] ml-[3px] text-black/70 absolute left-1" />
      <input
        type="text"
        placeholder="Search by e-mail"
        value={searchEmail}
        onChange={handleSearch}
        className="w-[270px] text-[0.75rem] border border-sgrey py-2 px-2 pl-[1.6rem] rounded-[4px]"
      />
      {searchEmail && (
        <span
          className="cursor-pointer absolute right-1 p-1"
          onClick={clearSearch}
          id="clear-search"
        >
          <X className="w-[15px] h-[15px] text-black" />
        </span>
      )}
    </div>
  );
}