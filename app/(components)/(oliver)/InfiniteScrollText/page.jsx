"use client"

import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import styles from "./page.module.css"

import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import {ScrollTrigger} from "gsap/all";
import ScrollContext from '../../(UI)/SmoothScroll/SmoothScrollContext';


/*
same text twice
second offside
animate till reach -100 xPercent
reset

// 2 change direction on scroll scrub


*/

const HeroDennis = () => {

    const firstText = useRef(null);
    const secondText = useRef(null);

    const slider = useRef(null); //2

    let xPercent = 10;
    let direction = 1; // -1 left, 1 right

    useEffect(()=> {

        gsap.registerPlugin(ScrollTrigger); //2

        requestAnimationFrame(animation);

        gsap.to(slider.current, {   //2
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                scrub: 0.25,    // instead of 1 to be more smooth
                onUpdate: e => direction = e.direction * -1, // reverse direction

            },
            x: "-=150px", // original: 300
        })


    },[]);

    const animation = () => {

        // reset (left)
        if(xPercent <= -100) {
            xPercent = 0;
        }

        // reset (right)
        if(xPercent > 0 ) {
            xPercent = -100;
        }

        gsap.set(firstText.current, {
            xPercent: xPercent
        });
        gsap.set(secondText.current, {
            xPercent: xPercent
        });
        xPercent += 0.05 * direction; //speed   original: 0.1
        requestAnimationFrame(animation);
    }

  return (
    // <ScrollContext>
    <section className={`h-[100vh] relative overflow-hidden`}>
        <Image style={{objectFit:"cover"}} fill={true} src="/OliverImages/ProjectGallery/wallpaper3.jpg" alt="image"/>

        {/* original -300px */}
        <div className={`absolute top-[calc(100vh-400px)]`}>
            <div ref={slider} className="relative whitespace-nowrap flex">
                <p ref={firstText} className="m-0 text-white text-[13vw] font-[500]">
                    The Rock Band - 
                </p>
                <p ref={secondText} className="m-0 text-white text-[13vw] font-[500] absolute left-[100%]"> 
                    The Rock Band - 
                </p>
            </div>
        </div>


    </section>
    // </ScrollContext>
  )
}

export default HeroDennis