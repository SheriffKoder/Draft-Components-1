'use client'

import Image from 'next/image'
import React, { useEffect, useRef } from 'react'

// import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/all";
import { Power4 } from "gsap";

const page = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Power4);

    gsap.set(".element-revealer2", {
      y: "100%"
    });

    gsap.to(".element-revealer", {
      y: "-100%",
      ease: Power4.easeInOut,
      duration: 1.5
    });

    gsap.to(".element-revealer2", {
      y: "-100%",
      delay: 1,
      ease: Power4.easeInOut,
      duration: 3
    });



  }, []);

  return (
    <div className='w-full h-screen bg-black flex flex-row justify-center items-center'>

      <div className='bg-purple-900 w-[50%] h-[50%] relative overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-full bg-red-500 element-revealer'></div>
        <div className='absolute top-0 left-0 w-full h-full bg-red-500 element-revealer2'></div>
      </div>

    </div>
  )
}

export default page
