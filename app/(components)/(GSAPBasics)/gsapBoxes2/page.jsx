"use client"
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import React from 'react'
import {ScrollTrigger} from "gsap/all";

const Page = () => {

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(()=> {
    
        let tl = gsap.timeline({
            // yes, we can add it to an entire timeline!
            scrollTrigger: {
                markers: true,
                trigger: '.container',
                pin: true, // pin the trigger element while active
                start: 'top top', // when the top of the trigger hits the top of the viewport
                end: '+=500', // end after scrolling 500px beyond the start
                scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                // auto animation
                snap: {
                    snapTo: 'labels', // snap to the closest label in the timeline
                    duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
                    delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
                    ease: 'power1.inOut' // the ease of the snap animation ("power3" by default)
                }
            },
        });
        
        // add animations and labels to the timeline
        tl.addLabel('start')
            .from('.box p', { scale: 0.3, rotation: 45, autoAlpha: 0 })
            .addLabel('color')
            .from('.box', { backgroundColor: '#28a92b' })
            .addLabel('spin')
            .to('.box', { rotation: 360 })
            .addLabel('end');

    },[]);

    // ScrollTrigger.create({
    //     trigger: '#id',
    //     start: 'top top',
    //     endTrigger: '#otherID',
    //     end: 'bottom 50%+=100px',
    //     onToggle: (self) => console.log('toggled, isActive:', self.isActive),
    //     onUpdate: (self) => {
    //         console.log(
    //             'progress:',
    //             self.progress.toFixed(3),
    //             'direction:',
    //             self.direction,
    //             'velocity',
    //             self.getVelocity()
    //         );
    //     }
    // });



  return (
    <div className="text-xs">
        <div className='w-[100%] h-[100vh] pt-[300px] pl-[100px]'>
            {/* Normal animation trigger */}
            <div className='w-[100px] h-[100px] box1 bg-slate-500 flex items-center justify-center'>
                {/* To Rotation */}
            </div>
        </div>

        <div className='w-[100%] h-[100vh] pt-[300px] pl-[100px] border-t container'>
            Animation trigger when this box is in view
            <div className='box
            w-[100px] h-[100px] box2 bg-slate-500 flex items-center justify-center'>
                <p>ScrollTrigger2</p>
            </div>
        </div>

        <div className='w-[100%] h-[100vh] pt-[300px] pl-[100px] border-t'>
            {/* Multiple/Timeline animations with Scrub/reverse and a pinned element */}
        </div>




        <div className='w-[100%] h-[100vh] pt-[300px] pl-[100px] border-t'>
            
        </div>


    </div>
  )
}

export default Page