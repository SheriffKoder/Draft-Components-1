"use client"
import React, { useEffect } from 'react'
import {useSmoothScroller} from "./SmoothScrollContext"

// log lenis properties
// import this as a component normally

const SmoothScrollInsideComponent = () => {
const scrollerRef = useSmoothScroller();

useEffect(()=> {
    scrollerRef.on("scroll", e => {
        console.log(e);
    })

// runs when lenis mounts
}, [scrollerRef]);


  return (
    <div>SmoothScrollInsideComponent</div>
  )
}

export default SmoothScrollInsideComponent