'use client'

import React, { useRef, useEffect } from 'react';
import { Chart, registerables, ChartEvent } from 'chart.js';
import { BarChartProps } from './BarChart';
// does not return to the original index when mouse leaves, stays on the last index hovered

// Register all Chart.js components
Chart.register(...registerables);

// Extend BarChartProps to include inactive colors and initial split
interface InteractiveBarChartProps extends BarChartProps {
  inactiveBackgroundColor?: string;
  inactiveBorderColor?: string;
  initialSplitIndex?: number; // New prop for initial color split
  interactiveHover?: boolean; // New prop to enable/disable hover functionality
}

const InteractiveBarChart: React.FC<InteractiveBarChartProps> = ({
  data,
  options = {},
  height = '100%',
  width = '100%',
  backgroundColor = 'rgba(123, 104, 238, 0.8)', // Default purple
  borderColor = 'rgba(123, 104, 238, 1)',
  borderWidth = 1,
  borderRadius = 2,
  hoverBackgroundColor = 'rgba(123, 104, 238, 0.9)',
  hoverBorderColor = 'rgba(123, 104, 238, 1)',
  // New props for inactive colors
  inactiveBackgroundColor = 'rgba(150, 150, 150, 0.6)', // Default gray
  inactiveBorderColor = 'rgba(150, 150, 150, 1)',
  // Initial split index (default to -1 which means no initial split)
  initialSplitIndex = -1,
  // Enable/disable hover functionality (default to true)
  interactiveHover = true,
  xAxisLabel = '',
  yAxisLabel = '',
  title = '',
  legend = true,
  responsive = true,
  maintainAspectRatio = false,
  animation = false,
  barPercentage = 0.9,
  categoryPercentage = 0.8,
  indexAxis = 'x',
  stacked = false,
  // Axis customization props
  xAxisTicksDisplay = true,
  yAxisTicksDisplay = true,
  xAxisTicksColor = '#666',
  yAxisTicksColor = '#666',
  xAxisGridDisplay = true,
  yAxisGridDisplay = true,
  xAxisGridColor = 'rgba(0, 0, 0, 0.1)',
  yAxisGridColor = 'rgba(0, 0, 0, 0.1)',
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const lastHoverIndex = useRef<number | null>(null);

  // Colors for the bars - now using the props
  const activeColor = backgroundColor;
  const inactiveColor = inactiveBackgroundColor;
  const activeBorderColor = borderColor;
  const inactiveBorderColorValue = inactiveBorderColor;

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Create initial colors based on initialSplitIndex
    const dataLength = data.datasets[0].data.length;
    const initialBackgroundColors = Array(dataLength).fill('').map((_, i) => 
      initialSplitIndex >= 0 && i <= initialSplitIndex ? activeColor : inactiveColor
    );
    
    const initialBorderColors = Array(dataLength).fill('').map((_, i) => 
      initialSplitIndex >= 0 && i <= initialSplitIndex ? activeBorderColor : inactiveBorderColorValue
    );

    // Create a deep copy of the data to avoid mutating props
    const chartData = {
      labels: [...data.labels],
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        backgroundColor: initialSplitIndex >= 0 ? initialBackgroundColors : Array(dataset.data.length).fill(activeColor),
        borderColor: initialSplitIndex >= 0 ? initialBorderColors : Array(dataset.data.length).fill(activeBorderColor),
        borderWidth,
        borderRadius,
      })),
    };

    // Set initial hover index if initialSplitIndex is provided
    if (initialSplitIndex >= 0) {
      lastHoverIndex.current = initialSplitIndex;
    }

    // Create new chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        ...options,
        responsive,
        maintainAspectRatio,
        plugins: {
          ...options.plugins,
          title: {
            display: !!title,
            text: title,
            ...options.plugins?.title,
          },
          legend: {
            display: legend,
            ...options.plugins?.legend,
          },
        },
        scales: {
          x: {
            title: {
              display: !!xAxisLabel,
              text: xAxisLabel,
            },
            stacked,
            // Apply x-axis ticks and grid customization
            ticks: {
              display: xAxisTicksDisplay,
              color: xAxisTicksColor,
              ...options.scales?.x?.ticks,
            },
            grid: {
              display: xAxisGridDisplay,
              color: xAxisGridColor,
              ...options.scales?.x?.grid,
            },
            ...options.scales?.x,
          },
          y: {
            title: {
              display: !!yAxisLabel,
              text: yAxisLabel,
            },
            stacked,
            // Apply y-axis ticks and grid customization
            ticks: {
              display: yAxisTicksDisplay,
              color: yAxisTicksColor,
              ...options.scales?.y?.ticks,
            },
            grid: {
              display: yAxisGridDisplay,
              color: yAxisGridColor,
              ...options.scales?.y?.grid,
            },
            ...options.scales?.y,
          },
        },
        indexAxis,
        animation: animation ? undefined : false,
        barPercentage,
        categoryPercentage,
        // Only add onHover if interactiveHover is true
        onHover: interactiveHover ? (event: ChartEvent, elements: any[], chart: Chart) => {
          if (!event.native) return;
          
          // Get the exact bar the mouse is over using Chart.js's built-in hit detection
          if (elements.length > 0) {
            const barIndex = elements[0].index;
            
            // Only update if the hover index has changed
            if (barIndex !== lastHoverIndex.current) {
              lastHoverIndex.current = barIndex;
              
              // Update colors based on hover position
              const dataLength = data.datasets[0].data.length;
              const newBackgroundColors = Array(dataLength).fill('').map((_, i) => 
                i <= barIndex ? activeColor : inactiveColor
              );
              
              const newBorderColors = Array(dataLength).fill('').map((_, i) => 
                i <= barIndex ? activeBorderColor : inactiveBorderColorValue
              );
              
              chart.data.datasets[0].backgroundColor = newBackgroundColors;
              chart.data.datasets[0].borderColor = newBorderColors;
              chart.update('none'); // Use 'none' mode to skip animations
            }
          }
        } : undefined,
      },
    });

    // Add mouseleave event to reset colors
    // const handleMouseLeave = () => {
    //   if (chartInstance.current) {
    //     chartInstance.current.data.datasets[0].backgroundColor = Array(data.datasets[0].data.length).fill(activeColor);
    //     chartInstance.current.data.datasets[0].borderColor = Array(data.datasets[0].data.length).fill(activeBorderColor);
    //     chartInstance.current.update('none'); // Use 'none' mode to skip animations
    //     lastHoverIndex.current = null;
    //   }
    // };

    // chartRef.current.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup function
    return () => {
    //   if (chartRef.current) {
    //     chartRef.current.removeEventListener('mouseleave', handleMouseLeave);
    //   }
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [
    data,
    options,
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius,
    hoverBackgroundColor,
    hoverBorderColor,
    inactiveBackgroundColor,
    inactiveBorderColor,
    xAxisLabel,
    yAxisLabel,
    title,
    legend,
    responsive,
    maintainAspectRatio,
    animation,
    barPercentage,
    categoryPercentage,
    indexAxis,
    stacked,
    xAxisTicksDisplay,
    yAxisTicksDisplay,
    xAxisTicksColor,
    yAxisTicksColor,
    xAxisGridDisplay,
    yAxisGridDisplay,
    xAxisGridColor,
    yAxisGridColor,
    initialSplitIndex,
    interactiveHover,
  ]);

  return (
    <div style={{ height, width, position: 'relative' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default InteractiveBarChart; 