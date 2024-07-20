
import React from 'react'
import "./loadersMraz.css"
// @https://x.com/davidm_ml

const LoaderMraz = () => {
  return (
    <div className="FullScreen_CenteredFlex bg-gradient-radial from-[#4a3ea761] to-70%  to-transparent">
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