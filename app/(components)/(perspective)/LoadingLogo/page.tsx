"use client"
import React, { useEffect, useState } from 'react'
import classes from "./page.module.css"
import SecondaryLogo from '@/components/LoadingLogo/LogoSVGs/SecondaryLogo'
import MainLogo from '@/components/LoadingLogo/LogoSVGs/MainLogo'
import MainCube from '@/components/LoadingLogo/MainCube'

import "./LoadingLogo.css";

const LoadingLogo = () => {
  
  const [prog, setProg] = useState(0);


  useEffect(()=> {
      let i=0;
      const interval = setInterval(()=> {
        i=i+1;

        if (i === 100) {
          clearInterval(interval);
        }

        setProg(i);
      }, 50);



  },[]);


  return (
    <main className="FullScreen_CenteredFlex gap-2">
      <MainCube />
      <p className="mt-3 text-center text-white">Loading...</p>

      <div className="h-2 w-[100px] bg-gray-50 mt-1 rounded-full">
        
        <div className={`h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        ${+prog >= 98 ? "rounded-full" : "rounded-l-full" }
        `}
        style={{width: prog+"px"}}/>
      </div>
          
    </main>    
    
  )
}

export default LoadingLogo