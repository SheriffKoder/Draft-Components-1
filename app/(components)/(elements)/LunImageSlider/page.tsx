"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'

import "./LunImage.scss"

const Page = () => {

  function changeImageForward () {
    let slider = document.querySelector(".LunSlider");
    if (slider) {
      let img = slider.querySelector("img:first-child");
      if (img) slider.append(img);
    }
  }
    
  function changeImageBackward () {
    let slider = document.querySelector(".LunSlider");
    if (slider) {
      let img = slider.querySelector("img:last-child");
      if (img) slider.prepend(img);
    }
  }



  return (
    <div className='w-full h-[100vh] flex items-center justify-center
    flex-col
    '>
        <div className="LunSlider">
            <Image 
            src="https://picsum.photos/600/600?random=1"
            height={250}
            width={250}
            alt="img"/>

            <Image 
            src="https://picsum.photos/600/600?random=2"
            height={250}
            width={250}
            alt="img"/>

            <Image 
            src="https://picsum.photos/600/600?random=3"
            height={250}
            width={250}
            alt="img"/>

        </div>
        <div className='arrows flex flex-row gap-2'>
            
            <button id="prev"
            onClick={changeImageBackward}>
              prev
            </button>
            
            <button id="next"
            onClick={changeImageForward}>
              next
            </button>

        </div>
    </div>
  )
}

export default Page