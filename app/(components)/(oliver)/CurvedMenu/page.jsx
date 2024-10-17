"use client"
// https://www.youtube.com/watch?v=NOJCt7qyh9c


import React, {useState, useRef} from 'react'
import Button from './Button'
import OliverNav from "./Nav"
import { func } from 'prop-types';
import { AnimatePresence } from 'framer-motion';

// exit animation
import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';



const CurvedMenu = () => {
  const [isActive, setIsActive] = useState(false);

  function changeState () { 
    setIsActive(!isActive);
  }

  // exit animation
  const burger = useRef(null);

  useLayoutEffect(()=> {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(burger.current, {
          scrollTrigger: {
              trigger: document.documentElement,
              start: 0,
              end: window.innerHeight,
              onLeave: ()=>{gsap.to(burger.current, {scale:1, opacity: 1})},
              onEnterBack: ()=>{gsap.to(burger.current, {opacity:0,}); setIsActive(false)}
          }
      })
  },[]);



  return (
    <div className="flex items-center justify-center scale-0 fixed top-0 right-0" ref={burger}>

        {/* this will allow to exit the menu with the transition animation applied */}
        <AnimatePresence mode="wait">
          {
            isActive && <OliverNav/>
          }
        </AnimatePresence>
        
        <Button isActive={isActive} changeState={changeState}/>

    </div>
  )
}

export default CurvedMenu