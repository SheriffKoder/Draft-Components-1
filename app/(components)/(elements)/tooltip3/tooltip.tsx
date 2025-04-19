"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  maxWidth?: string;
  className?: string;
  backgroundColor?: string;
  fontColor?: string;
}

export const Tooltip = ({
  content,
  children,
  position = "top",
  delay = 300,
  maxWidth = "200px",
  className = "text-white bg-primary",
  backgroundColor = "bg-blue-500",
  fontColor = "text-white",
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate position based on the trigger element
  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    let x = 0;
    let y = 0;
    
    switch (position) {
      case "top":
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.top - tooltipRect.height - 8;
        break;
      case "bottom":
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.bottom + 8;
        break;
      case "left":
        x = triggerRect.left - tooltipRect.width - 8;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
      case "right":
        x = triggerRect.right + 8;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
    }
    
    // Ensure tooltip stays within viewport
    x = Math.max(8, Math.min(x, window.innerWidth - tooltipRect.width - 8));
    y = Math.max(8, Math.min(y, window.innerHeight - tooltipRect.height - 8));
    
    setCoords({ x, y });
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
    }
    
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div 
      className="inline-block relative text-left w-fit"
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <div className={`${isVisible ? 'text-primary' : ''}
      transition-all duration-300`}>
        {children}
      </div>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            className="fixed z-50 pointer-events-none"
            style={{ 
              left: coords.x, 
              top: coords.y,
              maxWidth
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`${className} text-xs rounded-lg py-2 px-3 shadow-lg text-center ${fontColor} ${backgroundColor}`}>
              {content}
              <div 
                className={`absolute w-2 h-2 ${backgroundColor} transform rotate-45 ${
                  position === "bottom" ? "top-[-4px]" : 
                  position === "top" ? "bottom-[-4px]" : 
                  position === "left" ? "right-[-4px]" : 
                  "left-[1px] top-1/2 -translate-y-1/2"
                } left-1/2 -translate-x-1/2`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};