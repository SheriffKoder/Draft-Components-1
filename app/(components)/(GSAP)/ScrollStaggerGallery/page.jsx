"use client"
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import {ScrollTrigger} from "gsap/all";
import Image from "next/image";

// https://codepen.io/GreenSock/pen/wvMeNee

const page = () => {

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(()=> {
        
        let delSections = document.querySelectorAll(".delayed-section");

        delSections.forEach(section => {
          
            let imageAnim = gsap.to(section.querySelector("img"), {
                y: "-100vh",
                ease: "none",
                paused: true
            });
            
            let progressTo = gsap.quickTo(imageAnim, "progress", {
                ease: "power3", 
                duration: parseFloat(section.dataset.scrub) || 0.1
            });
            
            gsap.to(section.querySelector(".innerContainer"), {
                y: "100vh",
                ease: "none",
                scrollTrigger: {
                    scrub: true,
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    onUpdate: self => progressTo(self.progress)
                }
            });
        
        });
        


    },[]);
  return (
    <div className="h-[200vh]">
        <h1>Scroll down</h1>

        <div id="del1" class="delayed-section top-[51vh] left-[10vw] absolute w-[30vw] h-[38.87vw]" data-scrub="0.5">
            <div class="innerContainer will-change-transform">
                <Image width="575" height="745" src="https://picsum.photos/575/745?index=1" alt=""
                className="max-w-full will-change-transform"/>
            </div>
        </div>
        
        <div id="del2" class="delayed-section top-[60vh] left-[60vw] absolute w-[30vw] h-[38.87vw]" data-scrub="0.2">
            <div class="innerContainer will-change-transform">
                <Image width="575" height="745" src="https://picsum.photos/575/745?index=2" alt=""
                className="max-w-full will-change-transform"/>
            </div>
        </div>

        <div id="del3" class="delayed-section top-[70vh] left-[30vw] absolute w-[30vw] h-[38.87vw]" data-scrub="1">
            <div class="innerContainer will-change-transform">
                <Image width="575" height="745" src="https://picsum.photos/575/745?index=3" alt=""
                className="max-w-full will-change-transform"/>

            </div>
        </div>

    </div>
  )
}

export default page