"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
// import CreativeTextAnim from './CreativeTextAnim'

// Configuration for each element
const elementsConfig = [
  {
    id: 'first',
    type: 'text', // Special type for the initial text
    content: {
      title: '',
      subtitle: 'Hello World'
    },
    background: 'transparent',
    textAlign: 'center'
  },
  {
    id: 'second',
    type: 'layered',
    content: {
      title: '(OUR AWARDS)',
      subtitle: 'NOT FOR OUR EGOS, BUT BECAUSE AWARDS ARE A MEASURE OF CREATIVITY, ORIGINALITY AND QUALITY. AIMING FOR AWARDS PUSHES US TO THINK DEEPER, GO FURTHER AND HAVE MEANINGFUL CONVERSATIONS ABOUT WHAT CREATIVITY IS.'
    },
    background: 'bg-black',
    textAlign: 'start'
  },
  {
    id: 'third',
    type: 'layered',
    content: {
      title: '(THIRD SECTION)',
      subtitle: 'THIS IS THE THIRD ELEMENT THAT APPEARS AFTER THE SECOND ONE FADES OUT. IT DEMONSTRATES THE LAYERING EFFECT WITH MULTIPLE TRANSITIONS.'
    },
    background: 'bg-blue-900',
    textAlign: 'center'
  },
  {
    id: 'fourth',
    type: 'layered',
    content: {
      title: '(FOURTH SECTION)',
      subtitle: 'THIS IS THE FOURTH ELEMENT THAT APPEARS AFTER THE THIRD ONE FADES OUT. IT DEMONSTRATES THE LAYERING EFFECT WITH MULTIPLE TRANSITIONS.'
    },
    background: 'bg-green-900',
    textAlign: 'center'
  }
  // Add more elements here as needed
]

// Function to calculate equal spacing for N elements with overlap
const calculateEqualTimings = (numElements: number, overlapPercent: number = 10) => {
  const totalScrollRange = 100
  const elementDuration = (totalScrollRange + (overlapPercent * (numElements - 1))) / numElements
  
  const timings: any = {}
  
  elementsConfig.forEach((element, i) => {
    const elementStart = i * (elementDuration - overlapPercent)
    const elementEnd = elementStart + elementDuration
    
    if (element.type === 'text') {
      // First element (text scaling)
      timings[element.id] = {
        start: `${elementStart}% top`,
        end: `${elementEnd}% bottom`
      }
    } else if (element.type === 'layered') {
      // Layered elements
      timings[element.id] = {
        background: {
          start: `${elementStart}% bottom`,
          end: `${elementStart + (elementDuration * 0.4)}% bottom`
        },
        text: {
          start: `${elementStart + 3}% bottom`,
          end: `${elementEnd}% bottom`
        },
        fadeOut: i < numElements - 1 ? { // Don't fade out the last element
          start: `${elementEnd}% bottom`,
          end: `${elementEnd + 10}% bottom`
        } : undefined
      }
    }
  })
  
  return timings
}

const LayeringZoomAdjustable = () => {
  const containerRef = useRef(null)
  const elementRefs = useRef<{ [key: string]: any }>({})

  // Create refs for all elements dynamically
  elementsConfig.forEach(element => {
    if (element.type === 'text') {
      elementRefs.current[element.id] = useRef(null)
    } else {
      elementRefs.current[`${element.id}Element`] = useRef(null)
      elementRefs.current[`${element.id}Background`] = useRef(null)
      elementRefs.current[`${element.id}Text`] = useRef(null)
    }
  })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const timings = calculateEqualTimings(elementsConfig.length, 10)
    
    // Create animations for each element
    elementsConfig.forEach((element, index) => {
      if (element.type === 'text') {
        // First element animation
        gsap.to(elementRefs.current[element.id].current, {
          scale: 0.3,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: timings[element.id].start,
            end: timings[element.id].end,
            scrub: true,
          }
        })
      } else if (element.type === 'layered') {
        // Background animation
        gsap.to(elementRefs.current[`${element.id}Background`].current, {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: timings[element.id].background.start,
            end: timings[element.id].background.end,
            scrub: true,
          }
        })
        
        // Text animation
        gsap.to(elementRefs.current[`${element.id}Text`].current, {
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: timings[element.id].text.start,
            end: timings[element.id].text.end,
            scrub: true,
          }
        })
        
        // Fade out animation (if not the last element)
        if (timings[element.id].fadeOut) {
          gsap.to(elementRefs.current[`${element.id}Element`].current, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: timings[element.id].fadeOut.start,
              end: timings[element.id].fadeOut.end,
              scrub: true,
            }
          })
        }
      }
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center">
        {elementsConfig.map((element, index) => {
          if (element.type === 'text') {
            return (
              <h1 
                key={element.id}
                ref={elementRefs.current[element.id]} 
                className="text-white text-[100px]"
              >
                {element.content.subtitle}
              </h1>
            )
          } else if (element.type === 'layered') {
            return (
              <div 
                key={element.id}
                ref={elementRefs.current[`${element.id}Element`]}
                className="absolute w-full h-[100vh] overflow-hidden"
              >
                <div 
                  ref={elementRefs.current[`${element.id}Background`]}
                  className={`absolute w-full h-full ${element.background} opacity-0`}
                />
                
                <div 
                  ref={elementRefs.current[`${element.id}Text`]}
                  className={`scale-[5] relative flex flex-col items-${element.textAlign} justify-center px-[20%] h-full w-full z-10 opacity-0`}
                >
                  <span className='text-white text-[20px]'>{element.content.title}</span>
                  <h1 className={`text-white text-[30px] text-${element.textAlign}`}>
                    {element.content.subtitle}
                  </h1>
                </div>
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}

export default LayeringZoomAdjustable
