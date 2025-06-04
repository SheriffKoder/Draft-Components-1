import React from 'react'
import MagneticButton from './magnetic'
const page = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <MagneticButton>
            <h1 className='bg-red-500 rounded-lg p-2'>Magnetic Buttons</h1>
        </MagneticButton>
    </div>
  )
}

export default page
