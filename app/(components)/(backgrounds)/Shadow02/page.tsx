
import React from 'react'


import "./Shadow02.css"

const ShadowBg02 = () => {
  return (
    <div className="FullScreen_CenteredFlex relative overflow-hidden bg-[#020812]
    ">
         <div className="absolute w-[80%] h-[80%] radialCircle_ShadowBg02
        bg-gradient-radial from-[#4a3ea749] to-70%  to-transparent"/>

            <h1 className="text-5xl z-[1] text-[#ffffffe9] uppercase
            ">Animating background</h1>
    
            
    </div>
  )
}

export default ShadowBg02