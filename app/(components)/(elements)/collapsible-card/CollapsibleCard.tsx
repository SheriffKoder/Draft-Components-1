"use client";

import { useState } from "react";

const CollapsibleCard = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full max-w-md text-white border-white border rounded-[10px]
    overflow-hidden">
      {/* Header */}
      <div 
        className="p-4 cursor-pointer hover:bg-indigo-900 border-b
        rounded-b-[10px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold">Click me to collapse/expand</h3>
      </div>

      {/* Collapsible Content */}
      <div className={`grid transition-all duration-300 ease-in-out ${
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}>
        <div className="overflow-hidden">
          <div className="p-4">
            <p>This is the content that will be collapsed/expanded.</p>
            <p className="mt-2">This contains your actual content</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollapsibleCard;