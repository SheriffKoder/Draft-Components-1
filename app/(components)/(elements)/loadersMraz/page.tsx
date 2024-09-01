
import React from 'react'
import "./loadersMraz.css"
// @https://x.com/davidm_ml

const LoaderMraz = () => {
  return (
    <div className="FullScreen_CenteredFlex relative overflow-hidden">

        <div className="absolute w-[100%] h-[100%] radialCircle_ShadowBg02
        bg-gradient-radial from-[#6a58ed49] to-70%  to-transparent"/>

            <div className="flex flex-row gap-16">
                <div className="MrazloaderContainer">
                    <div className="Mrazloader-1"></div>
                </div>
                <div className="MrazloaderContainer">
                    <div className="Mrazloader-2"></div>
                </div>
                <div className="MrazloaderContainer">
                    <div className="Mrazlds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className="MrazloaderContainer">
                    <div className="Mrazloader-3"></div>
                </div>

                
            
            </div>

            
    </div>
  )
}

export default LoaderMraz