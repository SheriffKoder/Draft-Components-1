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

const page = () => {

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
    <ScrollContext>
    <main className={styles.main}>
        <Image fill={true} src="https://wallpapers.com/images/hd/majestic-alpine-peaks-7r3jwi77w5uharbr.webp" alt="image"/>

        <div className={styles.sliderContainer}>
            <div ref={slider} className={styles.slider}>
                <p ref={firstText}>Alpine Peaks - </p>
                <p ref={secondText}> Alpine Peaks - </p>
            </div>
        </div>


    </main>
    </ScrollContext>
  )
}

export default page