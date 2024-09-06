
"use client"
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import React from 'react'
import {ScrollTrigger} from "gsap/all";
import "./expandingCards2.css";

const page = () => {

  gsap.registerPlugin(ScrollTrigger);


  // *gsap from ?
  // *proper scroll triggers to animate alternatively
  // *maybe try a timed timeline with equal delay
  // *responsive start,end triggers
  // add phone media to face css and trigger animation
  // adjust the gap between cards/text in responsive modes

useGSAP(()=> {


// one start-end trigger to rule them all
let tl = gsap.timeline({
  
  scrollTrigger: {
      trigger: ".main_container",
      start: "0px 0%", // phone
      // start: "0px 30%", // desktop
      end: "bottom 0%",  //end, scroll end
      scrub: 3,   // slow the animation
      markers: true,
      pin: ".expandingCards2_area",

  }
})

// first set of animations running in the same time
tl.add("front-end")
.to(".expandingCards2_front", {
    // duration: 1,
    translateZ: 0,
    opacity: 1,
    delay: 1,
}, "front-end")
.to(".cards_para1", {
  //  duration: 0.3,
    // translateY: 0,
    // opacity: 0,
}, "front-end")
.to(".cards_para2", {
  //  duration: 1,
    translateY: 0,
    opacity: 1,
    // delay: 5,
}, "front-end")


// second set of animations running in the same time
.add("back-end")
.to(".expandingCards2_back", {
  //  duration: 1,
    translateZ: 100,
    opacity: 1,
    delay: 1,

}, "back-end")
.to(".cards_para2", {
  //  duration: 0.3,
    // translateY: 0,
    // opacity: 0,
}, "back-end")
.to(".cards_para3", {
  //  duration: 1,
    translateY: 0,
    opacity: 1,
    delay: 0,
}, "back-end")

// third set of animations running in the same time
.add("close")
.to(".expandingCards2_top", {
  // duration: 1,
   translateZ: 0,
   opacity: 0,
   delay: 1,
}, "close")
.to(".expandingCards2_front", {
  // duration: 1,
  //  translateZ: 100,
   opacity: 0,
   delay: 1,
}, "close")
.to(".expandingCards2_back", {
  // duration: 1,
   translateZ: 0,
   opacity: 0,
   delay: 1,
}, "close")
.to(".cards_para3", {
  //  duration: 0.3,
    // translateY: 0,
    // opacity: 0,
}, "close")
.to(".expandingCards2_web", {
  // duration: 1,
  // delay: 1,
  //  translateZ: 100,
   opacity: 1,
   delay: 1,
}, "close")
.to(".cards_para4", {
  //  duration: 1,
    translateY: 0,
    opacity: 1,
    // delay: 3,
}, "close")
// some dummy delay
.to(".cards_para1", {
   duration: 2,
    // translateY: 10,
    opacity: 1,
    delay: 3,
}, "close")





},[]);

  return (
    <>

    {/* space */}
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">

    </div>

    {/* the area is the trigger to start the animation*/}
    <div className="expandingCards2_area h-[100vh] md:h-[50vh] border overflow-hidden">

    {/* container */}
    {/* main container is the scroll pinned element 
    high height to gain more start to end time space*/}
    <div className="min-h-[100vh] main_container bg-slate-800 max-w-[1200px] mx-auto
    ">
          <h1 className="mx-auto pt-[2rem] text-center">How a website is built</h1>

          <div className="subContainer flex flex-col items-center md:justify-center h-[100vh] 
          md:h-[50vh] py-[2rem] md:py-[0rem] md:mt-[-2rem]
          border border-red-500">
            {/* container header */}
            {/* flex row of cards and text areas */}
            <div className="w-full flex flex-col items-center justify-end
            relative px-[2rem]
            md:flex-row gap-[min(5vh,100px)]">
              <div className="expandingCards2_container border md:mx-[50px] ">
                <div className="expandingCards2_cube">
                  <div className="expandingCards2_face expandingCards2_top">Design</div>
                  {/* <div className="face bottom">Bottom</div> */}
                  {/* <div className="face left">Left</div> */}
                  {/* <div className="face right">Right</div> */}
                  <div className="expandingCards2_face expandingCards2_front opacity-0">Front</div>
                  <div className="expandingCards2_face expandingCards2_web opacity-0">Website</div>
                  <div className="expandingCards2_face expandingCards2_back opacity-0">Back</div>
                </div>
              </div>
              <div className="my-auto relative flex-1 border lg:text-base text-xs">
                <p className="cards_para1 transition-all duration-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa eligendi, deleniti debitis, iste eum laboriosam tempore officia voluptas vitae quos voluptatibus vero voluptatum, beatae cumque possimus omnis? Quis, eius expedita.</p>
                <p className="cards_para2 opacity-0 text-green-500 translate-y-10 transition-all duration-700">dolor sit amet consectetur adipisicing elit. Ipsa eligendi, deleniti debitis, iste eum laboriosam tempore officia voluptas vitae quos voluptatibus vero voluptatum, beatae cumque possimus omnis? Quis, eius expedita.</p>
                <p className="cards_para3 opacity-0 text-red-500 translate-y-10 transition-all duration-700">ipsum dolor sit amet consectetur adipisicing elit. Ipsa eligendi, deleniti debitis, iste eum laboriosam tempore officia voluptas vitae quos voluptatibus vero voluptatum, beatae cumque possimus omnis? Quis, eius expedita.</p>
                <p className="cards_para4 opacity-0 text-yellow-500 translate-y-10 transition-all duration-700">ipsum dolor sit amet consectetur adipisicing elit. Ipsa eligendi, deleniti debitis, iste eum laboriosam tempore officia voluptas vitae quos voluptatibus vero voluptatum, beatae cumque possimus omnis? Quis, eius expedita.</p>
              </div>
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