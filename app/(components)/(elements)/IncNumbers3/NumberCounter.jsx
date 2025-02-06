"use client"
import React, { useState, useEffect } from "react";
import "./IncNumbers.css"
const NumberCounter = ({ targetNumber, duration = 2000 }) => {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    if (!targetNumber) return;

    const increment = targetNumber / (duration / 16); // Frames per second (approx 60fps)

    let animationFrame;
    const animateCount = () => {
      setCurrentNumber((prev) => {
        if (prev >= targetNumber) {
          cancelAnimationFrame(animationFrame);
          return targetNumber;
        }
        return Math.min(prev + increment, targetNumber);
      });
      animationFrame = requestAnimationFrame(animateCount);
    };

    animateCount();

    return () => cancelAnimationFrame(animationFrame); // Cleanup on unmount
  }, [targetNumber, duration]);

  return (
    <div className="counter">
      <span>{Math.floor(currentNumber).toLocaleString()}</span>
    </div>
  );
};

export default NumberCounter;
