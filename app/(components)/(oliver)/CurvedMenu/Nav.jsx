import Link from 'next/link';
import React from 'react'
import { motion } from 'framer-motion';
import Curve from "./Curve";
/*
work on the html/css
then add the variants, it will operate by itself
as the variants will detect the state and apply

the custom framer property based on index for link delay animation

3:42

*/

// the calc function for the curve step, so the menu can extend more to hide the animating out curve
export const menuSlide = {
    initial: {
        x: "calc(100% + 100px)"
    },
    enter: {
        x: "0%",
        transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
        x: "calc(100% + 100px)",
        transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1] }

    }
}


export const slide = {
    initial: {
        x: "80px"
    },
    enter: (i) => ({
        x: "0px",
        transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 * i}

    }),
    exit: (i) => ({
        x: "80px",
        transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 * i }

    })
}

const OliverNav = () => {
    
    const links = [
        {
            title: "Home",
            href: "/"
        },
        {
            title: "About",
            href: "/"
        },
        {
            title: "Albums",
            href: "/"
        },
        {
            title: "Concerts",
            href: "/"
        },
    ];

  return (
    <motion.div 
    variants={menuSlide} animate="enter" exit="exit" initial="initial"
    className='menu fixed top-0 right-0 h-[100vh] bg-[rgb(41,41,41)] text-white'>
        <div className='body h-full flex flex-col justify-between'>

            <div className='nav flex flex-col text-[56px] gap-[12px] mt-[80px] font-[300]
            '>
                <div className='m-[100px] text-[rgb(153,153,153)] text-base uppercase border-b border-b-[rgb(153,153,153)] mb-[40px]'>
                    <p>Navigation</p>
                </div>
                {
                    // custom is a framer property relevant to the element's index & put in the variant definition
                    // custom for the animation of delaying each link
                    links.map((link,index)=>(
                        <motion.div key={link.title} 
                        className='w-full hover:text-blue-400 px-[100px]'
                        custom={index} variants={slide} animate="enter" exit="exit" initial="initial">
                            <Link className="cursor-pointer " href={link.href}>{link.title}</Link>
                        </motion.div>
                    ))
                }
            </div>

            <div className='flex justify-between gap-[40px] text-[12px] px-[100px] pb-[100px]'>
                <a className="cursor-pointer hover:text-blue-400">Spotify</a>
                <a className="cursor-pointer hover:text-blue-400 text-nowrap">Apple Music</a>
                <a className="cursor-pointer hover:text-blue-400">Youtube</a>
                <a className="cursor-pointer hover:text-blue-400">Instagram</a>
            </div>
        </div>
        <Curve/>
    </motion.div>
  )
}

export default OliverNav