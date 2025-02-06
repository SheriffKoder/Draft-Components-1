import React from 'react'
import TestimonialsCardsSlider_phone from './TestimonialsCardsSlider_phone'
import Slider from './TestimonialsCardsSlider'
import "./TestimonialsCards.css"


const cards = [
    {
        name: "John Doe",
        position: "Position",
        company: "Company Name",
        comment: "Testimonials Card Paragraph. This is a card that is displayed in the testimonials section and is a short description of the testimonials section.",
        image: "/images/image-placeholder.png",
        rating: 5,
    },
    {
        name: "John Doe",
        position: "Position",
        company: "Company Name",
        comment: "Testimonials Card Paragraph. This is a card that is displayed in the testimonials section and is a short description of the testimonials section.",
        image: "/images/image-placeholder.png",
        rating: 4,
    },
    {
        name: "John Doe",
        position: "Position",
        company: "Company Name",
        comment: "Testimonials Card Paragraph. This is a card that is displayed in the testimonials section and is a short description of the testimonials section.",
        image: "/images/image-placeholder.png",
        rating: 5,
    },
    {
        name: "John Doe",
        position: "Position",
        company: "Company Name",
        comment: "Testimonials Card Paragraph. This is a card that is displayed in the testimonials section and is a short description of the testimonials section.",
        image: "/images/image-placeholder.png",
        rating: 3,
    },
    {
        name: "John Doe",
        position: "Position",
        company: "Company Name",
        comment: "Testimonials Card Paragraph. This is a card that is displayed in the testimonials section and is a short description of the testimonials section.",
        image: "/images/image-placeholder.png",
        rating: 2,
    },
]

const page = () => {
  return (
    <div className='flex flex-col gap-[5rem] h-[100vh] items-center justify-center'>
        <div className='vp5:block'>
            <Slider cards={cards} variation={2}
            // mode={mode}
            // handleShowModal={handleShowModal}
            />
        </div>
        <div className=' overflow-hidden relative'>
            <TestimonialsCardsSlider_phone cards={cards}
            // mode={mode}
            // handleShowModal={handleShowModal}
            />
        </div>
    </div>
  )
}

export default page