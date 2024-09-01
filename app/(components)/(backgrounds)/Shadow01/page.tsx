
import React from 'react'


const ShadowBg01 = () => {
  return (
    <div className="FullScreen_CenteredFlex relative overflow-hidden">

        <div className="absolute w-full h-full
        bg-gradient-radial from-[#4a3ea7ce] to-70% to-transparent mt-[-200px]"/>
        <div className="absolute w-[100%] h-[100%] 
        bg-gradient-to-t from-transparent to-60% to-[#020812]"/>

        <h1 className='text-[5rem] mt-[3rem] z-[1] opacity-90'>GREAT WEBSITES</h1>
    </div>
  )
}

export default ShadowBg01