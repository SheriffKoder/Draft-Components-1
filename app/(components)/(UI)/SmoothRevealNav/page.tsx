"use client"
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import React, { useRef } from 'react'
import {ScrollTrigger, ScrollToPlugin} from "gsap/all";

import "./SmoothRevealNav.css"

// https://codepen.io/GreenSock/pen/qBawMGb
// https://codepen.io/GreenSock/pen/mdVyPvK

const Page = () => {

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    useGSAP(()=> {

        // register the .from, progress=1 (complete), pause it then play on the window
        const showAnim = gsap.from(".main-tool-bar", {
            yPercent: -100,
            paused: true,
            duration: 0.2
        }).progress(1);


        // onUpdate self direction, play a registered .from
        ScrollTrigger.create({
            start: "top top",
            end: "max",
            markers: true,
            onUpdate: (self) => {self.direction === -1 ? showAnim.play() : showAnim.reverse()}
        })

        // version 2: hide only 40px, above not needed
        // ScrollTrigger.create({
        //   start: 'top -80',
        //   end: 99999,
        //   toggleClass: {className: 'scrolled', targets: '.main-tool-bar'}
        // });


    },[]);

  return (
    <div>
        <div className='main-tool-bar h-[80px] bg-[#fffce1] text-[#0e100f] text-center flex items-center justify-center
        fixed w-full left-0 top-0'>Nav Area</div>
        <div className="h-[200vh]"> Scrollable Area</div>
    </div>
  )
}

export default Page



/*

// CSS
@font-face {
  font-display: block;
  font-family: Mori;
  font-style: normal;
  font-weight: 400;
  src: url(https://assets.codepen.io/16327/PPMori-Regular.woff) format("woff");
}







*/