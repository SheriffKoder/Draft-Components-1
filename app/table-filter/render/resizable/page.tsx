/**
 * Grid Layout with Resizable Bottom-Right Cell
 * 
 * This component creates a 2x2 grid layout where the bottom-right cell
 * can be resized by dragging a handle in its top-left corner.
 * 
 * Resizing mechanism:
 * 1. The grid uses CSS Grid with percentage-based template columns and rows
 * 2. When the user drags the resize handle, we calculate the new size percentages
 * 3. The resize handle is positioned at the top-left of the bottom-right cell
 * 4. Dragging inward makes the bottom-right cell smaller, outward makes it larger
 * 5. Size constraints (20%-80%) prevent cells from becoming too small or too large
 */

"use client";

import { DemoTableClient } from "./table-client-resizable";
import { useState, useRef, useEffect } from "react";

export default function GridLayoutPage() {
  // State to track the size of the bottom-right cell (as percentages)
  const [bottomRightSize, setBottomRightSize] = useState({ width: 50, height: 50 });
  
  // Reference to the container element for calculating relative sizes
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs to track resize state without triggering re-renders
  const isResizing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 50, height: 50 });

  /**
   * Handles the mouse down event on the resize handle
   * Initiates the resizing operation by setting the initial state
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    // Start resizing
    isResizing.current = true;
    
    // Store the initial mouse position
    startPos.current = { x: e.clientX, y: e.clientY };
    
    // Store the initial size of the bottom-right cell
    startSize.current = { ...bottomRightSize };
    
    // Change cursor to indicate resizing
    document.body.style.cursor = 'nwse-resize';
    
    // Prevent default browser behavior
    e.preventDefault();
  };

  /**
   * Effect to handle mouse move and mouse up events for resizing
   * These are added to the document to capture events outside the component
   */
  useEffect(() => {
    /**
     * Handles mouse movement during resizing
     * Calculates new cell sizes based on mouse movement
     */
    const handleMouseMove = (e: MouseEvent) => {
      // Only process if we're currently resizing
      if (!isResizing.current) return;
      
      // Calculate how far the mouse has moved from the starting position
      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;
      
      // Get container dimensions for percentage calculations
      const containerWidth = containerRef.current?.clientWidth || 1;
      const containerHeight = containerRef.current?.clientHeight || 1;
      
      // Calculate new width and height as percentages
      // Note: We subtract deltaX/Y because moving right/down should make the cell smaller
      // Constrain between 20% and 80% to prevent cells from becoming too small or too large
      const newWidth = Math.max(20, Math.min(80, startSize.current.width - (deltaX / containerWidth * 100)));
      const newHeight = Math.max(20, Math.min(80, startSize.current.height - (deltaY / containerHeight * 100)));
      
      // Update the state with the new size
      setBottomRightSize({ width: newWidth, height: newHeight });
    };

    /**
     * Handles the end of the resize operation when the mouse button is released
     */
    const handleMouseUp = () => {
      // End resizing
      isResizing.current = false;
      
      // Reset cursor
      document.body.style.cursor = 'default';
    };

    // Add event listeners to the document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Clean up event listeners when component unmounts or effect re-runs
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="h-screen w-full" ref={containerRef}>
      <div 
        className="grid h-full w-full text-black" 
        style={{
          // Dynamic grid template based on the current size state
          // The first cell takes up (100 - bottomRightSize) percent, the second takes bottomRightSize percent
          gridTemplateColumns: `${100 - bottomRightSize.width}% ${bottomRightSize.width}%`,
          gridTemplateRows: `${100 - bottomRightSize.height}% ${bottomRightSize.height}%`
        }}
      >
        {/* Top Left Cell */}
        <div className="border border-gray-300 p-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Top Left Cell</h2>
          <p>This is the top left section of the grid.</p>
        </div>
        
        {/* Top Right Cell */}
        <div className="border border-gray-300 p-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Top Right Cell</h2>
          <p>This is the top right section of the grid.</p>
        </div>
        
        {/* Bottom Left Cell */}
        <div className="border border-gray-300 p-4 bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Bottom Left Cell</h2>
          <p>This is the bottom left section of the grid.</p>
        </div>
        
        {/* Bottom Right Cell - Contains the GenericTable */}
        <div className="border border-gray-300 overflow-hidden relative">
          <DemoTableClient />
          
          {/* Resize handle - positioned at the top-left corner of the bottom-right cell */}
          <div 
            className="absolute top-0 left-0 w-4 h-4 bg-gray-400 cursor-nwse-resize rounded-br-md"
            onMouseDown={handleMouseDown}
            title="Drag to resize"
          />
        </div>
      </div>
    </div>
  );
}


/*

The Core Concept
The page creates a 2x2 grid where you can resize the bottom-right cell by dragging a handle. 
It's like adjusting panes in a window manager, but we're building it from scratch with React.


Key Components
- CSS Grid Layout: We use CSS Grid with percentage-based dimensions to create the 2x2 layout.
- State Management: We track the size of the bottom-right cell using React state:

   const [bottomRightSize, setBottomRightSize] = useState({ width: 50, height: 50 });

- Resize Handle: A small div positioned at the top-left corner of the bottom-right cell that users can drag.


The Resize Logic /////////////////////////////
The resize functionality works through these steps:

// 1 Initialization: When the user clicks on the resize handle, we:
Set isResizing to true
Store the initial mouse position
Store the initial cell size

   const handleMouseDown = (e) => {
     isResizing.current = true;
     startPos.current = { x: e.clientX, y: e.clientY };
     startSize.current = { ...bottomRightSize };
     // ...
   };


// 2 Tracking Movement: As the user drags, we:
    Calculate how far the mouse has moved (deltaX, deltaY)
    Convert this movement to percentage of the container size
    Calculate new cell dimensions



// 3 Applying Constraints: We limit the size to prevent cells from becoming too small or too large:
   const newWidth = Math.max(20, Math.min(80, startSize.current.width - (deltaX / containerWidth * 100)));

// 4 Updating the Layout: We update the state with the new dimensions, which causes React to re-render with the new grid template:
  style={{
     gridTemplateColumns: `${100 - bottomRightSize.width}% ${bottomRightSize.width}%`,
     gridTemplateRows: `${100 - bottomRightSize.height}% ${bottomRightSize.height}%`
   }}

// 5 Cleanup: When the user releases the mouse, we reset the resizing state.


Event Handling /////////////////////////////
We use React's useEffect to add and remove event listeners for mouse movement and release. This is important because:
We need to track mouse movement even when it leaves the resize handle
We need to detect when the mouse is released anywhere in the document
    useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };
    }, []);

The Math Behind It
The resize calculation is a bit counterintuitive at first:
    
    const newWidth = startSize.current.width - (deltaX / containerWidth * 100)

We subtract the delta because:
Moving the handle right (positive deltaX) should make the bottom-right cell smaller
Moving the handle left (negative deltaX) should make it larger
The same logic applies to the height calculation.




*/