"use client"
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import React from 'react'
import {ScrollTrigger, ScrollToPlugin} from "gsap/all";

import "./Navigation.css"
// smooth scroll nav links and progress bars
// https://codepen.io/GreenSock/pen/bGVjLwG?editors=0010

const Page = () => {

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    useGSAP(()=> {

        // general progress bar
        gsap.from(".line-0", {
            scrollTrigger: {
                trigger: "#zero",
                scrub: true,
                start: "top bottom",
                end: "bottom top",
                // markers: true,
            },
            scaleX: 0,
            transformOrigin: "left center", 
            ease: "none"
        });

        gsap.from(".line-0-s", {
            scrollTrigger: {
                trigger: "#zero-s",
                scrub: true,
                start: "bottom bottom",
                end: "bottom top",
                markers: true,
                pin: true,
            },
            translateX: "-100vw",
            transformOrigin: "left center", 
            ease: "none"
        });
            
        // animation with the element vs viewport
        gsap.from(".line-1", {
            scrollTrigger: {
              trigger: ".line-1",
              scrub: true,
              start: "top bottom",
              end: "top top",
            //   markers: true,
            },
            scaleX: 0,
            transformOrigin: "left center", 
            ease: "none"
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
            scaleX: 0, 
            transformOrigin: "left center", 
            ease: "none"
        });

        // from is useful here to set coming-from property X to the default
        // chained with to
        // --- PURPLE/GREEN PANEL ---
        var tl = gsap.timeline({
            scrollTrigger: {
            trigger: ".purple",
            scrub: true,
            pin: true,
            start: "top top",
            end: "+=100%",
            }
        });

        tl.from(".purple p", {scale: 0.3, rotation:45, autoAlpha: 0, ease: "power2"})
        .from(".line-3", {scaleX: 0, transformOrigin: "left center", ease: "none"}, 0)
        .to(".purple", {backgroundColor: "#00bae2"}, 0);


        // navigation links
        let links = gsap.utils.toArray("nav a");
        links.forEach(anchor => {
            let element = document.querySelector(anchor.getAttribute("href")),
            linkST = ScrollTrigger.create({
                trigger: element,
                start: "top top"
            });

            function setActive(link) {
                links.forEach(el => el.classList.remove("active"));
                link.classList.add("active");
            }

            ScrollTrigger.create({
                trigger: element,
                start: "top center",
                end: "bottom center",
                onToggle: self => self.isActive && setActive(anchor),
            });

            anchor.addEventListener("click", e => {
                e.preventDefault();
                gsap.to(window, {
                    duration: 1,
                    scrollTo: linkST.start,
                    overwrite: "auto"
                });
            })

        })




    },[]);

  return (
    <>
        <div id="one" className='blue pb-[60px]
        w-full h-[100vh] border flex items-center justify-center'>
            <div className='scroll-down'>
                Scroll Down
                <div className='arrow'>CLICK</div>
            </div>
        </div>

        <section id="zero" className="relative
        w-full h-[200vh] border flex flex-col items-center justify-start pt-[2rem] 
        ">
        <span className='line-0 sticky top-[2rem]
            w-full max-w-[800px] h-[8px] mb-[10px] inline-block bg-white'></span>
        </section>

        {/* example on zero */}
        <section id="zero-s" className="relative
        w-full h-[100vh] border flex flex-col items-center justify-center bg-black text-white
        ">
            <span className='line-0-s absolute left-0 mask_nav_gsap
                w-full h-full bg-[#4b1fdb]
                flex items-center justify-center  text-white'>
                    {/* <span className="relative text-[10rem]">Hello world</span> */}
            </span>
            <div className="text-[10rem]">
                Hello world
            </div>
        </section>


        <section id='one' className='red 
        w-full h-[100vh] border flex flex-col items-center justify-center bg-slate-800'>
            <span className='line-1
            w-full max-w-[800px] h-[8px] mb-[10px] relative inline-block bg-white'></span>
            <p>
            This line's animation will begin when it enters the viewport and finish when its top edge hits the top of the viewport, staying perfectly in sync with the scrollbar because it has scrub: true
            </p>
        </section>

        <section id='two' className='orange
        w-full h-[100vh] border flex flex-col items-center justify-center'>
            <span className='line-2
            w-full max-w-[800px] h-[8px] mb-[10px] relative inline-block bg-white'></span>
            <p>
            This orange panel gets pinned when its top edge hits the top of the viewport, then the line's animation is linked with the scroll position until it has traveled 100% of the viewport's height (end: "+=100%"), then the orange panel is unpinned and normal scrolling resumes. Padding is added automatically to push the rest of the content down so that it catches up with the scroll when it unpins. You can set pinSpacing: false to prevent that if you prefer.
            </p>
        </section>

        <section id='three' className='purple 
        w-full h-[100vh] border flex flex-col items-center justify-center bg-slate-800'>
            <span className='line-3
            w-full max-w-[800px] h-[8px] mb-[10px] relative inline-block bg-white'></span>
            <p>
            This orange panel gets pinned when its top edge hits the top of the viewport, then the line's animation is linked with the scroll position until it has traveled 100% of the viewport's height (end: "+=100%"), then the orange panel is unpinned and normal scrolling resumes. Padding is added automatically to push the rest of the content down so that it catches up with the scroll when it unpins. You can set pinSpacing: false to prevent that if you prefer.
            </p>
        </section>


        <section id="four" className="panel gray 
        w-full h-[100vh] border flex flex-col items-center justify-center bg-slate-800">
            <p>DONE!</p>
        </section>

        <nav className='border fixed top-[10px] right-[10px] bg-[#0000007d] px-10px rounded-[10px]
        text-white'>
            <div><a href='#zero'>Section one</a></div>
            <div><a href='#one'>Section two</a></div>
            <div><a href='#two'>Section three</a></div>
            <div><a href='#three' className="activeCSS:text-red-500">Section four</a></div>
            <div><a href='#four'>Section five</a></div>
        </nav>
    
    </>
  )
}

export default Page