"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'

import "./AppleGradButton.scss"


// From Vercel


const Page = () => {




  return (
    <div className='w-full h-[100vh] flex items-center justify-center
    flex-col
    '>
      <button className='GradBorderButton_wrapper'>
          <span className='GradBorderButton'>
          </span>
          <p className='GradBorderButton_text'>
                Collaborate on a Pro Trial
          </p>
      </button>


        
    </div>
  )
}

export default Page