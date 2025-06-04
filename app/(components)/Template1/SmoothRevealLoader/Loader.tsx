'use client'

import Image from 'next/image'
import React, { useEffect, useRef } from 'react'

// import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/all";
import { Power4 } from "gsap";

const LoaderComplex = () => {


    useEffect(() => {
        // Register GSAP plugins to make them available for use
        gsap.registerPlugin(ScrollTrigger, Power4);

        // Set initial state of element-revealer2 - positioned 100% below its normal position
        gsap.set(".element-revealer2", {
            y: "100%"
        });

        // Animate element-revealer upward by 100% of its height
        // This reveals what's underneath by moving the black overlay up and out of view
        gsap.to(".element-revealer", {
            y: "-100%",           // Move up by 100% of its height
            ease: Power4.easeInOut, // Use Power4 easing for a smooth, dramatic motion
            duration: 2.5,         // Animation takes 2.5 seconds
            delay: 1,
        });

        gsap.to(".element-revealer-0", {
            y: "-100%",
            ease: Power4.easeInOut,
            duration: 2.5
        });

        gsap.to(".element-revealer-0", {
            width: "100px",
            ease: Power4.easeInOut,
            duration: 0,
            delay: 2.5
        });

        gsap.to(".logo-part-1", {
            opacity: 0,
            ease: Power4.easeInOut,
            duration: 2.5,
            delay: 2.5
        });

        gsap.to(".logo-part-2", {
            opacity: 0,
            ease: Power4.easeInOut,
            duration: 2.5,
            delay: 2.5
        });

        // Animate element-revealer2 from its initial position (100% below) to its normal position
        // This creates a second reveal effect, moving up to cover what was just revealed
        gsap.to(".element-revealer2", {
            y: "0%",              // Move to normal position (0%)
            delay: 1,             // Start 1 second after the previous animation begins
            ease: Power4.easeInOut, // Same easing for consistent feel
            duration: 4           // Takes 4 seconds (slower than the first animation)
        });

        // Change the z-index of the loader to place it behind other content
        // This happens after the animations complete
        gsap.to("#loader", {
            zIndex: -1,           // Move behind other elements
            delay: 5,           // Wait 3.5 seconds before changing z-index
        });
        
        // Fade out the loader completely
        gsap.to("#loader", {
            opacity: 0,           // Fade to completely transparent
            delay: 4.5,           // Start fading at the same time as z-index change
            duration: 2         // Take 1.5 seconds to fade out
        });

    }, []) // Empty dependency array means this runs once when component mounts

  return (
    <div id="loader" className='absolute top-0 left-0 w-full h-full bg-black z-[1000] flex flex-row justify-center items-center'>
        <div className='w-[300px] aspect-square relative overflow-hidden rounded-full'>
            <Image 
                src={'/images/logo-part-2.png'}
                alt='logo' 
                fill
                className='h-full w-full object-cover logo-part-2'
            />

            <div className='absolute top-0 left-0 w-[110%] h-[110%] bg-black element-revealer'></div>
            <div className='absolute top-0 left-0 w-[110%] h-[110%] bg-black element-revealer2'></div>

            <Image 
                src={'/images/logo-part-1.png'}
                alt='logo' 
                fill
                className='h-full w-full object-cover logo-part-1'
            />

            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[170px] h-[50px] bg-black element-revealer-0'></div>
        </div>
    </div>
  )
}

export default LoaderComplex
