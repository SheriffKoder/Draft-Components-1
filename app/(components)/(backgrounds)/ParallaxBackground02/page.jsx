"use client"
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import React, { useRef } from 'react'
import {ScrollTrigger, ScrollToPlugin} from "gsap/all";

import "./ParallaxBackground01.css"

/* 
https://codepen.io/GreenSock/pen/OJyPmgX?editors=0110

with gsap version
to parallax multiple images depending on their height and given depth attribute
layer with height, bg-image, fixed and z -1 

main container timeline, elements to y movement calc

*/


const Page = () => {

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    useGSAP(()=> {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
                markers: true,
            }
        });

        gsap.utils.toArray(".parallax").forEach(layer => {
            const depth = layer.dataset.depth;
            const movement = -(layer.offsetHeight * depth);
            console.log(movement);
            tl.to(layer, {
                y: movement, 
                ease: "none"
            }, 0)
        });


    },[]);

  return (
    <>
        <div id='hero' className="overflow-hidden relative max-w-[1920px] my-0 mx-auto">
            {/* background */}
            <div className='layer-bg layer parallax' data-depth='0.10'>
            </div>
            {/* building */}
            <div className='layer-1 layer parallax' data-depth='0.20'>
                <div className="flex w-full h-full items-center justify-center">
                        <p className="text-[10rem]">Hello world!</p>
                </div>
            </div>
            {/* bottom sand */}
            <div className='layer-2 layer parallax' data-depth='0.50'></div>
            {/* character */}
            <div className='layer-3 layer parallax' data-depth='0.80'></div>
            {/* overlay dust */}
            <div className='layer-overlay layer parallax' data-depth='0.85'>
            </div>
            {/* bottom dust */}
            <div className='layer-4 layer parallax' data-depth='1.00'></div>
        </div>

        <div id='' className="bg-[#130d0a]">
            <div className='container'>
                {/* <div className='border w-full h-[300px] absolute top-[-300px] layer-4 layer_test' data-depth='1.00'></div> */}
                <section className='first-section pt-[50px] pr-[20px]'>
                <div className='flex flex-row'>
                    <div className='flex flex-col'>
                    <h1 className="parallaxbg_header">You cannot hide the soul. Through all his unearthly tattooings, I thought I saw the traces of a simple honest heart.</h1>
                    </div>
                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-col'>
                    <p>And besides all this, there was a certain lofty bearing about the Pagan, which even his uncouthness could not altogether maim. He looked like a man who had never cringed and never had had a creditor. Whether it was, too, that his head being shaved, his forehead was drawn out in freer and brighter relief, and looked more expansive than it otherwise would, this I will not venture to decide; but certain it was his head was phrenologically an excellent one.</p>
                    <p>It may seem ridiculous, but it reminded me of General Washington's head, as seen in the popular busts of him. It had the same long regularly graded retreating slope from above the brows, which were likewise very projecting, like two long promontories thickly wooded on top. Queequeg was George Washington cannibalistically developed.</p>
                    <p>Whilst I was thus closely scanning him, half-pretending meanwhile to be looking out at the storm from the casement, he never heeded my presence, never troubled himself with so much as a single glance; but appeared wholly occupied with counting the pages of the marvellous book. Considering how sociably we had been sleeping together the night previous, and especially considering the affectionate arm I had found thrown over me upon waking in the morning, I thought this indifference of his very strange. But savages are strange beings; at times you do not know exactly how to take them.</p>
                    </div>
                    <div className='flex flex-col'>
                    <p>At first they are overawing; their calm self-collectedness of simplicity seems a Socratic wisdom. I had noticed also that Queequeg never consorted at all, or but very little, with the other seamen in the inn. He made no advances whatever; appeared to have no desire to enlarge the circle of his acquaintances. All this struck me as mighty singular; yet, upon second thoughts, there was something almost sublime in it. Here was a man some twenty thousand miles from home, by the way of Cape Horn, that is—which was the only way he could get there—thrown among people as strange to him as though he were in the planet Jupiter; and yet he seemed entirely at his ease; preserving the utmost serenity; content with his own companionship; always equal to himself.</p>
                    <p>Here was a man some twenty thousand miles from home, by the way of Cape Horn, that is—which was the only way he could get there—thrown among people as strange to him as though he were in the planet Jupiter; and yet he seemed entirely at his ease; preserving the utmost serenity; content with his own companionship; always equal to himself. Surely this was a touch of fine philosophy; though no doubt he had never heard there was such a thing as that.</p>
                    </div>
                </div>
                </section>
            </div>
        </div>

        <div id="" className='blue pb-[60px] bg-slate-700
        w-full h-[100vh] border flex items-center justify-center'>
            <div className='scroll-down'>
                Scroll Down
                <div className='arrow'>CLICK</div>
            </div>
        </div>



    </>
  )
}

export default Page