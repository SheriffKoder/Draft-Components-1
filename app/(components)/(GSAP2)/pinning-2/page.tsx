'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const page = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const box1Ref = useRef<HTMLDivElement>(null)
  const box2Ref = useRef<HTMLDivElement>(null)
  const pinnedSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const box1 = box1Ref.current
    const box2 = box2Ref.current
    const pinnedSection = pinnedSectionRef.current

    if (!container || !box1 || !box2 || !pinnedSection) return

    // Set initial state - boxes hidden and centered
    gsap.set([box1, box2], {
      opacity: 0,
      x: 0,
      y: 0,
      rotation: 0,
      borderRadius: "0px"
    })

    // Create the pinned scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinnedSection,
        start: "top top",
        end: "+=400%", // 4x the viewport height for 4 animations
        scrub: 1, // Smooth scrubbing
        pin: true,
        snap: {
          snapTo: [0, 0.25, 0.5, 0.75, 1], // Snap to each animation step
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
    // Step 1: Show boxes and move them apart (0% to 25%)
    tl.to([box1, box2], {
      opacity: 1,
      duration: 0.25,
      ease: "power2.out"
    })
    .to(box1, {
      x: -200,
      duration: 0.25,
      ease: "power2.inOut"
    }, "<")
    .to(box2, {
      x: 200,
      duration: 0.25,
      ease: "power2.inOut"
    }, "<")

    // Step 2: Rotate and add border radius (25% to 50%)
    .to([box1, box2], {
      rotation: 180,
      borderRadius: "99px",
      duration: 0.25,
      ease: "power2.inOut"
    })

    // Step 3: Reverse rotation and border radius (50% to 75%)
    .to([box1, box2], {
      rotation: 0,
      borderRadius: "0px",
      duration: 0.25,
      ease: "power2.inOut"
    })

    // Step 4: Return to center (75% to 100%)
    .to([box1, box2], {
      x: 0,
      duration: 0.25,
      ease: "power2.inOut"
    })

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

      {/* Middle section - Pinned with animated boxes */}
      <div 
        ref={pinnedSectionRef}
        className="h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center relative overflow-hidden"
      >
        {/* Box 1 */}
        <div 
          ref={box1Ref}
          className="w-24 h-24 bg-white absolute"
          style={{ transformOrigin: 'center center' }}
        />
        
        {/* Box 2 */}
        <div 
          ref={box2Ref}
          className="w-24 h-24 bg-white absolute"
          style={{ transformOrigin: 'center center' }}
        />
        
        {/* Progress indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="text-white text-sm opacity-70">
            Scroll through 4 animation steps
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
