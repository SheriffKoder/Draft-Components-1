'use client'
import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
// import DistortedText from '@/app/(components)/Template1/gsap-animate-mount/DistortedText'

const HeroText = ({show}: {show: boolean}) => {
    const distortedTextRef = useRef(null)

    // const [isRevealed, setIsRevealed] = useState(false)

    useEffect(() => {
        // Set initial state
        gsap.set('.hero-text-line', { opacity: 0 })
        
        if (show) {
            // animate with gsap from opacity 0 to 1
            gsap.to('.hero-text-line', {
                opacity: 1,
                stagger: 0.5,
                duration: 1,
                delay: 0,
                ease: 'power2.out'
            })
        }
    }, [show])


  return (
    <h1 className="text-[200px] localfont3 flex flex-col relative w-fit" id="image-revealer-heading" style={{textShadow: '0 0 10px rgba(0, 0, 0, 0.5)'}}>
        <span className="leading-[90%] hero-text-line opacity-0">
            {/* <DistortedText 
                ref={distortedTextRef}
                text="Everline" 
                initialUniforms={{
                    uSineDistortSpread: 0.035,
                    uSineDistortCycleCount: 0.2, // to 0.2
                    uSineDistortAmplitude: 0.03,
                    uNoiseDistortVolatility: 0, // to 15
                    uNoiseDistortAmplitude: 0.01,
                    uRotation: 170,
                    uSpeed: 0.08
                }}
            /> */}
            <h1 ref={distortedTextRef}>Hello World</h1>
        </span>
        <span className="mt-[-5rem] text-[80px] leading-[90%] uppercase pl-2 flex flex-row items-center gap-[10px] hero-text-line opacity-0">
            Drive
            <div className='mt-auto'>
                {/* <Image
                src="/images/main-logo.png"
                alt="Everline Drive"
                width={50}
                height={50}
                className='w-full h-full object-cover'
                /> */}
            </div>
        </span>
    </h1>
  )
}

export default HeroText
