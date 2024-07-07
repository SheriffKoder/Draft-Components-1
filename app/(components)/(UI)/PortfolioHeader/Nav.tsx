"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import "./Nav.css";

const Nav = () => {

    // get the current visited page as a string to set its link to .active class
    const path = usePathname().split("/")[1];

    // change the src of the logo image on hover
    const [iconSrc, setIconSrc] = useState("/icons/ss-w-logo.png");


  return (
    // id to give css styling
    <nav className="sticky top-0 w-full h-[3rem] z-[10]
    " id="main_navigation">

        {/* thin line at the top of the nav with background animation */}
        <div className="h-[2px] w-full gradient_nav_animation
        bg-gradient-to-r from-[#5398bf] from-20% via-[#39d0b753] via-60% to-transparent"/>

        <div className="h-full flex flex-row items-center justify-between flex-warp
        mt-1 pr-4
        "
        >

            {/* the logo */}
            <span className="pl-6"
            onMouseEnter={()=>{setIconSrc("/icons/ss-c-logo.png")}}
            onMouseLeave={()=>{setIconSrc("/icons/ss-w-logo.png")}}>
                <Link href="/">
                <Image src={iconSrc} height={22} width={22} alt="sheriffkoder.com website's logo">

                </Image>
                </Link>
            </span>

     


            {/* list or a menu button */}
            <span className="pr-4">
                <ul className="flex flex-row gap-[min(5vw,3rem)] uppercase text-xs font-semibold">
                    <li className={`py-4 ${path === "" ? "active no_select" : "gradient_text_hover_1"}
                    `}>
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li className={`py-4 ${path === "about" ? "active no_select" : "gradient_text_hover_1"}
                    `}>
                    
                        <Link href="/about">
                            About
                        </Link>
                    </li>
                    <li className={` py-4 ${path === "projects" ? "active no_select" : "gradient_text_hover_1"}
                    `}>

                        <Link href="/projects">
                            Projects
                        </Link>
                    </li>
                    <li className={`py-4 ${path === "contact" ? "no_select text-[#d8d8d8]" : null}
                    `}>
                        <Link className="gradientRoundButton py-[0.1rem] px-3
                        focus:opacity-90 hover:opacity-90" 
                        
                        href="/contact">
                            Contact
                        </Link>
                    </li>
                    

                </ul>
                
            </span>

        </div>
    </nav>
  )
}

export default Nav;
