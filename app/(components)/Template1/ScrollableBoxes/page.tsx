"use client"

import { useState, useEffect } from "react";

interface ScrollableBoxesProps {
  numberOfBoxes: number;
  visibleBoxes?: number;
  scrollStep?: number;
  boxWidth?: number;
  boxHeight?: number;
  autoPlay?: boolean;
  autoPlaySpeed?: number; // milliseconds
  pauseOnHover?: boolean;
  smoothAnimation?: boolean;
  enableLoop?: boolean;
  rotation?: string;
}

const ScrollableBoxes = ({ 
  numberOfBoxes, 
  visibleBoxes = 3, 
  scrollStep = 0.5,
  boxWidth = 200,
  boxHeight = 200,
  autoPlay = false,
  autoPlaySpeed = 2000,
  pauseOnHover = true,
  smoothAnimation = false,
  enableLoop = false,
  rotation = 'none'
}: ScrollableBoxesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [smoothOffset, setSmoothOffset] = useState(0);
  const dragThreshold = 50;

  const boxes = Array.from({ length: numberOfBoxes }, (_, i) => i);
  
  const canScrollPrev = enableLoop ? true : currentIndex > 0;
  const canScrollNext = enableLoop ? true : currentIndex < numberOfBoxes - visibleBoxes;

  // Calculate container and visible area dimensions
  const containerWidth = visibleBoxes * boxWidth;
  const containerHeight = boxHeight;
  const totalWidth = numberOfBoxes * boxWidth;

  // Smooth auto-play functionality
  useEffect(() => {
    if (!autoPlay || (pauseOnHover && isHovered) || isDragging) return;

    if (smoothAnimation) {
      // Smooth continuous animation (always forward)
      const pixelsPerFrame = boxWidth / (autoPlaySpeed / 16); // 60fps
      
      const animate = () => {
        setSmoothOffset(prev => {
          const newOffset = prev + pixelsPerFrame;
          const totalContentSize = numberOfBoxes * boxWidth;
          const containerSize = visibleBoxes * boxWidth;
          const maxOffset = totalContentSize - containerSize;
          
          // Use totalContentSize for seamless looping with duplicated content
          if (newOffset >= totalContentSize) {
            return newOffset - totalContentSize;
          } else if (newOffset <= -totalContentSize) {
            return newOffset + totalContentSize;
          }
          
          return newOffset;
        });
      };

      const animationFrame = setInterval(animate, 16); // ~60fps
      return () => clearInterval(animationFrame);
    } else {
      // Step-based animation (always forward)
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = numberOfBoxes - visibleBoxes;
          if (prev >= maxIndex) {
            return 0; // Jump directly to start
          }
          return prev + scrollStep;
        });
      }, autoPlaySpeed);

      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlaySpeed, pauseOnHover, isHovered, isDragging, smoothAnimation, numberOfBoxes, visibleBoxes, scrollStep, boxWidth]);

  const handleNext = () => {
    if (enableLoop) {
      setCurrentIndex((prev) => {
        const maxIndex = numberOfBoxes - visibleBoxes;
        if (prev >= maxIndex) {
          return 0; // Jump directly to start
        }
        return prev + scrollStep;
      });
    } else if (canScrollNext) {
      setCurrentIndex((prev) => prev + scrollStep);
    }
  };

  const handlePrev = () => {
    if (enableLoop) {
      setCurrentIndex((prev) => {
        const maxIndex = numberOfBoxes - visibleBoxes;
        if (prev <= 0) {
          return maxIndex; // Jump directly to end
        }
        return prev - scrollStep;
      });
    } else if (canScrollPrev) {
      setCurrentIndex((prev) => prev - scrollStep);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos(e.clientX);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const currentPos = e.clientX;
    const delta = startPos - currentPos;
    
    if (Math.abs(delta) > dragThreshold) {
      if (delta > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      
      setIsDragging(false);
      setStartPos(0);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setStartPos(0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setStartPos(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const progressPercentage = smoothAnimation 
    ? (() => {
        const containerSize = visibleBoxes * boxWidth;
        const totalContentSize = numberOfBoxes * boxWidth;
        const maxOffset = totalContentSize - containerSize;
        // Normalize using totalContentSize to handle seamless looping
        const normalizedOffset = ((smoothOffset % totalContentSize) + totalContentSize) % totalContentSize;
        // Map to maxOffset range for progress calculation
        const mappedOffset = Math.min(normalizedOffset, maxOffset);
        // Calculate progress based on scroll positions
        const totalPositions = numberOfBoxes - visibleBoxes + 1;
        const currentPosition = (mappedOffset / maxOffset) * (totalPositions - 1);
        // Convert position to percentage
        return (currentPosition / (totalPositions - 1)) * 100;
      })()
    : ((currentIndex + scrollStep) / (numberOfBoxes - visibleBoxes + scrollStep)) * 100;

  // Calculate transform position
  const getTransformValue = () => {
    if (smoothAnimation) {
      return `translateX(-${smoothOffset}px)`;
    } else {
      return `translateX(-${currentIndex * boxWidth}px)`;
    }
  };

  return (
    <div className="p-8 bg-gray-100 h-full w-full border">
      {/* Container */}
      <div 
        className="relative overflow-hidden bg-white rounded-lg shadow-lg mx-auto"
        style={{ 
          width: `${containerWidth}px`, 
          height: `${containerHeight}px`,
          userSelect: 'none' 
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {/* Boxes Container */}
        <div
          className={`flex flex-row ${
            smoothAnimation ? '' : 'transition-transform duration-300 ease-in-out'
          }`}
          style={{
            transform: getTransformValue(),
            width: `${totalWidth * 2}px`, // Double width for seamless loop
            height: `${containerHeight}px`
          }}
        >
          {/* Render boxes twice for seamless loop */}
          {[...boxes, ...boxes].map((box, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 bg-blue-500 border-2 border-blue-600 flex items-center justify-center text-white font-bold text-xl"
              style={{
                width: `${boxWidth}px`,
                height: `${boxHeight}px`,
                
              }}
            >
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -${rotation}`}>{(index % numberOfBoxes) + 1}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6 max-w-md mx-auto">
        {/* Progress Bar */}
        <div className="flex-1 bg-gray-300 rounded-full h-2 mr-4">
          <div
            className={`bg-blue-500 h-full rounded-full ${Math.round(progressPercentage) > 0 ? 'transition-all duration-300' : ''}`}
            style={{ width: `${Math.round(progressPercentage)}%` }}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            →
          </button>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: numberOfBoxes }, (_, i) => {
          const isActive = smoothAnimation 
            ? (() => {
                const containerSize = visibleBoxes * boxWidth;
                const maxOffset = (numberOfBoxes * boxWidth) - containerSize;
                const normalizedOffset = ((smoothOffset % maxOffset) + maxOffset) % maxOffset;
                // Calculate which position we're at based on the scroll positions, not box positions
                const totalPositions = numberOfBoxes - visibleBoxes + 1;
                const currentPosition = (normalizedOffset / maxOffset) * (totalPositions - 1);
                // Map the position to the box index
                const scaledPosition = (currentPosition / (totalPositions - 1)) * (numberOfBoxes - 1);
                return Math.round(scaledPosition) === i;
              })()
            : enableLoop 
              ? (() => {
                  const normalizedIndex = currentIndex >= numberOfBoxes ? currentIndex - numberOfBoxes : currentIndex;
                  // Map the scroll positions to box indices
                  const totalPositions = numberOfBoxes - visibleBoxes + 1;
                  const scaledIndex = (normalizedIndex / (totalPositions - 1)) * (numberOfBoxes - 1);
                  return Math.round(scaledIndex) === i;
                })()
              : (() => {
                  // Map the scroll positions to box indices for non-loop mode
                  const totalPositions = numberOfBoxes - visibleBoxes + 1;
                  const scaledIndex = (currentIndex / (totalPositions - 1)) * (numberOfBoxes - 1);
                  return Math.round(scaledIndex) === i;
                })();

          return (
            <button
              key={i}
              onClick={() => {
                if (smoothAnimation) {
                  const containerSize = visibleBoxes * boxWidth;
                  const maxOffset = (numberOfBoxes * boxWidth) - containerSize;
                  setSmoothOffset((i / (numberOfBoxes - visibleBoxes)) * maxOffset);
                } else {
                  setCurrentIndex(i);
                }
              }}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                isActive ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          );
        })}
      </div>

      {/* Debug Info */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        Current Index: {currentIndex} | Boxes: {numberOfBoxes} | Progress: {Math.round(progressPercentage)}%
        {autoPlay && <span> | Auto-play: forward | Speed: {autoPlaySpeed}ms | Mode: {smoothAnimation ? 'Smooth' : 'Steps'}</span>}
      </div>
    </div>
  );
};

const page = () => {
    const rotation = 'rotate-0'
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className={`h-[500px] w-[700px] border ${rotation}`}>
        <ScrollableBoxes 
            numberOfBoxes={5} 
            visibleBoxes={2}
            boxWidth={300}
            boxHeight={200}
            scrollStep={1}
            // autoPlay={true}
            autoPlaySpeed={5000}
            pauseOnHover={true}
            // smoothAnimation={true}
            enableLoop={true}
            rotation={rotation}
            />
        </div>
    </div>
  )
}

export default page;