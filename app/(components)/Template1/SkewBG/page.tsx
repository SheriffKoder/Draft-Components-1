import React from 'react'

const page = () => {
  return (
    <div className='w-full h-screen bg-black flex flex-col justify-center items-center relative'>
      

      <div
      className={`h-[200px] w-[200px] group relative flex items-center justify-center`}>
      
      
      <div className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[calc(100%+30px)] h-[calc(100%+15px)]
       transition-all duration-300 ease-in-out group1-hover:w-[10px] group1-hover:opacity-50
          text-white border-transparent bg-white
      `} style={{ transform: 'translateX(-50%) translateY(-50%) skewX(-12deg)' }}></div> 



      <span 
        className={`absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-full group-hover:pb-2 group-hover:underline transition-all duration-300 ease-in-out relative z-10`}
        style={{ color: '#000000' }}
      >
        Text
      </span>


    </div>
    
    </div>
  )
}

export default page
