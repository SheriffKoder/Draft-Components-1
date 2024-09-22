"use client"
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import React, { useRef } from 'react'
import {ScrollTrigger, ScrollToPlugin} from "gsap/all";


const page = () => {
    // https://codepen.io/GreenSock/pen/LYRwgPo?editors=0010
    
    let cards = [
        {name: "1"},
        {name: "2"},
        {name: "3"},
        {name: "4"},
        {name: "5"},
        {name: "6"},
        {name: "7"},
        {name: "8"},
        {name: "9"},

    ]

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    useGSAP(()=> {
        let iteration = 0; 
        // gets iterated when we scroll all the way to the end or start and wraps around
        // allows us to smoothly continue the playhead scrubbing in the correct direction.

        const spacing = 0.2,    // spacing of the cards (stagger) **was 0.1
            snap = gsap.utils.snap(spacing), // we'll use this to snap the playhead on the seamlessLoop
            cards = gsap.utils.toArray('.cards li'),
            seamlessLoop = buildSeamlessLoop(cards, spacing),
            scrub = gsap.to(seamlessLoop, { // we reuse this tween to smoothly scrub the playhead on the seamlessLoop
                totalTime: 0,
                duration: 0.5,
                ease: "power3",
                paused: true
            }),
            trigger = ScrollTrigger.create({
                start: 0,
                onUpdate(self) {
                    if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
                        wrapForward(self);
                    } else if (self.progress < 1e-5 && self.direction < 0 && !self.wrapping) {
                        wrapBackward(self);
                    } else {
                scrub.vars.totalTime = snap((iteration + self.progress) * seamlessLoop.duration());
                        scrub.invalidate().restart(); // to improve performance, we just invalidate and restart the same tween. No need for overwrites or creating a new tween on each update.
                        self.wrapping = false;
                    }
                },
                end: "+=3000",
                pin: ".gallery"
            });
        
        function wrapForward(trigger) { // when the ScrollTrigger reaches the end, loop back to the beginning seamlessly
            iteration++;
            trigger.wrapping = true;
            trigger.scroll(trigger.start + 1);
        }
        
        function wrapBackward(trigger) { // when the ScrollTrigger reaches the start again (in reverse), loop back to the end seamlessly
            iteration--;
            if (iteration < 0) { // to keep the playhead from stopping at the beginning, we jump ahead 10 iterations
                iteration = 9;
                seamlessLoop.totalTime(seamlessLoop.totalTime() + seamlessLoop.duration() * 10);
            scrub.pause(); // otherwise it may update the totalTime right before the trigger updates, making the starting value different than what we just set above. 
            }
            trigger.wrapping = true;
            trigger.scroll(trigger.end - 1);
        }
        
        function scrubTo(totalTime) { // moves the scroll position to the place that corresponds to the totalTime value of the seamlessLoop, and wraps if necessary.
            let progress = (totalTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration();
            if (progress > 1) {
                wrapForward(trigger);
            } else if (progress < 0) {
                wrapBackward(trigger);
            } else {
                trigger.scroll(trigger.start + progress * (trigger.end - trigger.start));
            }
        }
        
        document.querySelector(".next")?.addEventListener("click", () => scrubTo(scrub.vars.totalTime + spacing));
        document.querySelector(".prev")?.addEventListener("click", () => scrubTo(scrub.vars.totalTime - spacing));
        
        
        
        
        function buildSeamlessLoop(items, spacing) {
            let overlap = Math.ceil(1 / spacing), // number of EXTRA animations on either side of the start/end to accommodate the seamless looping
                startTime = items.length * spacing + 0.5, // the time on the rawSequence at which we'll start the seamless loop
                loopTime = (items.length + overlap) * spacing + 1, // the spot at the end where we loop back to the startTime 
                rawSequence = gsap.timeline({paused: true}), // this is where all the "real" animations live
                seamlessLoop = gsap.timeline({ // this merely scrubs the playhead of the rawSequence so that it appears to seamlessly loop
                    paused: true,
                    repeat: -1, // to accommodate infinite scrolling/looping
                    onRepeat() { // works around a super rare edge case bug that's fixed GSAP 3.6.1
                        this._time === this._dur && (this._tTime += this._dur - 0.01);
                    }
                }),
                l = items.length + overlap * 2,
                time = 0,
                i, index, item;
        
            // set initial state of items
            gsap.set(items, {xPercent: 300, opacity: 0,	scale: 0.9});
        
            // now loop through and create all the animations in a staggered fashion. Remember, we must create EXTRA animations at the end to accommodate the seamless looping.
            for (i = 0; i < l; i++) {
                index = i % items.length;
                item = items[index];
                time = i * spacing; //**scale below was 0, xPercent 400 (spacing)*/
                rawSequence.fromTo(item, {scale: 0.9, opacity: 0}, {scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in", immediateRender: false}, time)
                           .fromTo(item, {xPercent: 300}, {xPercent: -300, duration: 1, ease: "none", immediateRender: false}, time);
                i <= items.length && seamlessLoop.add("label" + i, time); // we don't really need these, but if you wanted to jump to key spots using labels, here ya go.
            }
            
            // here's where we set up the scrubbing of the playhead to make it appear seamless. 
            rawSequence.time(startTime);
            seamlessLoop.to(rawSequence, {
                time: loopTime,
                duration: loopTime - startTime,
                ease: "none"
            }).fromTo(rawSequence, {time: overlap * spacing + 1}, {
                time: startTime,
                duration: startTime - (overlap * spacing + 1),
                immediateRender: false,
                ease: "none"
            });
            return seamlessLoop;
        }

    },[]);

  return (
    // <div className="h-[100vh] w-full relative overflow-hidden">
        <div className='gallery absolute w-full h-[100vh] overflow-hidden'>
            <ul className='cards absolute w-[14rem] h-[18rem] top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                {cards.map((card)=> (
                    <li className='
                    p-0 m-0 w-[14rem] h-[18rem] text-center leading-[18rem]
                    text-[2rem] bg-[#9d7cce] absolute top-0 left-0 rounded-[0.8rem]
                    ' key={card.name}>
                        {card.name}
                    </li>
                ))}
            </ul>
            <div className='actions absolute bottom-[25px] left-[50%] translate-x-[-50%] flex flex-row gap-4'>
                <button className='prev inline-block px-[14px] py-[8px] bg-[#414141] hover:bg-[#282828] rounded-[5px]'>Prev</button>
                <button className='next inline-block px-[14px] py-[8px] bg-[#414141] hover:bg-[#282828] rounded-[5px]'>Next</button>
            </div>
        </div>
    // </div>
  )
}

export default page