"use client"
import { useState } from "react";
import LogSearch from "./LogSearch";
// Example log entry type
interface LogEntry {
  id: number;
  user?: {
    email: string;
  };
  timestamp: string;
  action: string;
}

export default function ExampleLogViewer() {
  // 1. set your logs as a state
  const [logs] = useState<LogEntry[]>([
    {
      id: 1,
      user: { email: "mark@example.com" },
      timestamp: "2024-03-20 10:00:00",
      action: "Login"
    },
    {
      id: 2,
      user: { email: "pier@example.com" },
      timestamp: "2024-03-20 10:15:00",
      action: "Update Profile"
    },
    {
      id: 3,
      user: { email: "peter@example.com" },
      timestamp: "2024-03-20 10:30:00",
      action: "Logout"
    },
  ]);

  // 2. another state to hold filtered logs that will we will use to render from
  // initially it will be logs
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>(logs);

  return (
    <div className="p-4 text-black w-[1000px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Log Viewer</h2>

        {/* // pass the logs state and filteredLogs setState and let the magic happen */}
        <LogSearch logs={logs} onFilteredLogsChange={setFilteredLogs} />
      </div>

      {/* content render */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <div className="space-y-2">
            {/* Header */}
            <div className="flex flex-row items-center justify-center w-full">
              <div className="w-[30%]">Time</div>
              <div className="w-[30%]">Email</div>
              <div className="w-[30%]">Action</div>
            </div>

            {/* No logs message */}
            {!filteredLogs.length && (
              <div className="w-full h-[100px] flex justify-center items-center">
                <p className="text-gray-500 font-semibold">No logs found</p>
              </div>
            )}

            {/* Log entries */}
            {filteredLogs.map((log, index) => (
              <div
                key={log.id}
                className={`rounded-lg px-3 py-1 flex flex-row items-center justify-center w-full
                  ${index % 2 === 0 ? "bg-gray-50" : ""}
                  hover:bg-gray-100 transition-colors duration-200
                `}
              >
                <div className="w-[30%] font-semibold">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
                <div className="w-[30%]">{log.user?.email}</div>
                <div className="w-[30%]">{log.action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}