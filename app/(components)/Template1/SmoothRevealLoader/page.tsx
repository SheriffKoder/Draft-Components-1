import React from 'react'
import Loader from './Loader copy'
import LoaderComplex from './Loader'

const page = () => {
  return (
    <div className='h-screen w-full bg-black flex flex-col justify-center items-center'>
      <Loader />
      {/* <LoaderComplex /> */}
    </div>
  )
}

export default page
