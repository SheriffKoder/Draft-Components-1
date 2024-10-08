import Link from 'next/link';
import React from 'react'
import { motion } from 'framer-motion';

/*
work on the html/css
then add the variants, it will operate by itself
as the variants will detect the state and apply

the custom framer property based on index for link delay animation

3:42

*/


export const menuSlide = {
    initial: {
        x: "100%"
    },
    enter: {
        x: "0%",
        transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
        x: "100%",
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
            title: "Work",
            href: "/"
        },
        {
            title: "About",
            href: "/"
        },
        {
            title: "Contact",
            href: "/"
        },
    ];

  return (
    <motion.div 
    variants={menuSlide} animate="enter" exit="exit" initial="initial"
    className='menu fixed top-0 right-0 h-[100vh] bg-[rgb(41,41,41)] text-white'>
        <div className='body h-full p-[100px] flex flex-col justify-between'>

            <div className='nav flex flex-col text-[56px] gap-[12px] mt-[80px] font-[300]'>
                <div className='text-[rgb(153,153,153)] text-base uppercase border-b border-b-[rgb(153,153,153)] mb-[40px]'>
                    <p>Navigation</p>
                </div>
                {
                    // custom is a framer property relevant to the element's index & put in the variant definition
                    // custom for the animation of delaying each link
                    links.map((link,index)=>(
                        <motion.div key={link.title} 
                        custom={index} variants={slide} animate="enter" exit="exit" initial="initial">
                            <Link href={link.href}>{link.title}</Link>
                        </motion.div>
                    ))
                }
            </div>

            <div className='flex justify-between gap-[40px] text-[12px]'>
                <a>Awwwards</a>
                <a>Instagram</a>
                <a>Dribble</a>
                <a>LinkedIn</a>
            </div>
        </div>
    </motion.div>
  )
}

export default OliverNav