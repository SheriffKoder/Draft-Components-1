import React from 'react'
import Image from 'next/image'
import './GradienButtonApple.css'

const MISCard = () => {




  return (

    <div className='h-[125%] w-[125%] flex items-center justify-center
    absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
            <div className={`h-[90%] w-[97%] relative`}>
                <div className={`
                
                flex flex-col p-[0px] md:p-[2rem] gap-[1.5rem] text-white
                CardStyle_text border-transparent bg-black h-full GradBorderButton_text
                `}
                style={{
                    borderRadius: '15px',
                }}>

                {/* Adjust this style position and top/bottom to have the gradient aligned right with the black bg */}
                <div className='GradBorderButton2 z-[-1]'></div>

                {/* Content */}
                <div className='w-[80%] h-[40%] relative opacity-20 mb-[1.5rem] flex justify-center items-center'>
                  <Image src="/mainlogo.png" alt="company logo" className='invert' height={100} width={100}></Image>
                  
                  <p className='absolute bottom-[-3rem] w-full text-center
                  Paragraph2 scale-150 font-semibold uppercase tracking-wider'>
                    Powered
                  </p>

                </div>

                </div>
            </div>
        </div>

        
  )
}

export default MISCard