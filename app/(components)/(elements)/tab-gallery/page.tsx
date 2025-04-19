import React from 'react'
import TabGallery from './TabGallery'
const page = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center relative bg-black'>
      <div className='p-10 border rounded-lg border-white/0 bg-[#f0f0f00a]'>
        <TabGallery />
      </div>
    </div>
  )
}

export default page
