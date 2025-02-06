// import RemoveButton from '@/features/CMS/components/cards/Button_CardRemove';
import { Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

/**
 * TestimonialsCard Component
 * Renders a testimonial card with user rating, comment, and profile information
 * Variation 1, desktop has a grid of cards
 * Variation 2, user interactive carousel of cards
 * 
 * 
 * @param {Object} props
 * @param {Object} props.card - Testimonial data containing rating, comment, image, name, position, and company
 * @param {number} props.index - Optional index for key prop when used in a list
 * @returns {JSX.Element} A testimonial card component
 */

interface TestimonialsCardProps {
    card: TestimonialsCard;
    index: number;
    variation?: number;
    mode?: string;
}

interface TestimonialsCard {
    name: string;
    position: string;
    company: string;
    comment: string;
    image: string;
    rating: number;
}

const TestimonialsCard = ({card, index, variation, mode}: TestimonialsCardProps) => {
  return (
        <div key={index} className={`relative flex flex-col gap-[1rem] card_radius border p-[1rem] items-start justify-around h-[275px]
        ${variation === 1 ? 'vp4:w-[45%] vp5:w-[32%]' : ''}
        ${variation === 3 ? 'w-[80vw]' : ''}`}>

        {/* {mode === 'edit' && <RemoveButton identifier={"Testimonials_data.cards"} index={index} handleShowModal={handleShowModal}/>} */}



        {/* Star rating display */}
        <div className='flex flex-row gap-[2px]'>
        {[...Array(5)].map((_, i) => (
            <Star
            key={i}
            className={`
                w-4 h-4 transition-all
                ${i < (card.rating)  // Check if star should be filled based on rating
                ? "text-[#ffd722] group-hover:text-[#ffd722] group-hover:scale-110" 
                : "text-[#474747]"}
            ${i < card.rating ? "fill-[#ffd722]" : "fill-[#474747]"}
            `}
            />
        ))}
        </div>

        {/* Testimonial comment */}
        <p className='paragraph3 italic'>
            Paragraph3 "{card.comment}"
        </p>
                

        {/* User profile section */}
        <div className='flex flex-row items-center justify-center gap-[1rem]'>
         
            {/* Profile image container */}
            <div className="h-full w-[50px] flex flex-row items-center justify-center">
                <div className='w-[30px] h-[30px] relative rounded-full overflow-hidden'>
                    <Image src={card.image} alt={card.name} fill className='object-cover'></Image>
                </div>
            </div>

            {/* User details */}
            <div className='flex flex-col w-full flex-wrap'>
                <h3 className='paragraph3 w-full font-semibold'>paragraph3, {card.name}</h3>
                <div className='flex flex-row w-full text-xs'>
                    {card.position}, {card.company}
                    
                </div>
                
            </div>
        </div>



        </div>
  )
}

export default TestimonialsCard
