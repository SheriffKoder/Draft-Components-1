import React from 'react'

const GradientCornerBorder = () => {
  return (

        <div className='relative h-full w-full group z-[0]'>

            <div className='absolute top-[0px] left-[0px] w-full h-full 
            border border-red-500 rounded-lg'></div>
            
            <div className='absolute top-[0px] left-[0px] w-full h-full'
            style={{
                background: 'linear-gradient(135deg, transparent 0%, rgba(0,0,0,255) 40%)',
            }}
            >

            </div>
        </div>

  )
}

export default GradientCornerBorder
