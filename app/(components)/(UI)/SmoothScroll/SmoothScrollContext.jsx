"use client";

import React from 'react'
import { useEffect, useState, createContext, useContext } from 'react';
import Lenis from 'lenis';

// this component allows to have server components nested within it as children

const SmoothScrollerContext = createContext();

export const useSmoothScroller = () => useContext(SmoothScrollerContext)

export default function ScrollContext ({children}) {
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

  },[]);

  return (
    <SmoothScrollerContext.Provider value={lenisRef}>
      {children}
    </SmoothScrollerContext.Provider>
  )
}

