'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const page = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const pinnedSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const text = textRef.current
    const pinnedSection = pinnedSectionRef.current

    if (!container || !text || !pinnedSection) return

    // Create the pinned scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinnedSection,
        start: "top top",
        end: "+=400%", // 4x the viewport height for 4 rotations
        scrub: 1, // Smooth scrubbing
        pin: true,
        snap: {
          snapTo: [0, 0.25, 0.5, 0.75, 1], // Snap to each 90-degree rotation
          duration: { min: 0.2, max: 0.6 },
          delay: 0.1,
          ease: "power2.inOut"
        },
        onUpdate: (self) => {
          // Optional: Add any additional effects during scroll
          console.log("Progress:", self.progress)
        }
      }
    })

    // Animate text rotation from 0 to 360 degrees
    tl.to(text, {
      rotation: 360,
      duration: 1,
      ease: "none"
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

      {/* Middle section - Pinned with rotating text */}
      <div 
        ref={pinnedSectionRef}
        className="h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center relative overflow-hidden"
      >
        <div 
          ref={textRef}
          className="text-8xl font-bold text-white select-none"
          style={{ transformOrigin: 'center center' }}
        >
          ROTATE
        </div>
        
        {/* Optional: Progress indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="text-white text-sm opacity-70">
            Scroll to rotate • 4 steps to complete
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
