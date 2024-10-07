"use client"
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import React, { useEffect, useRef } from 'react'

const AnimatedNumbers = ({value}:{value:number}) => {

  const ref = useRef<null | HTMLSpanElement>(null);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000});         // takes initial value, config object
  const isInView = useInView(ref);

  useEffect(()=> {
    if(isInView) {
      motionValue.set(value);
    }
  },[isInView, value, motionValue]);

  useEffect(()=> {
    springValue.on("change", (latest)=> {
      // console.log(latest);
      if (ref.current && +latest.toFixed(0) <= value) {  // if the component is mounted
        ref.current.textContent = latest.toFixed(0);     // remove the decimals
      }
    })
  }, [springValue, value]);

  return <span ref={ref}></span>
}


const IncreasingNumbers = () => {
  return (
    <main className="FullScreen_CenteredFlex font-bold text-[10rem]">
      <span className='flex'>
        <span className="w-[13rem] text-right">
          <AnimatedNumbers value={50}/>
        </span>
        +
      </span>
    </main>
  )
}

export default IncreasingNumbers