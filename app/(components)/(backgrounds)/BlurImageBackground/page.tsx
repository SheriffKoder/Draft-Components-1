import React from 'react'

import "./BlurImageBackground.css";

const page = () => {
  return (
    <div
    className={`antialiased relative`}
  >

      {/* blur */}
      <div className="absolute myMainImage w-full h-full dark:brightness-[1] transition-all duration-75">
        <div className="absolute z-0 w-full h-full myMainBlur1"></div>
        <div className="absolute z-1 w-full h-full myMainBlur2"></div>
      </div>

      <main className="relative">
        <section className='h-[100vh] border flex flex-col items-center justify-center'>
            Hero 1
        </section>
        <section className='h-[100vh] border flex flex-col items-center justify-center'>
            Hero 2
        </section>
      </main>



  </div>
  )
}

export default page