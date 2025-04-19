"use client"
import React, { useState, useEffect } from 'react'
import Star from './Star'
import { motion } from 'framer-motion'

const StarsContainer2 = ({ size }: { size: number }) => {
  // Calculate container dimensions based on size
  const containerWidth = Math.max(350, size * 7);
  const containerHeight = Math.max(70, size * 2);
  
  // Calculate positions based on size - lowered arc
  const positions = [
    { left: 0, top: containerHeight * 0.45 },
    { left: containerWidth * 0.2, top: containerHeight * 0.3 },
    { left: containerWidth * 0.4, top: containerHeight * 0.2 },  // Higher value = lower position
    { left: containerWidth * 0.6, top: containerHeight * 0.3 },
    { left: containerWidth * 0.8, top: containerHeight * 0.45 },
  ];

  // State to track which stars have appeared
  const [activeStars, setActiveStars] = useState(0);

  // Trigger stars to appear sequentially
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStars(prev => {
        if (prev < positions.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 300); // Adjust timing between stars appearing

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative" style={{ width: containerWidth, height: containerHeight }}>
      {/* Arc of 5 stars with sequential movement animation */}
      {positions.map((pos, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ 
            left: positions[0].left, 
            top: positions[0].top,
            opacity: 0
          }}
          animate={index < activeStars ? { 
            left: pos.left, 
            top: pos.top,
            opacity: 1
          } : { 
            left: positions[0].left, 
            top: positions[0].top,
            opacity: 0
          }}
          transition={{ 
            duration: 0.8, 
            type: "spring", 
            stiffness: 120,
            damping: 14
          }}
        >
          <Star size={size}  />
        </motion.div>
      ))}
    </div>
  )
}

export default StarsContainer2
