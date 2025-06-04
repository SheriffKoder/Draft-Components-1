"use client"
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
// https://www.npmjs.com/package/@leenguyen/react-flip-clock-countdown


import React from 'react'

const FlipClock1 = () => {
  return (
    <div>
         <FlipClockCountdown 
         // 05/14/2025
        to={new Date('2025-05-14 00:00:00').getTime()}
        labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
        labelStyle={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', color: "black" }}
        digitBlockStyle={{ width: 40, height: 60, fontSize: 30 }}
        dividerStyle={{ color: 'blue', height: 1 }}
        separatorStyle={{ color: 'black', size: '6px' }}
        duration={0.5}         
         >
            <p>Completed</p>
      </FlipClockCountdown>
    </div>
  )
}

export default FlipClock1
