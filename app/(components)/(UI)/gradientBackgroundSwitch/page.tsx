"use client"
import { animate, motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import React from 'react'

import "./gradientBackgroundSwitch.css";
/*
button onClick={handleClick}
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {

const color = e.currentTarget.getAttribute("data-color") as string;


useMotionValue, value FM can work with and then we can animate
and use a motion.div to use that value



*/
const GradientBackgroundSwitch = () => {

    // value framer-motion can work with and then we can animate
    // and use a motion.div to use that value
    const primary = useMotionValue("102 65 169");
    const secondary = useMotionValue("196 26 105");

    // css normal template, primary/muted colors
    // to put a motion value into a string
    const background = useMotionTemplate`linear-gradient(to bottom right, rgb(${primary}), rgb(${secondary})`

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {

        const newColor = e.currentTarget.getAttribute("data-color") as string;
        const newSubColor = e.currentTarget.getAttribute("data-color2") as string;

        // now this is just to update the Tailwind CSS property for other elements using it
        const root = document.documentElement;
        root.style.setProperty("--primary", newColor);

        // animate from the primary to the newColor in 2sec
        animate(primary, newColor, {duration: 2});
        animate(secondary, newSubColor, {duration: 2});

    }


  return (
    <motion.section className="FullScreen_CenteredFlex 
    " style={{background}}>
        <h1 className="text-3xl font-bold">GradientBackgroundSwitch</h1>
        <div className="container">
            <div className="mt-4 flex justify-center gap-3">
                <button
                onClick={handleClick}
                data-color="88 202 155" //custom attribute
                data-color2="196 26 105"
                className="rounded-lg border px-3 py-1">
                    Green
                </button>

                <button
                onClick={handleClick}
                data-color="196 26 105"
                data-color2="102 65 169"
                className="rounded-lg border px-3 py-1">
                    Pink
                </button>


                <button
                onClick={handleClick}
                data-color="102 65 169"
                data-color2="88 202 155"
                className="rounded-lg border px-3 py-1">
                    Purple
                </button>


            </div>

        </div>
    </motion.section>
  )
}

export default GradientBackgroundSwitch