import React from 'react'
import ImageSlider from "./slider2"

const formImages = [
    "/images/1.png",
    "/images/2.png",
    "/images/3.png",

  ];

const page = () => {
  return (
    <div className='h-[100vh] flex items-center justify-center'>

        <div className='w-[300px] h-[500px] border relative'>


        {/* <div className="absolute px-[2rem] pt-[1rem] z-[1] w-full h-full"
            style={{
              background: "linear-gradient(160deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 21%, rgba(255,255,255,0) 100%)"
            }}>
            <h1 className="heading2">Header</h1>
            <p className="f_rale text-[min(calc(0.75rem+2vw),35px) vp5:text-[min(calc(0.75rem+1vw),35px)] ">Paragraph</p>
          </div> */}

        <ImageSlider images={formImages} />

        </div>
    </div>
  )
}

export default page
