"use client"
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import React from 'react'
import {ScrollTrigger, ScrollToPlugin} from "gsap/all";

import ProjectCard from './ProjectCard';


const Page = () => {

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
            <div className="w-full h-[210vh] relative overflow-hidden">

            <section id='two' className='orange
            w-full h-[100vh] flex flex-col items-center justify-center text-[10rem]
            font-bold'>
                {/* <span className='line-2
                w-full max-w-[800px] h-[8px] mb-[10px] relative inline-block bg-white'></span> */}
                <p>
                    Our Products
                </p>
            </section>


                <div className="top-[90vh] absolute h-full flex justify-center flex-1 w-full gap-8 overflow-visible">
                    {/* <div className="rounded-[10px] h-[200px] w-[275px] text-white bg-blue-500 green translate-y-0" data-speed="0.6">0.25</div> */}
                    {/* <div className="rounded-[10px] h-[150px] w-[225px] text-white bg-blue-500 purple translate-y-0" data-speed="0.7">0.4</div> */}
                    {/* <div className="rounded-[10px] w-[15%] h-[100px] text-white bg-blue-500 orange translate-y-0" data-speed="0.47">0</div> */}
                    {/* <div className="rounded-[10px] h-[200px] w-[275px] text-white bg-blue-500 red translate-y-0" data-speed="1">1</div> */}
                    {/* <div className="rounded-[10px] h-[150px] w-[225px] text-white bg-blue-500 blue translate-y-0" data-speed="0.8">0.75</div> */}
                        <div    data-speed="0.6">
                            <ProjectCard
                            title="Project Title"
                            description="This is a description of a large project."
                            image="https://cdn.pixabay.com/photo/2020/04/14/18/13/honey-5043708_1280.jpg"
                            size="large"
                            />
                        </div>

                        <div    data-speed="0.7">
                        <ProjectCard
                        title="Project Title"
                        description="This is a description of a small project."
                        image="https://cdn.pixabay.com/photo/2024/05/13/20/10/ai-generated-8759668_1280.jpg"
                        size="small"
                        />
                        </div>

                        <div    data-speed="1">
                        <ProjectCard
                        title="Project Title"
                        description="This is a description of a large project."
                        image="https://cdn.pixabay.com/photo/2023/04/26/16/21/cherries-7952771_1280.jpg"
                        size="large"
                        data-speed="1"
                        />
                        </div>

                        <div    data-speed="0.55">
                        <ProjectCard
                        title="Project Title"
                        description="This is a description of a small project."
                        image="https://cdn.pixabay.com/photo/2017/08/15/12/58/mouse-bacon-2643820_1280.jpg"
                        size="small"
                        />
                        </div>



                </div>


            </div>
        <div style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundImage: 'url("https://cdn.pixabay.com/photo/2024/04/07/12/41/ai-generated-8681271_1280.png")'}} 
        className="h-[100vh] bg-blue-800">

        </div>
    </div>
  )
}

export default Page