"use client";
import React, { useState } from 'react'
import { DonutChartBasic6 } from './components/DonutChart-basic-6'
import { DonutChartBasic12 } from './components/DonutChart-basic-12'
import { DonutChartCutShadowLarge } from './components/DonutChart-cut-shadow-large'
import { DonutChartCutShadowLite } from './components/DonutChart-cut-shadow-lite'
import { ChartIndicator } from './components/ChartIndicator'
import { DonutChartFull } from './components/DonutChart'

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

  return (
    <div className='w-full h-screen flex flex-row gap-[8rem] flex-wrap items-center justify-center'>
        
        <div className='relative h-[300px] w-[300px]'>
            <DonutChartBasic6 
                currentProfit={40}
                totalProfit={100}
                strokeWidth={20}
                rounded={false}
            />
        </div>

        <div className='relative h-[300px] w-[300px]'>
            <DonutChartBasic12
                currentProfit={10}
                totalProfit={100}
            />
        </div>

        <div className='relative h-[300px] w-[300px]'>
            <DonutChartCutShadowLarge
                currentProfit={50}
                totalProfit={100}
                rotation={85}
                maxAngle={190}
            />
        </div>

        <div className='relative h-[300px] w-[300px]'>
            <DonutChartCutShadowLite
                currentProfit={50}
                totalProfit={100}
            />
        </div>

        <div className='relative h-[300px] w-[300px]'>  
            <ChartIndicator
                currentProfit={40}
                totalProfit={100}
                glowOpacity={0.5}
                activeColor={"rgba(0, 200, 155)"}
            />
            <DonutChartFull
                currentProfit={40} 
                totalProfit={100} 
                rounded={true}
                activeColor={"rgba(0, 200, 155)"}
                glowOpacity={0.5}
            />
        </div>



        <div className="relative w-[400px] h-[400px]">
            <DonutChartFull 
                currentProfit={selectedCompany?.datasets?.datasets[0].profit || 0} 
                totalProfit={selectedCompany?.totalProfit || 0} 
                scale={0.8} 
                activeColor={"rgba(0, 200, 155)"}
                className="absolute inset-0"
                style={{ zIndex: 1 }}
                showText={true}
                strokeWidth={2}
            />
            
            <DonutChartFull 
                currentProfit={selectedCompany?.datasets?.datasets[1].profit || 0} 
                totalProfit={selectedCompany?.totalProfit || 0} 
                scale={0.6} 
                activeColor={"rgba(200, 0, 155)"}
                className="absolute inset-0"
                style={{ zIndex: 2 }}
                strokeWidth={2}
            />
            
            <DonutChartFull 
                currentProfit={selectedCompany?.datasets?.datasets[2].profit || 0} 
                totalProfit={selectedCompany?.totalProfit || 0} 
                scale={0.4} 
                activeColor={"rgba(200, 155, 0)"}
                className="absolute inset-0"
                style={{ zIndex: 3 }}
                strokeWidth={2}
            />
        </div>

    </div>
  )
}

export default page
