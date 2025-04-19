import React from 'react'
import ServicesCards from './ServicesCards'

const page = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center relative bg-gray-900'>
        <ServicesCards isHeadingVisible={true} />
    </div>
  )
}

export default page
