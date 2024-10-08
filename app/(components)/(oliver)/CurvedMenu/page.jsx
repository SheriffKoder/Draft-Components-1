"use client"

import React, {useState} from 'react'
import Button from './Button'
import OliverNav from "./Nav"
import { func } from 'prop-types';
import { AnimatePresence } from 'framer-motion';

const CurvedMenu = () => {
  const [isActive, setIsActive] = useState(false);

  function changeState () { 
    setIsActive(!isActive);
  }



  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-white">

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