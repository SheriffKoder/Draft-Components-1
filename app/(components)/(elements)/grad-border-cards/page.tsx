import React from 'react'
import AboutCard from './aboutCard'

const page = () => {
   
    const section_about_cardsContent = [
        {
            title: "About",
            description: "This is a description",
            color: "rgba(0,100,120,0.6)",
            color_hover: "rgba(255,255,255,1)",
            fileName: "model.glb",
            rotationSpeed: 0.01,
        }
    ]
  return (
    <div className="h-screen w-full flex justify-center items-center">
        <div className='h-[600px] w-[400px]'>
            <AboutCard
            card={section_about_cardsContent[0]}
            index={0}
            section_about_cardsContent={section_about_cardsContent}
            />

        </div>
    </div>
  )
}

export default page