// https://lottiefiles.com/blog/working-with-lottie-animations/how-to-use-lottie-in-react-app
// https://lottiefiles.com/free-animation/checkmark-animation-dJfka3ygAI
// https://www.youtube.com/watch?app=desktop&v=H2HYccAGR00

"use client"
import React, { useState, useRef } from 'react'
import "./circularProgress.css"

import Lottie from "react-lottie";
import animationData from "./animation-mark.json"

// if you will use a small circle use in svg r value and in the fill add value (i100%End-iDesired100%End)

const CircularProgress = () => {

    const [prog, setProg] = useState<string>("100%");
    const [length, setLength] = useState<number>(95);
    const [busy, setBusy] = useState(false);

    // allow to clear the timer interval and set a new one when clicking the buttons, make sure to use window.setInterval
    const timerRef = useRef<number>(0);

    // for the lottie animating icon
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice" 
        }
    };

    // scroll bar handler
    const circularProgress_scrollTrack = (e:React.MouseEvent<HTMLDivElement>)=> {
        
        let currentTrack = e.pageX - e.currentTarget.offsetLeft;    // mouse position relevant to the div
        clearInterval(timerRef.current);

        // Number %
        // relate the progress bar boundary (338) to this track start/end lengths
        // 338 is 450 - 112, 450 is the value given by css and 112 was to shift the progress bar start (custom start position)
        let x = (currentTrack/338)*100;
        let currentProgress = (Math.round(x * 100) / 100).toFixed(0);
        setProg(`${currentProgress}%`);

        // Circular progress %
        // relate to the progress bar boundary again
        let progress = ((currentTrack/(338)*338)-338-100-10)*-1;
        // setLength((progress));
        // -15 is just for end position adjustment
        (+currentProgress > 95) ? setLength(progress-15) : setLength((progress));;   



        if ((+currentProgress < 4 && +currentProgress !== 0) ) {
            setLength(449);
        }   
    };


    // buttons handler
    const changeProgress = (num:number) => {

        // align the progress to be a little backwards on 
        // let factor = (((num-50+50)*((num/100)*(num/100)*(num/100)*(num/100))/2))+2;
        // num/100 >= 0.5 ? factor = 20*(num/100) : 0;

        // cut like filled bar for un-complete shape at 100%, with a rotation added in css to shift the start position
        let factor = (100*num/100);

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
            timerRef.current = window.setInterval(()=> {

                // gradual speed change depending on the current i/progress
                let speedFactor = (125/i)*(300/i);

                // Backward progress / decrementing
                if (num < +prog.split("%")[0]) {

                    i=i+(2*speedFactor);
                    number=number+(2*speedFactor);
                    //   console.log(i);
        
                    if (i >= fill) {
                        clearInterval(timerRef.current);
                        setProg(`${num}%`)  // just a double check as final % number can increase a bit buggy
                        setBusy(false);
                    } else {
                        setProg(`${Math.floor((number/340*100)-(+prog.split("%")[0])-1)*-1}%`);
                        // prog.style.strokeDashoffset=`${i}`; 
                        setLength(i);   
                    }

                    if (i === 112) {
                        setProg("100%");
                    }

                // Forward progress / incrementing
                } else {

                    i=i-(2*speedFactor);
                    number=number+(2*speedFactor);
                    //   console.log(i);
        
                    if (i <= fill) {
                        clearInterval(timerRef.current);
                        setProg(`${num}%`)
                        setBusy(false);
                    

                    } else {
                        const displayedNumber = Math.floor((number/340*100)+(+prog.split("%")[0])-1);
                        // condition to avoid displaying more than 100%
                        if (displayedNumber <= 100) setProg(`${displayedNumber}%`);
                        // prog.style.strokeDashoffset=`${i}`; 
                        //-5 just for alignment
                        (displayedNumber > 95) ? setLength(i-5) : setLength(i);   
                    }

                    if (i < 110) {
                        setProg("100%");
                    }
                }

            }, 10);

        }
    }


  return (
    <section className="FullScreen_CenteredFlex ambientBackground">
        <div className="circularProgress_skill">
            <div className="circularProgress_outer">
                <div className="circularProgress_inner">
                    <div id="circularProgress_number">
                        
                        {+prog.split("%")[0] >= 99 ? 
                        (
                            <Lottie 
                            options={defaultOptions}
                            height={120}
                            width={120}
                            />
                        ): 
                            prog
                        }
                    </div>
                </div>
            </div>

            {/* takes length between 112(100%) and 450 (0%) */}
            <svg id="circularProgress_svg" 
            className="rotate-[125deg]" style={{strokeDashoffset: length  }}
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
        </div>

        <div className='flex flex-row items-center justify-center gap-4 mt-12'>

                <button onClick={(e)=>{clearInterval(timerRef.current); changeProgress(1); }}
                    className="w-[70px] px-4 py-1 rounded-xl bg-[#2a9b9b] hover:bg-[#9733EE] transition-colors duration-500">
                    1%
                </button>

                <button onClick={(e)=>{clearInterval(timerRef.current); changeProgress(25); }}
                    className="w-[70px] px-4 py-1 rounded-xl bg-[#2a9b9b] hover:bg-[#9733EE] transition-colors duration-500">
                    25%
                </button>
                
                <button onClick={(e)=>{clearInterval(timerRef.current); changeProgress(50); }}
                    className= "w-[70px] px-4 py-1 rounded-xl bg-[#2a9b9b] hover:bg-[#9733EE] transition-colors duration-500">
                    50%
                </button>
                
                <button onClick={(e)=>{clearInterval(timerRef.current); changeProgress(75); }}
                    className="w-[70px] px-4 py-1 rounded-xl bg-[#2a9b9b] hover:bg-[#9733EE] transition-colors duration-500">
                    75%
                </button>

                <button onClick={(e)=>{clearInterval(timerRef.current); changeProgress(100); }}
                    className="w-[70px] px-4 py-1 rounded-xl bg-[#2a9b9b] hover:bg-[#9733EE] transition-colors duration-500">
                    100%
                </button>



        </div>

        <div className='flex flex-col gap-4 mt-8'>
                <div onMouseMove={circularProgress_scrollTrack}  className={`w-[calc(450px-112px)] 
                h-[20px] rounded-full bg-slate-500 overflow-hidden`}>
                <div style={{width: `${prog}`, borderRadius: `${+prog.split("%")[0]/1.5}px`}}
                className={`
                h-full cursor-pointer bg-gradient-to-r from-[#9733EE] to-[#39d0b7b4]
                blur-sm`}>
                    
                </div>

                </div>
        </div>

    </section>
  )
}

export default CircularProgress