'use client'

import React, { useEffect, useState } from 'react'
import InteractiveBarChart from './InteractiveBarChart-v3';

const BarChartContainerV8 = ({
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


// Sample data array
const data = {
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
      ]
    }
  ]
};

// Dynamic calculation of indexes to highlight
const redHighlightIndexes = data.datasets[0].data
  .map((value, index) => ({ value, index }))
  .filter(item => item.value > 100) // Highlight values over 100 in red
  .map(item => item.index);

const greenHighlightIndexes = data.datasets[0].data
  .map((value, index) => ({ value, index }))
  .filter(item => item.value <= 30) // Highlight values under 30 in green
  .map(item => item.index);

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

      // backgroundColor: Array(30).fill('').map((_, i) => {
      //   // Red highlights
      //   if (redHighlightIndexes.includes(i)) return 'rgba(255, 99, 132, 0.8)';
        
      //   // Green highlights
      //   if (greenHighlightIndexes.includes(i)) return 'rgba(75, 192, 192, 0.8)';
        
      //   // Regular coloring scheme
      //   if (i < 22) return 'rgba(123, 104, 238, 0.8)';  // Purple for first 22 (except highlighted)
      //   return 'rgba(255, 255, 255, 0.1)';              // Gray for last 8
      // }),
      // borderColor: [
      //   // First 22 bars with purple/blue border
      //   // ...Array(22).fill('rgba(123, 104, 238, 0.8)'),
      //   // Last 8 bars with gray border
      //   // ...Array(8).fill('rgba(255, 255, 255, 0.1)')
      // ],
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
        
          // const colorPrimary = getComputedStyle(document.documentElement)
          //   .getPropertyValue('--color-primary').trim();
          // const colorSecondary = getComputedStyle(document.documentElement)
          //   .getPropertyValue('--color-secondary').trim();
          // const colorTertiary = getComputedStyle(document.documentElement)
          //   .getPropertyValue('--color-tertiary').trim();
        const colorPrimary = "rgba(21, 231, 204, 1)";
        const colorSecondary = "rgba(231, 21, 141, 0.5)";
        const colorTertiary = "rgba(15, 146, 248, 0.5)";
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


    const complexSampleData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Revenue',
          data: [1200, 1900, 2300, 2800],
          backgroundColor: primaryColor,
          borderColor: primaryColor,
        },
        {
          label: 'Expenses',
          data: [900, 1200, 1700, 2100],
          backgroundColor: secondaryColor,
          borderColor: secondaryColor,
        },
        {
          label: 'Profit',
          data: [300, 700, 600, 700],
          backgroundColor: tertiaryColor,
          borderColor: tertiaryColor,
        },
      ],
    };
    


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
              {/* <BarChart
              backgroundColor = {componentColor}
              borderColor = {componentColor}
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
              /> */}

            <InteractiveBarChart 
              data={complexSampleData}
              interactiveHover={false}
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
              barPercentage = {1}
              categoryPercentage = {0.5}
              indexAxis = 'x'
              stacked = {true}
              xAxisTicksDisplay = {true}
              yAxisTicksDisplay = {true}
              // xAxisTicksColor = {primaryColor}
              // yAxisTicksColor = {primaryColor}
              xAxisGridDisplay = {false}
              yAxisGridDisplay = {false}
              // xAxisGridColor = {primaryColor}
              // yAxisGridColor = {primaryColor}
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
              />

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

export default BarChartContainerV8
