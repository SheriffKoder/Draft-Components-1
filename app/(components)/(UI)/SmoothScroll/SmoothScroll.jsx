"use client";

import React from 'react'
import { useEffect, useState } from 'react';
import Lenis from 'lenis';

// this component will induce smooth scroll on the page

const SmoothScroll = () => {
  const [lenisRef, setLenisRef]= useState(null);
  const [rafState, setRafState] = useState(null);

  useEffect(()=> {
    const scroller = new Lenis();
    let rf;

    function raf(time) {
      scroller.raf(time);
      requestAnimationFrame(raf);
    }

    rf = requestAnimationFrame(raf);
    setRafState(rf);
    setLenisRef(scroller);

    // when the component unmounts, destroy the scroll and cancel the animation
    return () => {
      if (lenisRef) {
        cancelAnimationFrame(rafState);
        lenisRef.destroy();  
      }
    }

  })

  return (
    <section className='h-[100vh] border flex flex-col items-center justify-center'>

      
      SmoothScroll
    </section>
  )
}

export default SmoothScroll