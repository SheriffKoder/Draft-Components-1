"use client"
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface LogoAnimationProps {
  width?: number;
  height?: number;
  color?: string;
  delay?: number;
  duration?: number;
  className?: string;
}

const SignatureAnim: React.FC<LogoAnimationProps> = ({
  width = 300,
  height = 150,
  color = "#0ea5e9",
  delay = 0.5,
  duration = 1.5,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Get all paths
    const paths = containerRef.current?.querySelectorAll(".autograph__path");
    
    if (!paths || paths.length === 0) return;

    // Set initial state for all paths - fully "drawn" (invisible)
    gsap.set(paths, {
      strokeDasharray: function(index, element) {
        return element.getTotalLength();
      },
      strokeDashoffset: function(index, element) {
        return element.getTotalLength();
      },
      stroke: "transparent" // Start with transparent stroke
    });
    
    // Create a timeline for sequential animation
    const tl = gsap.timeline({ delay });
    
    // Animate each path sequentially
    paths.forEach((path, index) => {
      tl.to(path, {
        strokeDashoffset: 0,
        duration,
        ease: "power2.inOut",
        stroke: color,
      }, index * 0.8); // Stagger the start time
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      <svg width={width} height={height} viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* M */}
        <path className="autograph__path" d="M30 100C32 80 35 60 38 40C41 60 45 80 50 100C55 80 60 60 65 40C68 60 70 80 72 100" stroke="transparent" strokeWidth="3" strokeLinecap="round"/>
        
        {/* o */}
        <path className="autograph__path" d="M90 70C85 70 80 75 80 85C80 95 85 105 95 105C105 105 110 95 110 85C110 75 105 70 95 70C90 70 90 75 90 70Z" stroke="transparent" strokeWidth="3" strokeLinecap="round"/>
        
        {/* d */}
        <path className="autograph__path" d="M130 105C140 105 150 95 150 85C150 75 145 70 135 70C125 70 120 80 120 90C120 100 125 105 130 105ZM150 105C150 85 150 65 150 45C150 40 150 35 150 30" stroke="transparent" strokeWidth="3" strokeLinecap="round"/>
        
        {/* o */}
        <path className="autograph__path" d="M170 70C165 70 160 75 160 85C160 95 165 105 175 105C185 105 190 95 190 85C190 75 185 70 175 70C170 70 170 75 170 70Z" stroke="transparent" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    </div>
  );
};

export default SignatureAnim; 