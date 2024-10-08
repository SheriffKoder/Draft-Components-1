"use client"
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import React from 'react'
import {ScrollTrigger} from "gsap/all";

const Page = () => {

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(()=> {
    gsap.to(".box1", {
        x: 400,
        rotation: 360,
        duration: 2,
    });

    gsap.to(".box2", {
        // scrollTrigger: ".box2",
        x: 400,
        rotation: 360,
        duration: 2,

        scrollTrigger: {
            trigger: ".box2",
            toggleActions: "play pause resume pause",    
            // play, pause, resume, reverse, restart, reset, complete, none
            // "initial when-interrupted when-get-back-to-it going-past-the-start"
            
            start: "100px 80%",   // trigger start, scroll start
            //top/bottom of the vh, center to assure it is in view
            // can also use px or %, relative to the top
            // markers: true,

            end: "bottom 10%", // end of animation relevant to the top
            // end: "+=300"// can make it relative to start by using +=300 or +=300px
            // end: `+=${document.querySelector(".box2").offsetWidth}`,
            // end: () => "+=" + document.querySelector(".box2").offsetWidth,
            // end relevant to the box width

            // triggers relevant to other elements
            // trigger: ".box1",
            // start: "top 200px",
            // endTrigger: ".box3",
            // end: "top 50%",    // top of .box3 and scroll end mark 10px from top

            // scrub: true,    
            // reverse the animation on scroll up
            // can give a number of seconds for delay
            // no need for toggleActions with this

        }

    });

    // box3
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".box3",
            start: "top center",
            end: "top, 100px",
            scrub: 3,
            // markers: true,
            pin: ".box33"
        }
    })

    // does this then this then this...
    tl.to(".box3", {
        x: 400,
        rotation: 360,
        ease: "none",
        duration: 3,
        backgroundColor: "purple",

    })
    // .to(".box3", {
    //     backgroundColor: "purple",
    //     duration: 3
    // })
    .to(".box3", {
        borderRadius: "10px",
        duration: 3
    })

    // ScrollTrigger.create({
    //     trigger: ".section1",
    //     start: "top top",    //top of element, top vh
    //     end: "+=300px",
    //     pin: true,
    //     markers: true,
    // })

    // enable for all scroll triggers
    ScrollTrigger.defaults({
        // markers: true,
    })


    // do things when in the boundaries of the scroll trigger
    ScrollTrigger.create({
        trigger: ".box4",
        start: "top 100px",
        onEnter: ()=> console.log("enter"),
        onLeave: ()=> console.log("leave"),
        onEnterBack: ()=> console.log("enter back"), // pass the end up
        onLeaveBack: ()=> console.log("leave back"), // pass the start up
        // onUpdate: (self) => console.log("update", self.progress.toFixed(3)),    
        // value between 0->1 for the % of start-end of the scroll trigger
        onToggle: (self) => console.log("toggled", self.isActive),
        // true if we came to the boundaries of the scroll trigger, false if came out
        toggleClass: "gradientBGButton",
        markers: true,
        id: "box4", // identifies the marker

        start: "top center",
        end: "top, 100px",
        // scroller: ".box4-dummy",    // watch for an element instead of the view port
        // horizontal: true,           // watch horizontally instead of vertically

    });

    // let trigger = ScrollTrigger.getById("box4");


    },[]);



  return (
    <div className="text-xs">
        <div className='w-[100%] h-[100vh] pt-[300px] pl-[100px]'>
            Normal animation trigger
            <div className='w-[100px] h-[100px] box1 bg-slate-500 flex items-center justify-center'>
                To Rotation
            </div>
        </div>

        <div className='w-[100%] h-[100vh] pt-[300px] pl-[100px] border-t'>
            Animation trigger when this box is in view
            <div className='w-[100px] h-[100px] box2 bg-slate-500 flex items-center justify-center'>
                ScrollTrigger2
            </div>
        </div>

        <div className='w-[100%] h-[100vh] pt-[300px] pl-[100px] border-t'>
            Multiple/Timeline animations with Scrub/reverse and a pinned element
            <div className="relative">
                <div className='w-[100px] h-[100px] box3 bg-slate-500 flex items-center justify-center'>
                    ScrollTrigger3
                </div>
                <div className='
                absolute top-0 z-[-1]
                w-[100px] h-[100px] box33 bg-slate-700 flex items-center justify-center'>
                    pinned
                </div>
            </div>
        </div>


        <div className='box4-container w-[100%] h-[100vh] pt-[300px] pl-[100px] border-t'>
            <span>do some things when within the scroll boundary</span>
            {/* <div className='box4-dummy
            w-[100px] h-[100px] box33 bg-slate-700 flex items-center justify-center'>
                dummy
            </div> */}

            <div className='w-[100px] h-[100px] box4 bg-slate-500 flex items-center justify-center'>
                ScrollTrigger4
            </div>
        </div>


        <div className='w-[100%] h-[100vh] pt-[300px] pl-[100px] border-t'>
            
        </div>


    </div>
  )
}

export default Page