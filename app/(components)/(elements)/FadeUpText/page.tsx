"use client"
import React, { useState } from 'react'
import { AnimatedText } from './AnimatedText'

const page = () => {

    const dummyTexts = ["Hello World", "This is a test", "This is a test", "This is a test", "This is a test", "This is a test"]
    const [index, setIndex] = useState(0)
    const [text, setText] = useState(dummyTexts[index])

    setTimeout(() => {
        setIndex(prev=>{
            // if prev is less than the length of dummyTexts, increment prev, else set prev to 0
            return (prev < dummyTexts.length-1) ? prev+1 : 0
        })
        setText(dummyTexts[index])
    }, 1000)

  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='px-4 py-2 bg-black/90 rounded-lg border border-white/20 w-[300px] text-center'>  
            <AnimatedText text={text} />
        </div>
    </div>
  )
}

export default page
