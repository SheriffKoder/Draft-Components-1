"use client"
import React, { useState, useEffect } from 'react'
import Star from './Star'
import { motion } from 'framer-motion'

const StarsContainer1 = ({ size }: { size: number }) => {
  // Calculate container dimensions based on size
  const containerWidth = Math.max(350, size * 7);
  const containerHeight = Math.max(70, size * 2);
  
  // Calculate positions based on size
  const positions = [
    { left: 0, top: containerHeight * 0.55 },
    { left: containerWidth * 0.2, top: containerHeight * 0.25 },
    { left: containerWidth * 0.4, top: containerHeight * 0.05 },
    { left: containerWidth * 0.6, top: containerHeight * 0.25 },
    { left: containerWidth * 0.8, top: containerHeight * 0.55 },
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
      {/* Arc of 5 stars with sequential animation */}
      {positions.map((pos, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: pos.left, top: pos.top }}
          initial={{ opacity: 0, scale: 0 }}
          animate={index < activeStars ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        >
          <Star size={size} className="star-shine" />
        </motion.div>
      ))}
    </div>
  )
}

export default StarsContainer1
