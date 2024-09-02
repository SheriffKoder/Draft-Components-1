
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
  // responsive start,end triggers

useGSAP(()=> {


// one start-end trigger to rule them all
let tl = gsap.timeline({
  scrollTrigger: {
      trigger: ".expandingCards2_container",
      start: "0px 50%", // desktop
      // start: "0px 35%", //phone
      end: "bottom 20%",  //end, scroll end
      scrub: 1,
      markers: true,
      pin: ".main_container",

  }
})

// first set of animations running in the same time
tl.add("front-end")
.to(".expandingCards2_front", {
    // duration: 1,
    translateZ: 0,
    opacity: 1,

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
}, "front-end")


// second set of animations running in the same time
.add("back-end")
.to(".expandingCards2_back", {
  //  duration: 1,
    translateZ: 100,
    opacity: 1,
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
}, "back-end")

// third set of animations running in the same time
.add("close")
.to(".expandingCards2_top", {
  // duration: 1,
   translateZ: 0,
   opacity: 0,
}, "close")
.to(".expandingCards2_front", {
  // duration: 1,
  delay: 1,
  //  translateZ: 100,
   opacity: 0,
}, "close")
.to(".expandingCards2_back", {
  // duration: 1,
   translateZ: 0,
   opacity: 0,
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
}, "close")
.to(".cards_para4", {
  //  duration: 1,
    translateY: 0,
    opacity: 1,
}, "close")






},[]);

  return (
    <>

    {/* space */}
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">

    </div>

    {/* container */}
    {/* main container is the scroll pinned element */}
    <div className="flex flex-col border md:h-[50vh] bg-slate-800 main_container">

      {/* container header */}
      <h1 className="mx-auto mt-[2rem]">How a website is built</h1>

      {/* flex row of cards and text areas */}
      <div className="w-full flex flex-col items-center justify-start
      relative px-[2rem] flex-1
      md:flex-row">

        <div className="expandingCards2_container border">
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

        <div className="my-auto relative flex-1 border md:text-base text-xs">
          <p className="cards_para1 transition-all duration-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa eligendi, deleniti debitis, iste eum laboriosam tempore officia voluptas vitae quos voluptatibus vero voluptatum, beatae cumque possimus omnis? Quis, eius expedita.</p>
          <p className="cards_para2 opacity-0 text-green-500 translate-y-10 transition-all duration-700">dolor sit amet consectetur adipisicing elit. Ipsa eligendi, deleniti debitis, iste eum laboriosam tempore officia voluptas vitae quos voluptatibus vero voluptatum, beatae cumque possimus omnis? Quis, eius expedita.</p>
          <p className="cards_para3 opacity-0 text-red-500 translate-y-10 transition-all duration-700">ipsum dolor sit amet consectetur adipisicing elit. Ipsa eligendi, deleniti debitis, iste eum laboriosam tempore officia voluptas vitae quos voluptatibus vero voluptatum, beatae cumque possimus omnis? Quis, eius expedita.</p>
          <p className="cards_para4 opacity-0 text-yellow-500 translate-y-10 transition-all duration-700">ipsum dolor sit amet consectetur adipisicing elit. Ipsa eligendi, deleniti debitis, iste eum laboriosam tempore officia voluptas vitae quos voluptatibus vero voluptatum, beatae cumque possimus omnis? Quis, eius expedita.</p>
        </div>

      </div>

    </div>
    


    <div className="w-full h-[100vh] flex flex-col items-center justify-center">

    </div>
    </>
    
  )
}

export default page