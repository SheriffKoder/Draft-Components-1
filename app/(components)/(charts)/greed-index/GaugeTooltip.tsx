import React from 'react';

interface GaugeTooltipProps {
  title: string;
  subtitle?: string;
  color?: string;
  position: { x: number; y: number };
  visible: boolean;
}

const GaugeTooltip: React.FC<GaugeTooltipProps> = ({
  title,
  subtitle,
  color = '#ffffff',
  position,
  visible
}) => {
  if (!visible) return null;
  
  return (
    <div 
      className="absolute z-10 px-3 py-2 rounded shadow-lg bg-gray-800 text-white pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out',
      }}
    >
      <div 
        className="whitespace-nowrap"
        style={{
          minWidth: '120px', // Set a fixed minimum width
          maxWidth: '200px', // Set a maximum width
          width: 'auto',     // Let it grow based on content
          opacity: visible ? 1 : 0
        }}
      >
        <div className="flex flex-col items-center">
          <span 
            className="font-medium text-sm"
            style={{ color }}
          >
            {title}
          </span>
          {subtitle && (
            <span 
              className="text-xs mt-1 text-center"
            //   style={{ color }}
            >
              {subtitle}
            </span>
          )}
        </div>
      </div>
      <div 
        className="absolute w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent"
        style={{
          borderTopColor: '#1f2937', // bg-gray-800
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      />
    </div>
  );
};

export default GaugeTooltip; 