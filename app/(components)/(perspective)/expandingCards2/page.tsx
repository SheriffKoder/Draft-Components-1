
"use client"
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import React from 'react'
import {ScrollTrigger} from "gsap/all";
import "./expandingCards2.css";

const page = () => {

  gsap.registerPlugin(ScrollTrigger);


  // gsap from ?
  // proper scroll triggers to animate alternatively
  // maybe try a timed timeline with equal delay

useGSAP(()=> {

  gsap.to(".expandingCards2_front", {
    // scrollTrigger: ".box2",
    // x: 400,
    // rotation: 360,
    duration: 2,
    translateZ: 100,
    opacity: 1,

    scrollTrigger: {
        trigger: ".expandingCards2_container",
        toggleActions: "play pause resume pause",    
        // play, pause, resume, reverse, restart, reset, complete, none
        // "initial when-interrupted when-get-back-to-it going-past-the-start"

        start: "50px top",   // trigger start, scroll start
        //top/bottom of the vh, center to assure it is in view
        // can also use px or %, relative to the top
        // markers: true,

        end: "top 65%", // end of animation relevant to the top
        // end: "+=300"// can make it relative to start by using +=300 or +=300px
        // end: `+=${document.querySelector(".box2").offsetWidth}`,
        // end: () => "+=" + document.querySelector(".box2").offsetWidth,
        // end relevant to the box width

        // triggers relevant to other elements
        // trigger: ".box1",
        // start: "top 200px",
        // endTrigger: ".box3",
        // end: "top 50%",    // top of .box3 and scroll end mark 10px from top

        scrub: true,    
        // reverse the animation on scroll up
        // can give a number of seconds for delay
        // no need for toggleActions with this

    }

    
    

  });

  gsap.to(".cards_para1", {
    // scrollTrigger: ".box2",
    // x: 400,
    // rotation: 360,
    duration: 2,
    translateY: -10,
    opacity: 0,
    

    scrollTrigger: {
        trigger: ".expandingCards2_container",
        toggleActions: "play pause resume pause",    
        // play, pause, resume, reverse, restart, reset, complete, none
        // "initial when-interrupted when-get-back-to-it going-past-the-start"

        start: "50px top",   // trigger start, scroll start
        //top/bottom of the vh, center to assure it is in view
        // can also use px or %, relative to the top
        // markers: true,

        end: "top 65%", // end of animation relevant to the top
        // end: "+=300"// can make it relative to start by using +=300 or +=300px
        // end: `+=${document.querySelector(".box2").offsetWidth}`,
        // end: () => "+=" + document.querySelector(".box2").offsetWidth,
        // end relevant to the box width

        // triggers relevant to other elements
        // trigger: ".box1",
        // start: "top 200px",
        // endTrigger: ".box3",
        // end: "top 50%",    // top of .box3 and scroll end mark 10px from top

        scrub: true,    
        // reverse the animation on scroll up
        // can give a number of seconds for delay
        // no need for toggleActions with this
        snap:1,


    }

    
    

  });

  gsap.to(".cards_para2", {
    // scrollTrigger: ".box2",
    // x: 400,
    // rotation: 360,
    duration: 3,
    translateY: 0,
    opacity: 1,

    scrollTrigger: {
        trigger: ".expandingCards2_container",
        toggleActions: "play pause resume pause",    
        // play, pause, resume, reverse, restart, reset, complete, none
        // "initial when-interrupted when-get-back-to-it going-past-the-start"

        start: "0px top",   // trigger start, scroll start
        //top/bottom of the vh, center to assure it is in view
        // can also use px or %, relative to the top
        markers: true,

        end: "top 100px", // end of animation relevant to the top
        // end: "+=300"// can make it relative to start by using +=300 or +=300px
        // end: `+=${document.querySelector(".box2").offsetWidth}`,
        // end: () => "+=" + document.querySelector(".box2").offsetWidth,
        // end relevant to the box width

        // triggers relevant to other elements
        // trigger: ".box1",
        // start: "top 200px",
        // endTrigger: ".box3",
        // end: "top 50%",    // top of .box3 and scroll end mark 10px from top

        scrub: true,    
        // reverse the animation on scroll up
        // can give a number of seconds for delay
        // no need for toggleActions with this

    }

    
    

  });


  gsap.to(".expandingCards2_back", {
    // scrollTrigger: ".box2",
    // x: 400,
    // rotation: 360,
    duration: 2,
    translateZ: 200,
    opacity: 1,

    scrollTrigger: {
        trigger: ".expandingCards2_container",
        toggleActions: "play pause resume pause",    
        // play, pause, resume, reverse, restart, reset, complete, none
        // "initial when-interrupted when-get-back-to-it going-past-the-start"

        start: "300px 0%",   // trigger start, scroll start
        //top/bottom of the vh, center to assure it is in view
        // can also use px or %, relative to the top
        // markers: true,

        end: "top 65%", // end of animation relevant to the top
        // end: "+=300"// can make it relative to start by using +=300 or +=300px
        // end: `+=${document.querySelector(".box2").offsetWidth}`,
        // end: () => "+=" + document.querySelector(".box2").offsetWidth,
        // end relevant to the box width

        // triggers relevant to other elements
        // trigger: ".box1",
        // start: "top 200px",
        // endTrigger: ".box3",
        // end: "top 50%",    // top of .box3 and scroll end mark 10px from top

        scrub: true,    
        // reverse the animation on scroll up
        // can give a number of seconds for delay
        // no need for toggleActions with this

    }
    
  });

  gsap.to(".cards_para2", {
    // scrollTrigger: ".box2",
    // x: 400,
    // rotation: 360,
    duration: 2,
    translateY: -10,
    opacity: 0,

    scrollTrigger: {
        trigger: ".expandingCards2_container",
        toggleActions: "play pause resume pause",    
        // play, pause, resume, reverse, restart, reset, complete, none
        // "initial when-interrupted when-get-back-to-it going-past-the-start"

        start: "300px 0%",   // trigger start, scroll start
        //top/bottom of the vh, center to assure it is in view
        // can also use px or %, relative to the top
        // markers: true,

        end: "top 65%", // end of animation relevant to the top
        // end: "+=300"// can make it relative to start by using +=300 or +=300px
        // end: `+=${document.querySelector(".box2").offsetWidth}`,
        // end: () => "+=" + document.querySelector(".box2").offsetWidth,
        // end relevant to the box width

        // triggers relevant to other elements
        // trigger: ".box1",
        // start: "top 200px",
        // endTrigger: ".box3",
        // end: "top 50%",    // top of .box3 and scroll end mark 10px from top

        scrub: true,    
        // reverse the animation on scroll up
        // can give a number of seconds for delay
        // no need for toggleActions with this

    }
    
  });

  gsap.to(".cards_para3", {
    // scrollTrigger: ".box2",
    // x: 400,
    // rotation: 360,
    duration: 3,
    translateY: 0,
    opacity: 1,

    scrollTrigger: {
        trigger: ".expandingCards2_container",
        toggleActions: "play pause resume pause",    
        // play, pause, resume, reverse, restart, reset, complete, none
        // "initial when-interrupted when-get-back-to-it going-past-the-start"

        start: "300px 0%",   // trigger start, scroll start
        //top/bottom of the vh, center to assure it is in view
        // can also use px or %, relative to the top
        // markers: true,

        end: "top 65%", // end of animation relevant to the top
        // end: "+=300"// can make it relative to start by using +=300 or +=300px
        // end: `+=${document.querySelector(".box2").offsetWidth}`,
        // end: () => "+=" + document.querySelector(".box2").offsetWidth,
        // end relevant to the box width

        // triggers relevant to other elements
        // trigger: ".box1",
        // start: "top 200px",
        // endTrigger: ".box3",
        // end: "top 50%",    // top of .box3 and scroll end mark 10px from top

        scrub: true,    
        // reverse the animation on scroll up
        // can give a number of seconds for delay
        // no need for toggleActions with this

    }
    
  });

  
  gsap.to(".cards_para4", {
    // scrollTrigger: ".box2",
    // x: 400,
    // rotation: 360,
    duration: 3,
    translateY: 0,
    opacity: 1,

    scrollTrigger: {
        trigger: ".expandingCards2_container",
        toggleActions: "play pause resume pause",    
        // play, pause, resume, reverse, restart, reset, complete, none
        // "initial when-interrupted when-get-back-to-it going-past-the-start"

        start: "600px 0%",   // trigger start, scroll start
        //top/bottom of the vh, center to assure it is in view
        // can also use px or %, relative to the top
        markers: true,

        end: "top 65%", // end of animation relevant to the top
        // end: "+=300"// can make it relative to start by using +=300 or +=300px
        // end: `+=${document.querySelector(".box2").offsetWidth}`,
        // end: () => "+=" + document.querySelector(".box2").offsetWidth,
        // end relevant to the box width

        // triggers relevant to other elements
        // trigger: ".box1",
        // start: "top 200px",
        // endTrigger: ".box3",
        // end: "top 50%",    // top of .box3 and scroll end mark 10px from top

        scrub: true,    
        // reverse the animation on scroll up
        // can give a number of seconds for delay
        // no need for toggleActions with this

    }
    
  });

  //back to z of 100 and opacity 0
  //front to z of 0, opacity 0

  // design box opacity 0
  // show website box
  // show cards para4




},[]);

  return (
    <>
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">

    </div>
    <div className="w-full h-[200vh] flex flex-col items-end justify-start
    main_container bg-slate-800 relative">
      <div className=" sticky top-[30vh] flex flex-row w-full border px-[2rem]">
      
      <div className="my-auto relative flex-1">
        <p className="cards_para1 absolute transition-all duration-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa eligendi, deleniti debitis, iste eum laboriosam tempore officia voluptas vitae quos voluptatibus vero voluptatum, beatae cumque possimus omnis? Quis, eius expedita.</p>
        <p className="cards_para2 opacity-0 absolute text-green-500 translate-y-10 transition-all duration-700">dolor sit amet consectetur adipisicing elit. Ipsa eligendi, deleniti debitis, iste eum laboriosam tempore officia voluptas vitae quos voluptatibus vero voluptatum, beatae cumque possimus omnis? Quis, eius expedita.</p>
        <p className="cards_para3 opacity-0 absolute text-red-500 translate-y-10 transition-all duration-700">ipsum dolor sit amet consectetur adipisicing elit. Ipsa eligendi, deleniti debitis, iste eum laboriosam tempore officia voluptas vitae quos voluptatibus vero voluptatum, beatae cumque possimus omnis? Quis, eius expedita.</p>
        <p className="cards_para4 opacity-0 absolute text-yellow-500 translate-y-10 transition-all duration-700">ipsum dolor sit amet consectetur adipisicing elit. Ipsa eligendi, deleniti debitis, iste eum laboriosam tempore officia voluptas vitae quos voluptatibus vero voluptatum, beatae cumque possimus omnis? Quis, eius expedita.</p>

      </div>

        <div className="expandingCards2_container">
          <div className="expandingCards2_cube">
            <div className="expandingCards2_face expandingCards2_top">Design</div>
            {/* <div className="face bottom">Bottom</div> */}
            {/* <div className="face left">Left</div> */}
            {/* <div className="face right">Right</div> */}
            <div className="expandingCards2_face expandingCards2_front opacity-0">Front</div>
            <div className="expandingCards2_face expandingCards2_back opacity-0">Back</div>
          </div>
        </div>
      </div>



    </div>
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">

    </div>
    </>
    
  )
}

export default page