/**
 * BottomToast Component
 * 
 * A toast notification component that appears at the bottom-right corner of the screen
 * to display token deduction information. It features a sliding animation effect and
 * shows the number of tokens deducted with appropriate singular/plural text.
 */
"use client"
import { Coins } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface BottomToastProps {
  /** Number of tokens deducted (defaults to 0) */
  Cost: number
  text?: string; // conditional alternate text to display
}

const BottomToast = ({Cost, text}: BottomToastProps) => {
    // Controls the slide-in animation state of the toast
    const [animateToast, setAnimateToast] = useState(false);

    // Trigger the slide-in animation after a 300ms delay
    useEffect(() => {
        setTimeout(() => {
            setAnimateToast(true);
        }, 300);
    }, []);

  return (
    // Container with fixed positioning at bottom-right
    <div className="fixed bottom-0 right-0 m-4 text-xs sm:text-sm group z-50">
      <div className="flex items-center">
        {/* Dark container with rounded borders */}
        <div className="flex items-center bg-black/90 border border-white/20 rounded-full">
          {/* Token icon container */}
          <div className="p-2">
            <Coins className="w-4 h-4 text-amber-500" />
          </div>
          
          {/* Animated content container - slides in from left to right */}
          <div className={`overflow-hidden ${animateToast ? "max-w-[290px]" : "max-w-0"} w-auto transition-all duration-1000 ease-in-out`}>
            <div className="flex items-center gap-1 pr-2">
              <span className='text-amber-500 whitespace-nowrap'>{Cost}</span>
              {!text &&
              <span className='text-white whitespace-nowrap'>{Cost > 1 ? "tokens were" : "token was"} deducted from your account</span>
              }
              {text &&
              <span className='text-white whitespace-nowrap'>{text}</span>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomToast
