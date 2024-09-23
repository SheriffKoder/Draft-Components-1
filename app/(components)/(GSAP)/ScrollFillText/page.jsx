"use client"
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import React, { useRef } from 'react'
import {ScrollTrigger, ScrollToPlugin} from "gsap/all";

import "./Navigation.css"
// smooth scroll nav links and progress bars
// https://codepen.io/Juxtopposed/pen/mdQaNbG

const Tween = () => {

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    useGSAP(()=> {

        gsap.from(".zero-line", {
            scrollTrigger: {
                trigger: "#zero",
                scrub: true,
                start: "top 700px",
                end: "bottom 200px",
                // markers: true,
                // pin: true,
            },
            translateX: "-100vw",
            transformOrigin: "left center", 
            ease: "none"
        })
        
        gsap.from(".one-line", {
            scrollTrigger: {
                trigger: "#one",
                scrub: true,
                start: "top 500px",
                end: "bottom 200px",
                // markers: true,
                // pin: true,
            },
            translateX: "-100vw",
            transformOrigin: "left center", 
            ease: "none"
        });

        gsap.from(".two-line", {
            scrollTrigger: {
                trigger: "#two",
                scrub: true,
                start: "top 300px",
                end: "bottom 200px",
                // markers: true,
                // pin: true,
            },
            translateX: "-100vw",
            transformOrigin: "left center", 
            ease: "none"
        });


    },[]);

  return (
    <>




        {/* example on zero */}
        <section id="zero" className="relative
        bg-black text-white w-auto
        ">
            <span className=' zero-line absolute left-0 mask_nav_gsap
                w-full h-full bg-[#4b1fdb]
                flex items-center justify-center  text-white'>
                    {/* <span className="relative text-[10rem]">Hello world</span> */}
            </span>
            <div className="text">
                We Are trying to be
            </div>
        </section>

        {/* example on zero */}
        <section id="one" className="relative
        bg-black text-white w-auto
        ">
            <span className=' one-line absolute left-0 mask_nav_gsap
                w-full h-full bg-[#4b1fdb]
                flex items-center justify-center  text-white'>
                    {/* <span className="relative text-[10rem]">Hello world</span> */}
            </span>
            <div className="">
            of web development and design

            </div>
        </section>

        <section id="two" className="relative
        bg-black text-white w-auto
        ">
            <span className=' two-line absolute left-0 mask_nav_gsap
                w-full h-full bg-[#4b1fdb]
                flex items-center justify-center  text-white'>
                    {/* <span className="relative text-[10rem]">Hello world</span> */}
            </span>
            <div className="text">
            the best in the field
            </div>
        </section>
    
    </>
  )
}




const page = () => {

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    useGSAP(()=> {

               // example 2
               const textElements = gsap.utils.toArray('.textFill_text');
        
               textElements.forEach(text => {
                   gsap.to(text, {
                     backgroundSize: '100%',
                     ease: 'none',
                     scrollTrigger: {
                       trigger: text,
                       start: 'center 80%',
                       end: 'center 20%',
                       scrub: true,
                       // markers: true,
                     },
                   });
               });

              
    
    },[]);

    return (
        <>
        <div id="" className='blue pb-[60px]
        w-full h-[100vh] border flex items-center justify-center'>
            <div className='scroll-down'>
                Scroll Down
                <div className='arrow'>CLICK</div>
            </div>
        </div>

        <div className="w-full px-[1rem] font-semibold text-center md:text-left h-100vh text-[5vw]">
            <Tween/>
        </div>


        {/* https://codepen.io/Juxtopposed/pen/mdQaNbG */}
        <div className="flex flex-col justify-center items-start h-[200vh] p-[10%] gap-4
        bg-[##0D0D0D]">
            <h1 className="textFill_text">TEXT EFFECT<span>WOAH</span></h1>
            <h1 className="textFill_text">GSAP<span>AND CLIPPING</span></h1>
            <h1 className="textFill_text">CRAZYY<span>CRAZYY</span></h1>
            <h1 className="textFill_text">HOVER ON ME
                <span><a href="https://stacksorted.com/text-effects/minh-pham" target="_blank">SOURCE</a></span>
            </h1>
            <h1 className="textFill_text">LIKE THIS?
                <span><a href="https://twitter.com/juxtopposed" target="_blank">LET'S CONNECT</a></span>
            </h1>
        </div>


        <div id="" className='blue pb-[60px]
        w-full h-[100vh] border flex items-center justify-center'>
            <div className='scroll-down'>
                Scroll Down
                <div className='arrow'>CLICK</div>
            </div>
        </div>

        </>
    )

}

export default page
