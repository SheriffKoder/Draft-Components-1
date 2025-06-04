'use client'

import Image from 'next/image'
import React, { useEffect, useRef } from 'react'

// import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/all";
import { Power4 } from "gsap";

const Loader = () => {


    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, Power4);

        gsap.set(".element-revealer2", {
            y: "100%"
        });

        gsap.to(".element-revealer", {
            y: "-100%",
            ease: Power4.easeInOut,
            duration: 2.5
        });

        gsap.to(".element-revealer2", {
            y: "0%",
            delay: 1,
            ease: Power4.easeInOut,
            duration: 4
        });

        gsap.to("#loader", {
            zIndex: -1,
            delay: 3.5,
        });
        gsap.to("#loader", {
            opacity: 0,
            delay: 3.5,
            duration: 1.5
        });

    }, [])

  return (
    <div id="loader" className='absolute top-0 left-0 w-full h-full bg-black z-[1000] flex flex-row justify-center items-center'>
        <div className='w-[300px] aspect-square relative overflow-hidden rounded-full'>
            <Image 
                src={'/images/main-logo.png'}
                alt='logo' 
                fill
                className='h-full w-full object-cover bg-white'
            />

            <div className='absolute top-0 left-0 w-full h-full bg-black element-revealer'></div>
            <div className='absolute top-0 left-0 w-full h-full bg-black element-revealer2'></div>
        </div>
    </div>
  )
}

export default Loader
