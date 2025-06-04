import React from 'react'
import PressIndicatorText from './press-indicator-text'

const page = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
        <PressIndicatorText show={true} buttonClicked={false} />
    </div>
  )
}

export default page
