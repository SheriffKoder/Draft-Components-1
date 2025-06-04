"use client"
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface FramerHeroAnimationProps {
  checker: string | number
  identifier: string | number
  paragraph: string
}

const FramerHeroAnimation: React.FC<FramerHeroAnimationProps> = ({ 
  checker, 
  identifier, 
  paragraph 
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLDivElement[]>([])
  const headerRef = useRef<HTMLHeadingElement>(null)

  // Split paragraph at commas and create lines
  const lines = paragraph.split(',').map(line => line.trim()).filter(line => line.length > 0)

  useEffect(() => {
    const container = containerRef.current
    const lineElements = linesRef.current
    const headerElement = headerRef.current

    if (!container || lineElements.length === 0 || !headerElement) return

    const allElements = [headerElement, ...lineElements]

    if (checker === identifier) {
      // Intro animation: fade in from below with stagger
      gsap.fromTo(allElements, 
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.5
        }
      )
    } else {
      // Outro animation: fade out downward with reverse stagger
      gsap.to(allElements, {
        opacity: 0,
        y: 30,
        duration: 0.3,
        stagger: {
          amount: 0.3,
          from: "end"
        },
        ease: "power2.in"
      })
    }
  }, [checker, identifier])

  const headers = {
    base: "We are",
    brand1: "Mercedes Benz",
    brand2: "Porsche",
    brand3: "BMW"
  }

  console.log(identifier);

  return (
    <div ref={containerRef} className="flex flex-col text-[40px] font-extralight  w-full localfont1 absolute top-0 left-0 ">
      <h1 
        ref={headerRef}
        className='font-semibold ml-[-0px]'
        style={{ opacity: 0, transform: 'translateY(30px)' }}
      > 
        {headers[identifier as keyof typeof headers]} 
      </h1>
      
      {lines.map((line, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) linesRef.current[index] = el
          }}
          className="text-lg  leading-[90%] text-white text-[40px]"
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          {line}
        </div>
      ))}
    </div>
  )
}

export default FramerHeroAnimation
