"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const CreativeTextAnim = ({trigger}: {trigger: React.RefObject<null>}) => {

    const text = useRef(null);



    // use gsap to return the text to its original position
    useEffect(() => {

        gsap.registerPlugin(ScrollTrigger)

        // scroll trigger 
        // const scrollTrigger = ScrollTrigger.create({
        //     trigger: trigger.current,
        //     start: "top top",
        //     end: "bottom bottom",
        //     pin: true,
        //     pinSpacing: false,
        //     // markers: true,
        // })
    
    



        // gsap.set(".titleLetter", {
        //     skewY: 20,
        //     y: '200%',
        //     stagger: {
        //         amount: 0.25,
        //     },
        // })

        // with scroll trigger
        // left to right reveal
        gsap.set(".titleLetter", {
             // delay: 0.75,
             opacity: 0,
             skewY: 20,
             duration: 0.75,
             y: 30,
        })
        
        gsap.to(".titleLetter", {
            delay: 0.75,
            opacity: 1,
            skewY: 0,
            duration: 0.75,
            y: 0,
            stagger: {
              amount: 0.25,
            },
            scrollTrigger: {
                trigger: trigger.current,
                start: "top 40%",
                end: "bottom bottom",
                // markers: true,
                scrub: 1,
            }
        })


        // Creative Studio animation - skewY and move from bottom to top
        // gsap.from(".titleLetter", {
        //     skewY: 20,
        //     y: '200%',
        //     duration: 0.75,
        //     stagger: {
        //       amount: 0.25,
        //     },
        // })

        // gsap.set(".sectionFourText", {
        //     opacity: 0,
        //     y: "100%",
        // })

        gsap.to(".sectionFourText", {
            delay: 0.75,
            opacity: 1,
            duration: 0.5,
            y: 0,
            stagger: {
              amount: 0.25,
            },
            scrollTrigger: {
                trigger: trigger.current,
                start: "top 30%",
                end: "bottom bottom",
                markers: true,
                scrub: 1,
            }
        })






    }, [])





  return (
    <div className="main-section">
        <div className="">
            <h1 className="localfont2 uppercase text-[100px] font-bold flex flex-row">
            {"Service with care".split("").map((letter, index) => (
                <div key={index} className={`titleLetter ${letter === " " ? 'w-[2rem]' : ''}`}>
                    {letter}
                </div>
            ))}    
            </h1>
        </div>
        <p className="localfont1 text-[18px] opacity-0 translate-y-10 text-center sectionFourText uppercase">client satisfaction isn’t just a goal—it’s the foundation of everything we do.</p>
        <p className="localfont1 text-[18px] opacity-0 translate-y-10 text-center sectionFourText uppercase">We believe every rental should feel effortless, personal, and memorable.</p>

    </div>
  )
}

export default CreativeTextAnim