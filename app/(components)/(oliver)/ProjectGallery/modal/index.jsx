import React, {useEffect, useRef} from 'react'
// import styles from "./style.module.css";
import Image from 'next/image';

import {motion} from "framer-motion";
import gsap from "gsap";

// framer-motion enter-exit animation
const scaleAnimation = {
    initial: {scale: 0, x: "-50%", y: "-50%"},
    open: {scale: 1, x: "-50%", y: "-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}}, // easeInOutQuart
    closed: {scale: 0, x: "-50%", y: "-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}} // easeInCubic
}

// to use framer-motion - view the modal
// 1. scaleAnimation
// 2. motion.div
// 3.variants

/*




*/


const Modal = ({projects, modal}) => {

    const {active, index} = modal;

    // GSAP mouse track
    const container = useRef(null);
    const cursor = useRef(null);
    const cursorLabel = useRef(null);


    useEffect(()=> {
        const MoveContainerX = gsap.quickTo(container.current, "left", {duration: 0.8, ease: "power3"});
        const MoveContainerY = gsap.quickTo(container.current, "top", {duration: 0.8, ease: "power3"});

        // for the cursor just repeat the steps for the container
        // adjust the duration to have the delay effect
        const MoveCursorX = gsap.quickTo(cursor.current, "left", {duration: 0.5, ease: "power3"});
        const MoveCursorY = gsap.quickTo(cursor.current, "top", {duration: 0.5, ease: "power3"});

        const MoveCursorLabelX = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"});
        const MoveCursorLabelY = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"});


        window.addEventListener("mousemove", (e)=> {
            const {clientX, clientY} = e;
            MoveContainerX(clientX);
            MoveContainerY(clientY);

            MoveCursorX(clientX);
            MoveCursorY(clientY);

            MoveCursorLabelX(clientX);
            MoveCursorLabelY(clientY);

        })

    },[]);


  return (
    <>
        {/* /* this will show all the images in col and hide all images but the first with overflow-hidden 
        pointer events none to remove the hover conflict between the window.eventListener and index.js mouse leave*/}
        <motion.div className="h-[350px] w-[400px] flex items-center justify-center absolute overflow-hidden
        pointer-events-none"
        variants={scaleAnimation}
        initial={"initial"}
        animate={active ? "open" : "closed"}
        ref={container}
        >
            
        {/* using translate Y we can change the displayed images that are already hidden by the overflow
        transform: translateY(-300%);
        absolute to allow the images to change 
        added style transition to use 'top' 
        easeInOutQuart */}
            <div className="w-full h-full absolute"
            style={{top: index * -100 + "%",
                transition: 'top 0.5s cubic-bezier(0.76, 0, 0.24, 1)'
            }}>
                {
                    projects.map((project, index) => {
                        const {src, color} = project;

                        // this css will make the image centered and have the color as a border like
                        return <div className="relative h-[100%] flex items-center justify-center"
                        style={{backgroundColor: color}}
                        key={`modal_${index}`}
                        >
                            <Image
                            src={`/OliverImages/ProjectGallery/${src}`}
                            width={300}
                            height={0}
                            alt="image"
                            style={{height:"auto"}}
                            />
                        </div>
                    })
                }
            </div>
        </motion.div>
        
        <motion.div 
        ref={cursor} 
        className="cursor w-[80px] h-[80px] bg-[#455ce9] absolute pointer-events-none rounded-full flex items-center justify-center text-white"
        variants={scaleAnimation}
        initial={"initial"}
        animate={active ? "open" : "closed"}
        >
        </motion.div>
        
        <motion.div 
        ref={cursorLabel} 
        className="cursorLabel w-[80px] h-[80px] bg-transparent absolute pointer-events-none rounded-full flex items-center justify-center text-white"
        variants={scaleAnimation}
        initial={"initial"}
        animate={active ? "open" : "closed"}
        >
            View
        </motion.div>
    </>
  )
}

export default Modal