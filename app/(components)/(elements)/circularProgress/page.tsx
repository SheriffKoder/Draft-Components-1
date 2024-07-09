// https://lottiefiles.com/blog/working-with-lottie-animations/how-to-use-lottie-in-react-app
// https://lottiefiles.com/free-animation/checkmark-animation-dJfka3ygAI
// https://www.youtube.com/watch?app=desktop&v=H2HYccAGR00

"use client"
import React, { useState } from 'react'
import "./circularProgress.css"

import Lottie from "react-lottie";
import animationData from "./animation-mark.json"

const CircularProgress = () => {

    const [prog, setProg] = useState<number|string>("0%");

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice" 
        }
    };

    const changeProgress = (num:number) => {

        // align the progress to be a little backwards on 
        // let factor = (((num-50+50)*((num/100)*(num/100)*(num/100)*(num/100))/2))+2;
        // num/100 >= 0.5 ? factor = 20*(num/100) : 0;

        // cut like filled bar for un-complete shape with a rotation
        let factor = (110*num/100);

        let fill = Math.floor(450-(450*(num/100))+factor);
        console.log(fill);
        // setProgress(fill);
        // ref.current?.
        let prog = document.getElementById("circularProgress_svg");
        
        if (prog) {

            let i=450;
            let number = 0
            const interval = setInterval(()=> {

            // gradual speed change depending on the current i/progress
            let speedFactor = (125/i)*(300/i);
            i=i-(2*speedFactor);
            number=number+(2*speedFactor);
            //   console.log(i);

            if (i <= fill) {
                clearInterval(interval);
            }
            if (i < 112) {
                setProg("Done");
            } else {
                setProg(`${Math.floor((number/340*100))}%`);
                prog.style.strokeDashoffset=`${i}`;    
            }

            }, 10);
        }
    }


  return (
    <section className="FullScreen_CenteredFlex bg-[rgb(2,8,18)]">
        <div className="circularProgress_skill">
            <div className="circularProgress_outer">
                <div className="circularProgress_inner">
                    <div id="circularProgress_number">
                        {/* {prog} */}
                        
                        {prog === "Done" ? (
                            <Lottie 
                        options={defaultOptions}
                        height={120}
                        width={120}
                        />
                        ): prog}
                    </div>
                </div>
            </div>

            <svg id="circularProgress_svg" 
            className="rotate-[130deg]" style={{strokeDashoffset: 100  }}
            xmlns="http://www.w3.org/2000/svg" version="1.1" width="148px" height="148px">
                <defs>
                    <linearGradient id="GradientColor">
                        <stop offset="50%" stop-color="#39d0b7"/>
                        <stop offset="100%" stopColor="#9733EE"/>
                    </linearGradient>
                </defs>
                <circle cx="72.5" cy="73.5" r="70" stroke-linecap="round"
                id="circularProgress_circle" />
            </svg>

            <div className='flex flex-row items-center justify-center gap-4 mt-12'>
                {/* end at 96 */}
                <button onClick={()=>changeProgress(100)}
                    className="px-4 py-1 rounded-xl bg-gradient-to-r from-[#387ca4] to-[#39d0b7b4]">
                    100%
                </button>
                <button onClick={()=>changeProgress(75)}
                    className="px-4 py-1 rounded-xl bg-gradient-to-r from-[#387ca4] to-[#39d0b7b4]">
                    75%
                </button>
                <button onClick={()=>changeProgress(50)}
                    className= "px-4 py-1 rounded-xl bg-gradient-to-r from-[#387ca4] to-[#39d0b7b4]">
                    50%
                </button>
                <button onClick={()=>changeProgress(25)}
                    className="px-4 py-1 rounded-xl bg-gradient-to-r from-[#387ca4] to-[#39d0b7b4]">
                    25%
                </button>
            </div>


        </div>

    </section>
  )
}

export default CircularProgress