/**
 * @fileoverview ShineButton component - A customizable button with hover effects and arrow icon
 * Used primarily in hero sections and CTAs throughout the application
 */

import React from 'react'
import './ShineButton.css';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * ShineButton Component
 * @param {Object} props - Component props
 * @param {string} props.text - Button text content
 * @param {string} props.variant - Button style variant ('primary' or 'secondary')
 * @param {string} props.href - URL the button links to
 * @returns {JSX.Element} Styled button with hover effects and arrow icon
 */
const ShineButton = ({text, variant, href}: {text: string, variant: string, href: string}) => {
  return (
    <div className="group">
        {/* Next.js Link wrapper with conditional styling based on variant */}
        <Link href={href} className={`btn-shine border rounded-lg border-white/20 hover:border-primary/40
        overflow-auto flex flex-row items-center justify-center hover:shadow-lg hover:shadow-white/10
        transition-all duration-300
        
        ${variant === "secondary" ? "py-[6px] pr-[50px] pl-[38px] font-[14px]" : "py-[12px] pr-[60px] pl-[48px] font-[16px]"}
        `}>
            {text}
            {/* Hover effect overlay */}
            <div className='h-full w-full absolute top-0 left-0 group-hover:bg-white/5'></div>
            {/* Arrow icon with animation */}
            <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1
            absolute top-1/2 translate-y-[-50%] text-white
            ${variant === "secondary" ? "right-[20px]" : "right-[30px]"}
            `} />
        </Link>
    </div>
  )
}

export default ShineButton
