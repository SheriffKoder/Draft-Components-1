import React from 'react'
// import styles from "./style.module.css";
import Image from 'next/image';



// framer-motion enter-exit animation
const scaleAnimation = {
    initial: {scale: 0, x: "-50%", y: "-50%"},
    open: {scale: 1, x: "-50%", y: "-50%", transition: {duration: 0.4, ease: [cubic-bezier(0.76, 0, 0.24, 1)]}}, // easeInOutQuart
    closed: {scale: 0, x: "-50%", y: "-50%", transition: {duration: 0.4, ease: [cubic-bezier(0.32, 0, 0.67, 0)]}} // easeInCubic

}




const Modal = ({projects, modal}) => {

    const {active, index} = modal;

  return (
    /* this will show all the images in col and hide all images but the first with overflow-hidden */
    <div className="h-[350px] w-[400px] flex items-center justify-center absolute overflow-hidden">
        
    {/* using translate Y we can change the displayed images that are already hidden by the overflow
    transform: translateY(-300%);
    absolute to allow the images to change 
    added style transition to use 'top' 
    easeInOutQuart */}
        <div className="w-full h-full absolute"
        style={{top: index * -100 + "%",
            transition: 'top 0.5s cubic-bezier(0.76, 0, 0.24, 1)'
        }}>
            {
                projects.map((project, index) => {
                    const {src, color} = project;

                    // this css will make the image centered and have the color as a border like
                    return <div className="relative h-[100%] flex items-center justify-center"
                    style={{backgroundColor: color}}
                    key={`modal_${index}`}
                    >
                        <Image
                        src={`/OliverImages/ProjectGallery/${src}`}
                        width={300}
                        height={0}
                        alt="image"
                        style={{height:"auto"}}
                        />
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default Modal