"use client"
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import React, { useRef } from 'react'
import {ScrollTrigger} from "gsap/all";
import Scrollbar from 'smooth-scrollbar';
import "./PinnedSideSection.css";


// npm install smooth-scrollbar
// absolute left-0 top-0 right-0 bottom-0

const page = () => {

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(()=> {

        gsap.registerPlugin(ScrollTrigger);
        let bodyScrollBar = Scrollbar.init(document.body, {
          damping: 0.1,
          delegateTo: document,
        });
        ScrollTrigger.scrollerProxy(".scroller", {
          scrollTop(value) {
            if (arguments.length) {
              bodyScrollBar.scrollTop = value;
            }
            return bodyScrollBar.scrollTop;
          },
        });
        bodyScrollBar.addListener(ScrollTrigger.update);
        
        
        
        
        
        
        
        gsap.set(".panel", { zIndex: (i, target, targets) => targets.length - i });
        
        var images = gsap.utils.toArray('.panel:not(.purple)');
        
        images.forEach((image, i) => {
          
          var tl = gsap.timeline({
            
            scrollTrigger: {
              trigger: "section.black",
              scroller: ".scroller",
              start: () => "top -" + (window.innerHeight*(i+0.5)),
              end: () => "+=" + window.innerHeight,
              scrub: true,
              toggleActions: "play none reverse none",
              invalidateOnRefresh: true,     
            }
            
          })
          
          tl
          .to(image, { height: 0 })
          ;
          
        });
        
        
        
        
        
        
        
        gsap.set(".panel-text", { zIndex: (i, target, targets) => targets.length - i });
        
        var texts = gsap.utils.toArray('.panel-text');
        
        texts.forEach((text, i) => {
          
          var tl = gsap.timeline({
            
            scrollTrigger: {
              trigger: "section.black",
              scroller: ".scroller",
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
        
        
        
        
        
        ScrollTrigger.create({
        
            trigger: "section.black",
            scroller: ".scroller",
            scrub: true,
            markers: true,
            pin: true,
            start: () => "top top",
            end: () => "+=" + ((images.length + 1) * window.innerHeight),
            invalidateOnRefresh: true,
        
        });

    },[]);


  return (
    
   
		<div class="scroller">
      
        <section class="orange">
            <div class="text">This is some text inside of a div block.</div>
        </section>
  
        <section class="black">
    
            <div class="text-wrap">          
      <div class="panel-text blue-text">Blue</div> 
      <div class="panel-text red-text">Red</div>   
      <div class="panel-text orange-text">Orange</div> 
      <div class="panel-text purple-text">Purple</div> 
    </div>
    
            <div class="p-wrap">
                <div class="panel blue"></div> 
                <div class="panel red"></div>
                <div class="panel orange"></div> 
                <div class="panel purple"></div> 
            </div>
    
        </section>
  
        <section class="blue"></section>
  
    </div>
  )
}

export default page