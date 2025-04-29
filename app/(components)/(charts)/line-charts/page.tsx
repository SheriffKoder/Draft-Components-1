"use client";
import React, { useEffect, useState } from 'react'
import { LineChart } from './LineChart';

const data: any[] = [
    {
      company: "Company 3",
      location: {
        name: "Berlin",
        left: 50.11,
        top: 42.88
      },
      revenue: 15000,
      increase: 15,
      totalProfit: 5000,
      datasets: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'Revenue',
            data: [20, 15, 25, 18, 30],
            profit: 2000,
          },
          {
            label: 'Profit',
            data: [15, 10, 20, 15, 25],
            profit: 3000,
          },
          {
            label: 'Growth',
            data: [10, 15, 22, 18, 24],
            profit: 3500,
          }
        ]
      }
    },
  ];

const page = () => {

    const [selectedCompany, setSelectedCompany] = useState(data[0]);
    const [primaryColor, setPrimaryColor] = useState<string>("#000000");
    const [secondaryColor, setSecondaryColor] = useState<string>("#000000");
    const [tertiaryColor, setTertiaryColor] = useState<string>("#000000");
  
    // Function to update colors from CSS variables
    const updateColors = () => {
    //   const colorPrimary = getComputedStyle(document.documentElement)
    //     .getPropertyValue('--color-primary').trim();
    //   const colorSecondary = getComputedStyle(document.documentElement)
    //     .getPropertyValue('--color-secondary').trim();
    //   const colorTertiary = getComputedStyle(document.documentElement)
    //     .getPropertyValue('--color-tertiary').trim();
      const colorPrimary = "#44e4fa";
      const colorSecondary = "#10b981";
      const colorTertiary = "#8b5cf6";
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
    <div className='w-full h-screen flex flex-row gap-[8rem] flex-wrap items-center justify-center'>
        <div className='relative h-[300px] w-[900px]'>
        <LineChart
                  height={"100%"}
                  showNeonShadow={true}
                  shadowOpacity={0.7}
                  showGrid={false}
                  showXAxisLine={false}
                  showYAxisLine={false}
                  showLabel={false}
                  lineColor="#ff0000"
                  shadowColor="#ff0000"
                  labelColor="#ffffff"
                  tickColor="rgba(255, 255, 255, 0.3)"
                  chartTitle="Sales"
                  chartSubtitle="4 months"
                  showTooltip={true}
                  lineTension={0.4}
                  lineWidth={2}
                  showTicks={true}
                  showPoints={false}
                  pointRadius={2}
                  pointColor="#ff0000"
                  pointBorderColor="#ffffff"
                  pointBorderWidth={1}
                  showTitle={false}
                  showSubtitle={false}
                  titleColor="#ffffff"
                  subtitleColor="#ffffff"
                  fill={true}
                  fillColor="#ff0000"
                  fillOpacity={0.5}
                  gradientToTransparent={true}
                  gradientStopPercentage={1}
                  showXGrid={false}
                  showYGrid={false}
                  gridColor="rgba(255, 255, 255, 0.01)"
                  tickFontSize={10}
                  titleFontSize={16}
                  subtitleFontSize={14}
                  tooltipBackgroundColor="rgba(0, 0, 0, 0.7)"
                  tooltipPadding={10}
                  tooltipTitleColor="#ffffff"
                  tooltipBodyFont={9}
                  tooltipTitleFont={12}
                  tooltipUseLineColors={true}
                  datasets={
                    selectedCompany?.datasets?.datasets.map((dataset: any, index: any) => {
                      const colors = [primaryColor, secondaryColor, tertiaryColor];
                      const color = colors[index % colors.length];
                      
                      return {
                        data: dataset.data,
                        label: dataset.label,
                        lineColor: color,
                        fillColor: color,
                        fill: index === 0, // Only fill the first dataset
                        shadowColor: color,
                        pointColor: color,
                        pointBorderColor: color,
                        pointRadius: 2,
                      };
                    }) || []
                  }
                  labels={selectedCompany?.datasets?.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May']}
                  key={`chart-${primaryColor}-${secondaryColor}-${tertiaryColor}-${selectedCompany?.company}`}
                  />


        </div>
    </div>
  )
}

export default page
