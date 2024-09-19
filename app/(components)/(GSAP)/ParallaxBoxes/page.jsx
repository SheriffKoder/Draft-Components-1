"use client"
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import React from 'react'
import {ScrollTrigger, ScrollToPlugin} from "gsap/all";



const page = () => {

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    useGSAP(()=> {
        gsap.to("[data-speed]", {
            y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window) ,
            ease: "none",
            scrollTrigger: {
              start: 0,
              end: "max",
              invalidateOnRefresh: true,
              scrub: 0,
            }
          });

        // pin the container, animate when entering/exiting the container
        // --- ORANGE PANEL ---
        gsap.from(".line-2", {
            scrollTrigger: {
            trigger: ".orange",
            scrub: true,
            pin: true,  // pin orange
            start: "top top", // top of orange, top of viewport
            end: "bottom top", //or end: "+=100%",
            // markers: true,
            },
            // scaleX: 0, 
            // transformOrigin: "left center", 
            ease: "none"
        });

        
    

    });


  return (
    <div className="">
            <div className="w-full h-[200vh] relative">

            <section id='two' className='orange
            w-full h-[100vh] flex flex-col items-center justify-center text-[4rem]'>
                {/* <span className='line-2
                w-full max-w-[800px] h-[8px] mb-[10px] relative inline-block bg-white'></span> */}
                <p>
                    My Projects
                </p>
            </section>


                <div className="top-[100vh] absolute h-full flex justify-center flex-1 w-full gap-8 overflow-visible">
                    <div className="rounded-[10px] h-[200px] w-[275px] text-white bg-blue-500 green translate-y-0" data-speed="0.6">0.25</div>
                    <div className="rounded-[10px] h-[150px] w-[225px] text-white bg-blue-500 purple translate-y-0" data-speed="0.7">0.4</div>
                    {/* <div className="rounded-[10px] w-[15%] h-[100px] text-white bg-blue-500 orange translate-y-0" data-speed="0.47">0</div> */}
                    <div className="rounded-[10px] h-[200px] w-[275px] text-white bg-blue-500 red translate-y-0" data-speed="1">1</div>
                    <div className="rounded-[10px] h-[150px] w-[225px] text-white bg-blue-500 blue translate-y-0" data-speed="0.8">0.75</div>
                </div>


            </div>
        <div className="h-[100vh] bg-blue-800">

        </div>
    </div>
  )
}

export default page