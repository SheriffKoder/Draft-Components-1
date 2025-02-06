"use client";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";

// handle search input value and map
export default function InputSearch() {
  const [filteredLogs, setFilteredLogs] = useState<any[]>([]);

  // display email in input
  const [searchEmail, setSearchEmail] = useState('');

  const logs = [
    {
      "id": "59d098bc-b277-4a33-95f2-2139da152d39",
      "userId": "8710d820-1c37-406b-aa4d-f3a25f568cb0",
      "action": "Deleted dropdown option PROJECT_CLASSIFICATION: Subscription",
      "timestamp": "2025-02-02T18:41:27.249Z",
      "user": {
        "email": "two@email.com"
      }
  },
  {
    "id": "59d098bc-b277-4a33-95f2-2139da152d39",
    "userId": "8710d820-1c37-406b-aa4d-f3a25f568cb0",
    "action": "Deleted dropdown option PROJECT_CLASSIFICATION: Subscription",
    "timestamp": "2025-02-02T18:41:27.249Z",
    "user": {
        "email": "one@email.com"
    }
  },

]

  useEffect(()=> {
    setFilteredLogs(logs);
  },[])

  
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    
    // set display text to the value
    setSearchEmail(searchValue);
    
    // if search is empty
    if (searchValue.trim() === '') {
      setFilteredLogs(logs);
      return;
    }
  
    // for each element find using filter for comparison
    // the log(s) that included the search value
    const filtered = logs.filter(log => 
      log.user?.email?.toLowerCase().includes(searchValue.toLowerCase())
    );

    // now put into the state
    setFilteredLogs(filtered);
  };
  
  // zero state
  const clearSearch = () => {
    setSearchEmail('');
    setFilteredLogs(logs);
  };
  
  return (
    <>
      <div className="justify-center border bg-blue-500 p-[1rem] rounded-[10px] items-center mb-4 flex flex-col ">
        
        <div className="flex flex-row justify-between w-full">
          <h2 className="heading3 font-semibold">Audit Logs</h2>
          
          {/* search input and close */}
          <div className="relative  rounded-[7px] bg-primary text-[0.75rem] flex flex-row items-center justify-start gap-2">
              <Search className="w-[15px] h-[15px] ml-[3px] text-black/70 absolute left-1"/>
              
              <input 
              type="text" 
              placeholder="Search by e-mail" 
              value={searchEmail}
              onChange={handleSearch}
              className="w-[270px] text-[0.75rem] border border-sgrey py-2 px-2 pl-[1.6rem] rounded-[4px]"/>

            {searchEmail && (
              <span className="cursor-pointer absolute right-1 p-1" onClick={clearSearch} id="clear-search">
                <X className="w-[15px] h-[15px] text-black" />
              </span>
            )}

          </div>

        </div>


        <div className="pt-4 px-0">

            {/* // header */}
            <div className="space-y-2 px-4">
              <div className="flex flex-row items-center justify-center w-full">
              <div className="w-[30%]">Time</div>
              <div className="w-[30%]">Email</div>
              <div className="w-[30%]">Action</div>
            </div>

            {/* no logs state */}
            {!filteredLogs.length && (
              <div className="w-full h-[100px] flex justify-center items-center">
                <p className="paragraph2 font-semibold">No logs found</p>
              </div>
            )}

            {/* filtered logs map  */}
            {filteredLogs?.map((log, index) => (
              <div key={log.id} className={`text-black bg-white
                ${index % 2 === 0 ? 'bg-sgrey1 hover:bg-sgrey2' : 'hover:bg-sgrey2'}
                trans1 rounded-[7px] py-1 flex flex-row items-center justify-center w-full paragraph2 font-light ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                <div className="w-[30%] font-semibold">{new Date(log.timestamp).toLocaleString()}</div>
                <div className="w-[30%]">{log.user.email}</div>
                <div className="w-[30%]">{log.action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
