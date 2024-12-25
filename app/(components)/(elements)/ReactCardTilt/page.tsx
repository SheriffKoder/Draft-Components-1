"use client"
import React from 'react'
import Image from 'next/image'
import Tilt from 'react-parallax-tilt';

import "./tilt.css"
// https://mkosir.github.io/react-parallax-tilt/?path=/story/react-parallax-tilt--parallax-effect-img

const page = () => {
  return (
    <div className='flex items-center justify-center h-[100vh]'>
        {/* dark card - parallax google */}
        <Tilt perspective={3000} className='accent1-dark-bg-grad tilt-parallax-effect box_shadow_dark_main
        section2DarkCard opacity-1 rounded-[10px] flex 
        flex-col  w-[min(calc(200px+20vw),400px)] 
          h-[min(calc(200px+20vw),400px)] mx-auto   p-[2rem]'>

          <div className=' tilt-inner-element2 text-white 
          heading2 flex-col'>

            <h3 className='mt-[-1rem] text_shadow_1'>
              Header
            </h3>

            <p className='paragraph1'>
            Paragraph
            </p>

          </div>

            {/* google  */}
            <div className='tilt-inner-element flex-1 flex flex-col px-[1rem]
            accent1-light-bgg m-[1rem] rounded-[10px] items-center justify-center'>
                
                <div className='flex-c-c'>
                  <div className='w-[200px] h-[70px] relative'>
                    <Image fill src="/images/google-white-logo.png" alt="google reviews logo"
                    className='grayscale brightness-[2.5]'></Image>
                  </div>

                </div>

                <div className='w-[200px] h-[40px] mt-[0.5rem] flex-c-c relative'>
                <Image fill src="/images/stars.png" alt="google reviews logo"
                    className='grayscale brightness-[2.5]'></Image>
                </div>

                <p className='text-sm opacity-80 font-light font-sans'>Google Certified rating</p>

            </div>
        </Tilt>
    </div>
  )
}

export default page
