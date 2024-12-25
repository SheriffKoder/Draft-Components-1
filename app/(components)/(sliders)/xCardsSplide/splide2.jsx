"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./style.css"

import { EffectCoverflow, Pagination, Navigation } from 'swiper';

// https://dev.to/deyrupak/3-lightweight-javascript-carousel-libraries-3o06
// https://swiperjs.com/demos
// https://swiperjs.com/react
// 6 images is best on loop true to avoid snatching
// https://www.youtube.com/watch?v=OtqxDT0IlHI
// https://react-id-swiper.ashernguyen.site/example/three-d-coverflow-effect
const params = {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true
  },
  pagination: {
    el: '.swiper-pagination'
  }
}
//Type 3
// coverflowEffect: {
//   rotate: 50,
//   stretch: 0,
//   depth: 200,
//   modifier: 1,
//   slideShadows : true,
// },

const splide2 = () => {
    return (
      <div className="container">
        <h1 className="heading">Flower Gallery</h1>
        {/* <Swiper {...params}> */}
        <Swiper
          effect={'coverflow'}
          spaceBetween={0}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: -3,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: true,
          }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          <SwiperSlide>
            <img src="./images/1.png" alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./images/2.png" alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./images/3.png" alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./images/1.png" alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./images/2.png" alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./images/3.png" alt="slide_image" />
          </SwiperSlide>
          {/* <SwiperSlide>
            <img src={slide_image_2} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_3} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_4} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_5} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_6} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_7} alt="slide_image" />
          </SwiperSlide> */}
  
          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              prev
            </div>
            <div className="swiper-button-next slider-arrow">
              next
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    );

}

export default splide2

