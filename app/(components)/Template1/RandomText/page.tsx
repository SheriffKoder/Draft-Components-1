'use client'
import React, { useState, useEffect } from 'react'
import RandomTextAnimator from './RandomTextAnimator'
const page = () => {

    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsActive(false)
        }, 5000)
    }, [])

  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <RandomTextAnimator
        children="Hello World"
        isActive={isActive}
        duration={1000}
        interval={100}
        className="text-4xl font-bold"
      />

    </div>
  )
}

export default page
