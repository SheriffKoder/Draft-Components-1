// https://lottiefiles.com/blog/working-with-lottie-animations/how-to-use-lottie-in-react-app
// https://lottiefiles.com/free-animation/checkmark-animation-dJfka3ygAI
// https://www.youtube.com/watch?app=desktop&v=H2HYccAGR00

"use client"
import React, { useState } from 'react'
import "./circularProgress.css"

import Lottie from "react-lottie";
import animationData from "./animation-mark.json"

// if you will use a small circle use in svg r value and in the fill add value (i100%End-iDesired100%End)

const CircularProgress = () => {

    const [prog, setProg] = useState<string>("100%");
    const [length, setLength] = useState<number>(112);
    const [busy, setBusy] = useState(false);

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice" 
        }
    };

    const changeProgress = (num:number, e:React.MouseEvent<HTMLButtonElement>) => {

        // align the progress to be a little backwards on 
        // let factor = (((num-50+50)*((num/100)*(num/100)*(num/100)*(num/100))/2))+2;
        // num/100 >= 0.5 ? factor = 20*(num/100) : 0;

        // cut like filled bar for un-complete shape with a rotation
        let factor = (110*num/100);

        let fill = (Math.floor(450-(450*(num/100))+factor));

        // let fill = (Math.floor(450-(450*(num/100))+factor))+(282-106); // small svg r
        // console.log(fill);
        console.log(length);
        console.log(+prog.split("%")[0]);
        console.log(fill);
        // ref.current?.
        let progressBar = document.getElementById("circularProgress_svg");

        
        if (progressBar) {

            let i=length;   //current length
            let number = 0;
            setBusy(true);
            const interval = setInterval(()=> {

                // gradual speed change depending on the current i/progress
                let speedFactor = (125/i)*(300/i);

                // decrementing
                if (num < +prog.split("%")[0]) {

                    i=i+(2*speedFactor);
                    number=number+(2*speedFactor);
                    //   console.log(i);
        
                    if (i >= fill) {
                        clearInterval(interval);
                        setProg(`${num}%`)  // just a double check as final % number can increase a bit buggy
                        setBusy(false);
                    } else if (i === 112) {
                        setProg("100%");
                    } else {
                        setProg(`${Math.floor((number/340*100)-(+prog.split("%")[0])-1)*-1}%`);
                        // prog.style.strokeDashoffset=`${i}`; 
                        setLength(i);   
                    }

                // incrementing
                } else {

                    i=i-(2*speedFactor);
                    number=number+(2*speedFactor);
                    //   console.log(i);
        
                    if (i <= fill) {
                        clearInterval(interval);
                        setProg(`${num}%`)
                        setBusy(false);
                    }
                    else if (i < 112) {
                        setProg("100%");
                    } else {
                        setProg(`${Math.floor((number/340*100)+(+prog.split("%")[0])-1)}%`);
                        // prog.style.strokeDashoffset=`${i}`; 
                        setLength(i);   
                    }
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
                        
                        {prog === "100%" ? (
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
            className="rotate-[130deg]" style={{strokeDashoffset: length  }}
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
                <button onClick={(e)=>changeProgress(100,e)} disabled={busy}
                    className="px-4 py-1 rounded-xl bg-gradient-to-r from-[#387ca4] to-[#39d0b7b4]
                    hover:from-[#245069] hover:to-[#258c7bb4]">
                    100%
                </button>
                <button onClick={(e)=>changeProgress(75,e)} disabled={busy}
                    className="px-4 py-1 rounded-xl bg-gradient-to-r from-[#387ca4] to-[#39d0b7b4]
                    hover:from-[#245069] hover:to-[#258c7bb4]">
                    75%
                </button>
                <button onClick={(e)=>changeProgress(50,e)} disabled={busy}
                    className= "px-4 py-1 rounded-xl bg-gradient-to-r from-[#387ca4] to-[#39d0b7b4] hover:from-[#245069] hover:to-[#258c7bb4]">
                    50%
                </button>
                <button onClick={(e)=>changeProgress(25,e)} disabled={busy}
                    className="px-4 py-1 rounded-xl bg-gradient-to-r from-[#387ca4] to-[#39d0b7b4] hover:from-[#245069] hover:to-[#258c7bb4]">
                    25%
                </button>
            </div>


        </div>

    </section>
  )
}

export default CircularProgress