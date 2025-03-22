"use client"
import React, { useEffect, useState } from "react";

export const AnimatedText = ({ text, className = "" }: { text: string | number, className?: string }) => {
  // Use a key to force re-render when text changes
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    // When text changes, update the key to trigger a re-render
    setKey(prevKey => prevKey + 1);
  }, [text]);
  
  return (
    <div className="relative overflow-hidden">
      <div 
        key={key}
        className={`animate-text-change ${className}`}
      >
        {text}
      </div>
      
      <style jsx>{`
        .animate-text-change {
          animation: textChange 0.5s ease-out;
        }
        
        @keyframes textChange {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};