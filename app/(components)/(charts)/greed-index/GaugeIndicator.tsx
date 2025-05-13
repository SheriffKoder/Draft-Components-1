import React, { useEffect, useRef } from 'react';

interface GaugeIndicatorProps {
  center: number;
  innerRadius: number;
  arcSpan: number;
  rotation: number;
  value: number; // 0-100 percentage
  color?: string;
  baseWidth?: number;
  length?: number;
  offset?: number; // Distance from inner radius
  className?: string;
  transitionDuration?: number; // Duration of transition in milliseconds
  springConfig?: {
    tension?: number;    // Controls the "stiffness" (0-1)
    friction?: number;   // Controls the "bounciness" (0-1)
    precision?: number;  // Controls the precision of the animation
  };
}

const GaugeIndicator: React.FC<GaugeIndicatorProps> = ({
  center,
  innerRadius,
  arcSpan,
  rotation,
  value = 50,
  color = '#FF5733',
  baseWidth = 10,
  length = 15,
  offset = 5,
  className = '',
  transitionDuration = 1500, // Default to 1.5 seconds
  springConfig = {
    tension: 0.34,
    friction: 0.64,
    precision: 1.56
  }
}) => {
  // Refs for animation
  const indicatorRef = useRef<SVGGElement>(null);
  const prevValueRef = useRef<number>(value);
  
  // Helper function to convert polar coordinates to cartesian
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90 + rotation) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };
  
  // Calculate indicator position and path (pointing upwards)
  const getIndicatorPath = () => {
    // Base is at offset from inner radius
    const baseRadius = innerRadius + offset;
    // Tip is outside
    const tipRadius = innerRadius + offset + length;
    
    // Create path for upward-pointing triangle
    return `
      M 0 ${-tipRadius}
      L ${-baseWidth / 2} ${-baseRadius}
      L ${baseWidth / 2} ${-baseRadius}
      Z
    `;
  };
  
  // Calculate angle for the indicator based on value
  const getIndicatorAngle = (indicatorValue: number) => {
    // Convert indicator value to angle
    const indicatorPercent = Math.min(100, Math.max(0, indicatorValue)); // Clamp between 0-100
    return (indicatorPercent / 100) * arcSpan + rotation;
  };
  
  // Generate cubic-bezier curve from spring config
  const getCubicBezier = (config: typeof springConfig) => {
    const tension = config.tension ?? 0.34;
    const friction = config.friction ?? 0.64;
    const precision = config.precision ?? 1.56;
    return `cubic-bezier(${tension}, ${precision}, ${1 - tension}, ${friction})`;
  };
  
  // Update rotation when value changes
  useEffect(() => {
    if (!indicatorRef.current) return;
    
    const angle = getIndicatorAngle(value);
    const cubicBezier = getCubicBezier(springConfig);
    
    // Set the transform attribute with transition
    indicatorRef.current.style.transition = `transform ${transitionDuration}ms ${cubicBezier}`;
    indicatorRef.current.style.transform = `rotate(${angle}deg)`;
    
    // Update the previous value
    prevValueRef.current = value;
  }, [value, transitionDuration, arcSpan, rotation, springConfig]);
  
  // Initial angle
  const initialAngle = getIndicatorAngle(prevValueRef.current);
  
  return (
    <g
      ref={indicatorRef}
      transform={`rotate(${initialAngle})`}
      transform-origin={`${center} ${center}`}
      className={`triangle-indicator ${className}`}
    >
      <path
        d={getIndicatorPath()}
        fill={color}
        stroke="none"
        filter="url(#indicator-shadow)"
        transform={`translate(${center} ${center})`}
      />
      
      {/* Shadow filter for indicator */}
      <defs>
        <filter id="indicator-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="1" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>
    </g>
  );
};

export default GaugeIndicator; 