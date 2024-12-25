"use client"
import React from 'react'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import {ScrollTrigger, ScrollToPlugin} from "gsap/all";
// import { allText } from '@/constants';
import Link from 'next/link';



const Hero = () => {


        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
        useGSAP(()=> {

        // parallax effect for text
        gsap.to(".textHero", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
        });
            

        // parallax effect for text
        gsap.to(".parallax1", {
            yPercent: window.innerWidth < 520 ? -320 : -80,
            ease: "none",
            scrollTrigger: {
                trigger: ".zoomWrapper",
                start: "center bottom", // the default values
                end: "bottom top",
                scrub: 0.1
            }, 
        });


             // parallax cards
             gsap.to(".parallax2", {
                yPercent: window.innerWidth < 520 ? -320 : -250,
                rotate: "90deg",
                ease: "none",
                delay: 0,
                scrollTrigger: {
                    trigger: ".zoomWrapper",
                    start: "center bottom", // the default values
                    end: "bottom top",
                    scrub: 0.1
                }, 
                });
        
                gsap.to(".HeroCard1", {
                    opacity: 1,
                    // top: "-=3%",
                    duration: 0.25,
                    ease: "none",
                    // scale:1,
                    // rotation: "16deg"
                    scrollTrigger: {
                        trigger: ".zoomWrapper",
                        start: "top bottom", // the default values
                        end: "bottom top",
                        // scrub: 0.1
                    }, 
                });
        
                gsap.to(".HeroCard2", {
                    // top: "-=3%",
                    opacity: 1,
                    duration: 0.25,
                    ease: "none",
                    // rotation: "-10deg"
                    // scale: 1,
                    scrollTrigger: {
                        trigger: ".zoomWrapper",
                        start: "top bottom", // the default values
                        end: "bottom top",
                        // scrub: 0.1
                    }, 
                });
        
 



        // parallax effect for text for text in section 2
        gsap.to(".parallaxPara", {
            yPercent: -150,
            // x: 50,
            duration: 0.5,
            ease: "none",
            scrollTrigger: {
                trigger: ".zoomWrapper",
            //   start: "top bottom", // the default values
                // end: "bottom top",
            //   markers: true,
                scrub: 0.1
            }, 
        });


        // fade in effect for text in section 2
        gsap.to(".parallaxPara", {
            y: -50,
            opacity: 1,
            duration: 0.25,
            ease: "none",
            scrollTrigger: {
                trigger: ".parallaxPara",
                start: "top bottom", // the default values
                end: "bottom top",
            //   markers: true,
            //   scrub: 0.1
            }, 
        });


        // scale up the box
            gsap.to(".zoomBox", {
            height: window.innerHeight,
            width: window.innerWidth,
            borderRadius: 0,
            scrollTrigger: {
                trigger: ".zoomWrapper",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                },
        })

        // move also its container to the top of the page in the same time
        gsap.to(".zoomContainer", {
            top:0,
            scrollTrigger: {
                trigger: ".zoomWrapper",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                }
        })

              

        },[]);



  return (
    <div className='w-full relative'>

        {/* background */}
        <div className='
        h-[150vh] zoomWrapper top-0 left-0 w-full
        '>


            {/* // section's text w parallax */}
            <div className='sticky top-[68%] vp2:top-[65%] vp3:top-[35%] parallax1 z-[2] max-w-[1400px] px-[2rem]
            flex items-start justify-center flex-col textHero translate-y-[5rem] opacity-0
            vp4:px-[4rem] mx-auto'>

                <h1 className='heading1 heroText text-center vp3:text-start w-full
                flex flex-col leading-snug'>
                <span className=''>
                    WayToGo 
                </span>
                <span className='vp4:w-full'> Staffing</span>
                </h1>

                <p className='heading2 w-full heroText text-center flex flex-col flex-wrap gap-0 justify-center items-center vp3:items-start'>
                    
                    <span className='flex flex-col vp4:flex-row items-center vp4:items-start justify-center leading-10'>
                        <span className='mx-auto'>Your Partner for</span>
                        <span>
                            <span className='signature mx-[0.5rem] text_shadow_1 brightness-[1.2]'>Exceptional</span>
                            <span>Talent,</span>
                        </span>
                    </span>

                    <span>Every Time.</span>
                </p>

                <div className="flex flex-col vp4:flex-row gap-2 justify-center w-full vp3:justify-start mt-[1.5rem]">
                    <button 
                        className='accent1-bg rounded-full paragraph1 px-4 py-2 vp4:px-4 vp4:py-2 text-white
                        focus:outline-[#A58964] hover:outline-[#9b795d] trans1 outline-transparent outline outline-2 outline-offset-2
                        cursor-pointer'
                    >
                        Request a Consultation

                    </button>
                    <button className='accent2-bg text-white rounded-full paragraph1 px-4 py-2 vp4:px-6 vp4:py-2
                    focus:outline-[#13162e] hover:outline-[#13162e] trans1 outline-transparent outline outline-2 outline-offset-2
                    focus:bg-[#13162e] hover:bg-[#13162e]'>
                        <Link href="#services">
                            View Our Services
                        </Link>
                        
                    </button>

                </div>
            </div>



            {/* box container */}
            <div className='w-full zoomContainer sticky flex items-center 
            justify-center top-[95vh] vp4:top-[90vh]'>
                <div className='zoomBox h-[20vw] w-[40vw] rounded-[20px]' id="hero_bg"
                    style={{
                        // backgroundImage: `url(${allText.hero.mainImage})`,
                        background: `linear-gradient(12deg, rgba(165, 157, 143, 1) 0%, rgba(150, 142, 129, 0.0) 100%)`,
                        backgroundPosition: "35%",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}>
                </div>
            </div>
           

            <div className='bottom-[40vw] vp2:bottom-[-5rem] vp3:bottom-[-10vw] vp4:bottom-[-10vw] vp5:bottom-[-4vw] 
            vp6:bottom-[-9vw] absolute flex-c-c w-full'>
                <div className='pb-[0rem] vp4:px-[4rem] parallaxPara
                paragraph3 flex justify-center vp3:justify-start vp3:pl-[2rem]'>
{/* text_shadow_white */}
                    <p className='text_shadow_0 f_ysa tracking-wider text-[min(calc(0.5rem+1.2vw),30px)] max-w-[min(700px,80vw)] vp5:max-w-[min(1000px,80vw)] text-center vp3:text-start
                    '>
                    Delivering tailored staffing solutions that prioritize quality, reliability, and trust—helping your business thrive with the right team.                    
                    </p>
                </div>
            </div>

        </div>



    </div>
  )
}

export default Hero
