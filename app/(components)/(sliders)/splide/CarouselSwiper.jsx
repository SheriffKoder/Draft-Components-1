"use client"
import React from 'react';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
// import { sectionFive_cards } from '@/constants';

// https://levelup.gitconnected.com/implementing-an-infinite-autoplay-carousel-in-react-with-splide-cac6355ba435
// https://splidejs.com/guides/options/#wheel
// https://codepen.io/yudizsolutions/pen/wvzrPoj inspiration

import "./CarouselSwiper.css"

function CarouselSwiper() {

    const sectionFive_cards = [
        {
            header: "Banquet Server",
            paragraph: "Friendly and professional servers.",
            image: "./XCarouselSwiper/1.png"
    
        },
        {
            header: "Kitchen Helper",
            paragraph: "Dependable staff to assist with meal preparation, cleaning, and maintaining an organized kitchen during busy periods.",
            image: "./XCarouselSwiper/2.png"
    
        },
    
        {
            header: "Banquet Captain",
            paragraph: "Experienced leaders who oversee banquet operations, ensuring flawless service and coordination of staff during events.",
            image: "./XCarouselSwiper/3.png"
    
        },
    
        {
            header: "Maitre D'",
            paragraph: "Seasoned front-of-house managers to greet guests, manage seating arrangements, and supervise the overall dining experience.",
            image: "./XCarouselSwiper/1.png"
    
        },
    
        {
            header: "Concession Stand Worker",
            paragraph: "Reliable team members adept at serving food, drinks, and handling transactions.",
            image: "./XCarouselSwiper/2.png"
    
        },
    
        {
            header: "Line Cook",
            paragraph: "Skilled culinary professionals who can execute dishes efficiently, ensuring high-quality food service in kitchens of all sizes.",
            image: "./XCarouselSwiper/3.png"
    
        },
    ]

    return (
        <div className="CarouselContainer relative">
            <div className="">
                <Splide
                    options={{
                        type: "loop", // Loop back to the beginning when reaching the end
                        autoScroll: {
                            pauseOnHover: true, // Do not pause scrolling when hovering over the carousel
                            pauseOnFocus: false, // Do not pause scrolling when the carousel is focused
                            rewind: true, // Rewind to start when the end is reached
                            speed: 0.4 // Scrolling speed
                            
                        },
                        arrows: true, // Hide navigation arrows
                        pagination: false, // Hide pagination dots
                        gap: '12px', // Gap between slides
                        // wheel: true,
                        // waitForTransition: true,
                        // releaseWheel: true,
                        autoWidth: true,
                        focus: 'center',


                    }}
                    extensions={{ AutoScroll }} // Use the AutoScroll extension
                >


{/* w-[min(500px,40vw)] h-[min(600px,50vw)] rounded-[10px] */}
                        {/* hover:w-[min(550px,42vw)] hover:h-[min(600px,50vw)] */}
                {
                    sectionFive_cards.map((card,index)=>(
                        <SplideSlide key={card.header}>
                        <div 
                        className='
                        w-[70vw] h-[50vh] rounded-[10px] p-[1rem]
                        hover:w-[min(550px,85vw)] hover:h-[50vh]
                        vp4:w-[min(500px,40vw)] vp4:h-[min(600px,55vw)] vp5:h-[min(600px,45vw)] vp6:h-[min(600px,37vw)]
                        vp4:hover:w-[min(550px,42vw)] vp4:hover:h-[min(600px,55vw)] vp5:hover:h-[min(600px,45vw)] vp6:hover:h-[min(600px,37vw)]
                        transition-all duration-500 ease-out border
                         relative flex items-end
                        splideCard text-white'
                        style={{
                            background: "#00000060",
                            background: `linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 61%, rgba(255,255,255,0) 100%), url(${card.image})`,
                            backgroundPosition: "center left",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "42vw",
                          }}
                        >

                            <div className="max-w-[40vw] vp4:max-w-[min(500px,40vw)]
                            flex flex-col items-start justify-end h-full splideContentDesc">
                                <h3 className='heading2 splideTitle w-[30vw] max-w-[400px]
                                transition-all duration-500 ease-out'>
                                    {/* <span className='text-sm vp4:text-xl mr-[0.5rem]'>{index+1}</span> */}
                                    {card.header}
                                </h3>

                                <p className='paragraph1 splideContent w-[30vw] max-w-[400px]
                                transition-all duration-500 ease-out'>
                                    {card.paragraph}
                                </p>
                            </div>


                        </div>                    
                    </SplideSlide>
                    ))
                }

                   

                </Splide>
            </div>

            <div className='absolute w-[50px] aspect-square rounded-full bg-blue-900 bottom-[-2rem]
            left-[50%] translate-x-[-50%]'>
                <div className='w-full h-full invert swipe_rotate'
                style={{
                    backgroundImage: 'url("/icons/swipe.png")',
                    backgroundSize: "80%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    // transform: "translateX(50%)",
                    }}>
                </div>
            </div>

           

        </div>
    );
}

export default CarouselSwiper;
