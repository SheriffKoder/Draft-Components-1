'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const page = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)
  const text1Ref = useRef<HTMLDivElement>(null)
  const text2Ref = useRef<HTMLDivElement>(null)
  const text3Ref = useRef<HTMLDivElement>(null)
  const pinnedSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const layer1 = layer1Ref.current
    const layer2 = layer2Ref.current
    const layer3 = layer3Ref.current
    const text1 = text1Ref.current
    const text2 = text2Ref.current
    const text3 = text3Ref.current
    const pinnedSection = pinnedSectionRef.current

    if (!container || !layer1 || !layer2 || !layer3 || !text1 || !text2 || !text3 || !pinnedSection) return

    // Set initial state - all layers hidden and at center position
    gsap.set([layer1, layer2, layer3], {
      opacity: 0,
      z: 0
    })

    // Set initial state for text - all hidden
    gsap.set([text1, text2, text3], {
      opacity: 0,
      y: 20
    })

    // Create the pinned scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinnedSection,
        start: "top top",
        end: "+=300%", // 3x the viewport height for 3 scroll units
        scrub: 1, // Smooth scrubbing
        pin: true,
        snap: {
          snapTo: [0, 0.33, 0.66, 1], // Snap to each animation step
          duration: { min: 0.2, max: 0.6 },
          delay: 0.1,
          ease: "power2.inOut"
        },
        onUpdate: (self) => {
          console.log("Progress:", self.progress)
        }
      }
    })

    // Animation sequence
    // Step 1: First layer appears with text (0% to 33%)
    tl.to(layer1, {
      opacity: 1,
      duration: 0.33,
      ease: "power2.out"
    })
    .to(text1, {
      opacity: 1,
      y: 0,
      duration: 0.33,
      ease: "power2.out"
    }, "<")

    // Step 2: Second layer moves up and fades in, third layer moves to second layer position (33% to 66%)
    .to(layer2, {
      opacity: 1,
      z: 100, // Move forward in Z-axis (appears up due to rotation)
      duration: 0.33,
      ease: "power2.inOut"
    })
    .to(layer3, {
      z: 100, // Move to where second layer will be (preparation for next step)
      duration: 0.33,
      ease: "power2.inOut"
    }, "<")
    .to(text2, {
      opacity: 1,
      y: 0,
      duration: 0.33,
      ease: "power2.out"
    }, "<")

    // Step 3: Third layer moves up above second layer and fades in (66% to 100%)
    .to(layer3, {
      opacity: 1,
      z: 200, // Move further forward in Z-axis (appears higher up)
      duration: 0.33,
      ease: "power2.inOut"
    })
    .to(text3, {
      opacity: 1,
      y: 0,
      duration: 0.33,
      ease: "power2.out"
    }, "<")

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* First section - 100vh */}
      <div className="h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white">Section 1</h1>
      </div>

      {/* Middle section - Pinned with animated layers */}
      <div 
        ref={pinnedSectionRef}
        className="h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center relative overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        {/* Container for the 3D cards */}
        <div className="relative" style={{ 
          width: '200px', 
          height: '200px',
          transformStyle: 'preserve-3d',
          transform: 'rotate3d(1, 0, 0, 50deg) rotateZ(50deg)'
        }}>
          {/* Layer 1 - Bottom layer */}
          <div 
            ref={layer1Ref}
            className="absolute flex items-center justify-center text-white text-2xl font-bold"
            style={{ 
              width: '200px',
              height: '200px',
              background: 'rgb(55, 13, 118)',
              border: '2px solid rgb(117, 25, 255)',
              borderRadius: '10px',
              transformOrigin: 'center center',
              transformStyle: 'preserve-3d'
            }}
          >
            1
          </div>
          
          {/* Layer 2 - Middle layer */}
          <div 
            ref={layer2Ref}
            className="absolute flex items-center justify-center text-white text-2xl font-bold"
            style={{ 
              width: '200px',
              height: '200px',
              background: 'rgb(55, 13, 118)',
              border: '2px solid rgb(117, 25, 255)',
              borderRadius: '10px',
              transformOrigin: 'center center',
              transformStyle: 'preserve-3d'
            }}
          >
            2
          </div>

          {/* Layer 3 - Top layer */}
          <div 
            ref={layer3Ref}
            className="absolute flex items-center justify-center text-white text-2xl font-bold"
            style={{ 
              width: '200px',
              height: '200px',
              background: 'rgb(55, 13, 118)',
              border: '2px solid rgb(117, 25, 255)',
              borderRadius: '10px',
              transformOrigin: 'center center',
              transformStyle: 'preserve-3d'
            }}
          >
            3
          </div>
        </div>

        {/* Text elements */}
        <div 
          ref={text1Ref}
          className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold"
        >
          Layer 1 Revealed
        </div>

        <div 
          ref={text2Ref}
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold"
        >
          Layer 2 Rising
        </div>

        <div 
          ref={text3Ref}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold"
        >
          Layer 3 Complete
        </div>
        
        {/* Progress indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="text-white text-sm opacity-70">
            Scroll through 3 layer animations
          </div>
        </div>
      </div>

      {/* Third section - 100vh */}
      <div className="h-screen bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white">Section 3</h1>
      </div>
    </div>
  )
}

export default page
