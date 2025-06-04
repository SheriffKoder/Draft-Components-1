"use client"
import React, { useState } from 'react'
import './SelectionTextAnimation.css'

const page = () => {


     const carCategories = [
        {
          name: "Comfort",
          src: "/images/side-image-1.jpg",
          desc: "Ride quality, seating, cabin quietness, and interior features."
        },
        {
          name: "Performance",
          src: "/images/side-image-2.jpg",
          desc: "Acceleration, handling, horsepower, and driving dynamics."
        },
        {
          name: "Luxury",
          src: "/images/side-image-3.jpg",
          desc: "Premium materials, advanced tech, brand prestige, and design."
        },
        {
          name: "Practicality",
          src: "/images/side-image-1.jpg",
          desc: "Trunk space, seating capacity, fuel efficiency, and ease of use."
        },
        {
          name: "SUV",
          src: "/images/side-image-2.jpg",
          desc: "Spacious, versatile, and built for comfort and control."
        },
      ]

    const [currentCategory, setCurrentCategory] = useState<typeof carCategories[number] | null>(null)


  return (
    <div className='w-full h-screen bg-black flex flex-col justify-center items-center relative'>
      {currentCategory && currentCategory.desc && (
        <p 
          key={currentCategory.name} 
          className='sectionSixDesc fadeupAnimation'
        > 
          {currentCategory.desc} 
        </p>
      )}

      <div className='flex flex-row gap-4 absolute bottom-10'>
        {carCategories.map((category) => (
          <button key={category.name} className='bg-white text-black px-4 py-2 rounded-md' 
          onClick={() => setCurrentCategory(category)}
          onMouseEnter={() => setCurrentCategory(category)}
          onMouseLeave={() => setCurrentCategory(null)}
          >{category.name}</button>
        ))}
      </div>
    </div>
  )
}

export default page
