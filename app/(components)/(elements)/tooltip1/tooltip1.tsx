import React from 'react'

const Tooltip1 = () => {
  return (
    <div className=" group absolute
    top-0 left-0 right-0 bottom-0 border-2 border-red-500">
            <span className="absolute 
            invisible group-hover:visible group-hover:translate-y-0 translate-y-[5px]
            group-hover:bg-white/10 
            bg-black/80 text-[#00D1FF] px-2 py-1 rounded-md 
            -top-8 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap
            cursor-pointer transition-all duration-100 ease-in">
            Hello
            </span>
        </div>
  )
}

export default Tooltip1
