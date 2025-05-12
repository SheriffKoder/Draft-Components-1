'use client'

import React, { useEffect, useState } from 'react'
import BarChart from './BarChart';

const BarChartContainerV4 = ({
    title,
    value,
    subTitle,
    subTitleExt,
    componentColor,
    initialSplitIndex
}: {
    title: string;
    value: string;
    subTitle: string;
    subTitleExt?: string;
    componentColor?: string;
    initialSplitIndex?: number;
}) => {


// Sample data for the bar chart
const sampleData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Sales 2023',
        data: [1,3, 4, 7, 4, 3, 1, 3, 4, 5, 6, 9, 10, 6, 5, 4],
        // backgroundColor: 'rgba(75, 192, 192, 0.2)',
        // borderColor: 'rgba(75, 192, 192, 1)',
      },
    //   {
    //     label: 'Sales 2022',
    //     data: [8, 15, 7, 3, 6, 9],
    //     backgroundColor: 'rgba(153, 102, 255, 0.2)',
    //     borderColor: 'rgba(153, 102, 255, 1)',
    //   },
    ],
  };

  const sampleData_ghost = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Sales 2023',
        data: [1,3, 4, 7, 4, 3, 1, 3, 4, 5, 6, 9, 10, 6, 5, 4, 3, 2, 1, 4, 13, 9, 1, 5 ,7],
        // backgroundColor: 'rgba(75, 192, 192, 0.2)',
        // borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

// More complex sample data
const complexSampleData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenue',
        data: [1200, 1900, 2300, 2800],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
      },
      {
        label: 'Expenses',
        data: [900, 1200, 1700, 2100],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Profit',
        data: [300, 700, 600, 700],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

// Horizontal bar chart data
const horizontalBarData = {
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    datasets: [
      {
        label: 'Performance',
        data: [85, 72, 90, 65, 78],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
      },
    ],
};

// Define arrays of indexes for different color categories
const redHighlightIndexes = [10, 15, 20]; // Indexes to highlight in red
const greenHighlightIndexes = [5, 12, 18]; // Indexes to highlight in green

const volumeData = {
  labels: [
    "Jan 1", "Jan 2", "Jan 3", "Jan 4", "Jan 5", "Jan 6", "Jan 7", "Jan 8", 
    "Jan 9", "Jan 10", "Jan 11", "Jan 12", "Jan 13", "Jan 14", "Jan 15", 
    "Jan 16", "Jan 17", "Jan 18", "Jan 19", "Jan 20", "Jan 21", "Jan 22", 
    "Jan 23", "Jan 24", "Jan 25", "Jan 26", "Jan 27", "Jan 28", "Jan 29", "Jan 30"
  ],
  datasets: [
    {
      label: "Trading Volume",
      data: [
        42, 78, 35, 40, 65, 55, 25, 30, 45, 52, 
        60, 48, 80, 95, 110, 75, 65, 90, 120, 135, 
        85, 30, 25, 20, 15, 22, 18, 25, 30, 28
      ],
      backgroundColor: Array(30).fill('').map((_, i) => {
        // Red highlights
        if (redHighlightIndexes.includes(i)) return 'rgba(255, 99, 132, 0.8)';
        
        // Green highlights
        if (greenHighlightIndexes.includes(i)) return 'rgba(75, 192, 192, 0.8)';
        
        // Regular coloring scheme
        if (i < 22) return 'rgba(123, 104, 238, 0.8)';  // Purple for first 22 (except highlighted)
        return 'rgba(255, 255, 255, 0.1)';              // Gray for last 8
      }),
      borderColor: [
        // First 22 bars with purple/blue border
        ...Array(22).fill('rgba(123, 104, 238, 0.8)'),
        // Last 8 bars with gray border
        ...Array(8).fill('rgba(255, 255, 255, 0.1)')
      ],
      borderWidth: 0,
      borderRadius: 0,
    }
  ]
};

const [primaryColor, setPrimaryColor] = useState<string>("#000000");
const [secondaryColor, setSecondaryColor] = useState<string>("#000000");
const [tertiaryColor, setTertiaryColor] = useState<string>("#000000");
const [boxesPerLine, setBoxesPerLine] = useState(70);

    // Function to update colors from CSS variables
    const updateColors = () => {
        
          const colorPrimary = getComputedStyle(document.documentElement)
            .getPropertyValue('--color-primary').trim();
          const colorSecondary = getComputedStyle(document.documentElement)
            .getPropertyValue('--color-secondary').trim();
          const colorTertiary = getComputedStyle(document.documentElement)
            .getPropertyValue('--color-tertiary').trim();
        // const colorPrimary = "#ffffff36";
        // const colorSecondary = "#ffffff";
        // const colorTertiary = "#8b5cf6";
        if (colorPrimary) setPrimaryColor(colorPrimary);
        if (colorSecondary) setSecondaryColor(colorSecondary);
        if (colorTertiary) setTertiaryColor(colorTertiary);
    };

    // Initial color setup
    useEffect(() => {
    updateColors();
    }, []);

    // Listen for theme changes
    useEffect(() => {
    // Create a MutationObserver to watch for changes to the document's class or style
    const observer = new MutationObserver(updateColors);
    
    // Start observing the document with the configured parameters
    observer.observe(document.documentElement, { 
        attributes: true, 
        attributeFilter: ['class', 'style'] 
    });
    
    // Clean up the observer on component unmount
    return () => observer.disconnect();
    }, []);
  return (
    <div className='px-[1.5rem] py-[1.5rem] relative text-foreground flex items-center justify-center h-full'>

        {/* Title */}
        <h3 className='text-sm absolute top-[1.5rem] left-[1.5rem]'>{title}</h3>

        {/* Score */}
        <div className='absolute right-[1.5rem] top-[1.5rem]'>
            <span className='text-2xl font-medium'>${value}</span>
                <div className='flex flex-row items-center gap-1 justify-end'>
                <span className='text-xs text-foreground/30'>{subTitle}</span>
                    {subTitleExt && (
                        <span className='text-xs text-tertiary'>({subTitleExt}%)</span>
                    )}
                </div>
        </div>

        {/* Chart */}
        <div className='w-full h-[220px] relative mt-[2rem]'>

          <div className='absolute top-0 left-0 w-full h-full'>
              <BarChart
              backgroundColor = "rgba(255, 255, 255, 0.1)"
              borderColor = "rgba(255, 255, 255, 0.1)"
              borderWidth = {0}
              borderRadius = {0}
              hoverBackgroundColor = {primaryColor}
              hoverBorderColor = {primaryColor}
              // xAxisLabel = ''
              // yAxisLabel = ''
              // title = ''
              legend = {false}
              responsive = {true}
              maintainAspectRatio = {false}
              animation = {true}
              barPercentage = {2}
              categoryPercentage = {0.2}
              indexAxis = 'x'
              stacked = {true}
              xAxisTicksDisplay = {true}
              yAxisTicksDisplay = {false}
              xAxisTicksFontSize = {10}
              yAxisTicksFontSize = {10}
              // xAxisTicksColor = {primaryColor}
              // yAxisTicksColor = {primaryColor}
              xAxisGridDisplay = {false}
              yAxisGridDisplay = {false}
              // xAxisGridColor = {primaryColor}
              // yAxisGridColor = {primaryColor}

              data={volumeData}
          //   title="Quarterly Financial Performance"
          //   xAxisLabel="Quarter"
          //   yAxisLabel="Amount (USD)"
          //   borderRadius={8}
          //   stacked={true}
              options={{
              plugins: {
                  tooltip: {
                  callbacks: {
                      footer: (tooltipItems) => {
                      return 'Click for details';
                      },
                  },
                  },
              },
              }}
              />

            {/* <InteractiveBarChart 
              data={volumeData}
              backgroundColor = {componentColor}
              borderColor = {componentColor}
              inactiveBackgroundColor = "rgba(255, 255, 255, 0.1)"
              inactiveBorderColor = "rgba(255, 255, 255, 0.1)"
              borderWidth = {0}
              borderRadius = {0}
              hoverBackgroundColor = {primaryColor}
              hoverBorderColor = {primaryColor}
              // xAxisLabel = ''
              // yAxisLabel = ''
              // title = ''
              legend = {false}
              responsive = {true}
              maintainAspectRatio = {false}
              animation = {true}
              barPercentage = {2}
              categoryPercentage = {0.2}
              indexAxis = 'x'
              stacked = {true}
              xAxisTicksDisplay = {false}
              yAxisTicksDisplay = {false}
              // xAxisTicksColor = {primaryColor}
              // yAxisTicksColor = {primaryColor}
              xAxisGridDisplay = {false}
              yAxisGridDisplay = {false}
              // xAxisGridColor = {primaryColor}
              // yAxisGridColor = {primaryColor}
              interactiveHover = {true}
              initialSplitIndex={initialSplitIndex}
              //   title="Quarterly Financial Performance"
              //   xAxisLabel="Quarter"
              //   yAxisLabel="Amount (USD)"
              //   borderRadius={8}
              //   stacked={true}
              options={{
              plugins: {
                  tooltip: {
                  callbacks: {
                      footer: (tooltipItems) => {
                      return 'Click for details';
                      },
                  },
                  },
              },
              }}
              /> */}

          </div>

          {/* <div className='absolute top-0 left-0 w-full h-full'>
              <BarChart
              backgroundColor = "#8676da"
              borderColor = "#8676da"
              borderWidth = {1}
              borderRadius = {0}
              hoverBackgroundColor = {primaryColor}
              hoverBorderColor = {primaryColor}
              // xAxisLabel = ''
              // yAxisLabel = ''
              // title = ''
              legend = {false}
              responsive = {true}
              maintainAspectRatio = {false}
              animation = {true}
              barPercentage = {2}
              categoryPercentage = {0.2}
              indexAxis = 'x'
              stacked = {true}
              xAxisTicksDisplay = {false}
              yAxisTicksDisplay = {false}
              // xAxisTicksColor = {primaryColor}
              // yAxisTicksColor = {primaryColor}
              xAxisGridDisplay = {false}
              yAxisGridDisplay = {false}
              // xAxisGridColor = {primaryColor}
              // yAxisGridColor = {primaryColor}

              data={sampleData}
          //   title="Quarterly Financial Performance"
          //   xAxisLabel="Quarter"
          //   yAxisLabel="Amount (USD)"
          //   borderRadius={8}
          //   stacked={true}
              options={{
              plugins: {
                  tooltip: {
                  callbacks: {
                      footer: (tooltipItems) => {
                      return 'Click for details';
                      },
                  },
                  },
              },
              }}
              />
          </div> */}

            {/* <BarChart 
            data={horizontalBarData}
            title="Team Performance"
            xAxisLabel="Score"
            yAxisLabel="Team"
            indexAxis="y"
            animation={true}
            /> */}
        </div>

        {/* Footer */}
        <div className='absolute bottom-[1.5rem] px-[1.5rem] flex flex-row items-center w-full text-foreground/30 text-xs'>
            <span className=''>12 Aug</span>
            <div className='flex flex-row items-center gap-[6rem] ml-auto'>
              <span className='text-foreground'>4 Sept</span>
              <span className=''>12 Sept</span>
            </div>
        </div>


    </div>
  )
}

export default BarChartContainerV4
