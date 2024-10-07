"use client"
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import React, { useRef } from 'react'
import {ScrollTrigger} from "gsap/all";
import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

import "./PinnedSideSection.css";


// npm install smooth-scrollbar
// https://idiotwu.github.io/smooth-scrollbar/

// to edit the overscroll effect
// https://github.com/idiotWu/smooth-scrollbar/blob/66c67b85d35c14486bd25a73806c0ab13ffeb267/docs/overscroll.md


// https://codepen.io/akapowl/pen/zYqLyPQ/6a2480c123d88dc391faba0ea5cc590f

const Page = () => {

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(()=> {

        //////////////////////////////////////////////////////////////////////////////
        // scroll bar - only need this to setup smooth scroll and scroll bar
        Scrollbar.use(OverscrollPlugin);

        let bodyScrollBar = Scrollbar.init(document.body, {
          damping: 0.1,
          delegateTo: document,
          plugins: {
            overscroll: {
                effect: 'glow', // or 'bounce'
            glowColor: "#d21515"
            }
          }
        });
        ScrollTrigger.scrollerProxy(".MainContainer2509", {
          scrollTop(value) {
            if (arguments.length) {
              bodyScrollBar.scrollTop = value;
            }
            return bodyScrollBar.scrollTop;
          },
        });
        bodyScrollBar.addListener(ScrollTrigger.update);

        
        
        

        //////////////////////////////////////////////////////////////////////////////
        // sections setup      
        gsap.set(".panel2509", {    // these are multiple elements
            zIndex: (i, target, targets) => targets.length - i,
        });
        
        var sections = gsap.utils.toArray('.panel2509:not(.lastPanel2509)');
        
        sections.forEach((section, i) => {
          
          var tl = gsap.timeline({
            
            scrollTrigger: {
              trigger: ".Wrapper2509",
              scroller: ".MainContainer2509",
              start: () => "top -" + (window.innerHeight*(i+0.5)),
              end: () => "+=" + window.innerHeight,
              scrub: true,
              toggleActions: "play none reverse none",
              invalidateOnRefresh: true,     
            }
            
          })
          
          tl
          .to(section, { height: 0 })
          ;
          
        });
        
        
        
        
        //////////////////////////////////////////////////////////////////////////////
        // text setup              
        
        gsap.set(".panel-text2509", { zIndex: (i, target, targets) => targets.length - i });
        
        var texts = gsap.utils.toArray('.panel-text2509');
        
        texts.forEach((text, i) => {
          
          var tl = gsap.timeline({
            
            scrollTrigger: {
              trigger: ".Wrapper2509",
              scroller: ".MainContainer2509",
              start: () => "top -" + (window.innerHeight*i),
              end: () => "+=" + window.innerHeight,
              scrub: true,
              toggleActions: "play none reverse none",
              invalidateOnRefresh: true,     
            }
            
          })
          
          tl
          .to(text, { duration: 0.33, opacity: 1, y:"50%" })  
          .to(text, { duration: 0.33, opacity: 0, y:"0%" }, 0.66)
          ;
          
        });
        
        
        
        //////////////////////////////////////////////////////////////////////////////
        //
        ScrollTrigger.create({
        
            trigger: ".Wrapper2509",
            scroller: ".MainContainer2509",
            scrub: true,
            markers: true,
            pin: true,
            start: () => "top top",
            end: () => "+=" + ((sections.length + 1) * window.innerHeight),
            invalidateOnRefresh: true,
        
        });
                
        


    },[]);


  return (
    
   
		<div className="MainContainer2509 h-[100vh]">
      
            {/* dummy */}
            <section className="min-h-[100vh] flex items-center justify-center bg-slate-800">
                <div className="">This is some text inside of a div block.</div>
            </section>
  
            {/* //////////////////////////////////////////////////////////////////////////// */}

            <section className="Wrapper2509 flex h-[100vh] justify-around items-center bg-[#070707]">
        
                {/* text wrapper */}
                <div className="relative overflow-hidden w-[450px] h-[80vh]">          
                    <div className="panel-text2509 text-blue-700">Blue</div> 
                    <div className="panel-text2509 text-red-700">Red</div>   
                    <div className="panel-text2509 text-orange-700">Orange</div> 
                    <div className="panel-text2509 text-purple-700">Purple</div> 
                </div>
        
                {/* sections wrapper */}
                <div className="relative overflow-hidden w-[450px] h-[80vh]">
                    <div className="panel2509 h-[100vh] bg-blue-700 z-auto"></div> 
                    <div className="panel2509 bg-red-700 red z-auto"></div>
                    <div className="panel2509 bg-orange-700 z-auto"></div> 
                    <div className="panel2509 bg-purple-700 z-auto lastPanel2509"></div> 
                </div>
        
            </section>

            {/* //////////////////////////////////////////////////////////////////////////// */}


            {/* dummy */}
            <section className="h-[100vh] bg-slate-800"></section>
  
    </div>
  )
}

export default Page