import React from 'react'
import { HighlightText } from './HighlightText'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <HighlightText text="Hello, world! and so and we can also world of all the things" highlight="wo" />
    </div>
  )
}

export default page
