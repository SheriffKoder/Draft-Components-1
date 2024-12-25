"use client"
import React from 'react'
// import Image from 'next/image'
// import { ScrollScene } from 'scrollscene';
// import {sectionThree_cards } from "@/constants";

import Image from 'next/image';

import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import {ScrollTrigger, ScrollToPlugin} from "gsap/all";

const sectionThree_cards = [
  {
      header: "Country Clubs",
      description: "We prioritize making your members feel valued ensuring flawless execution of weddings, mitzvahs, anniversaries, and other important events.",
      image: "/sectionThreeImages/1.jpg",
  },
  {
      header: "Hotels",
      description: "Reliable and professional team members to enhance your guest experiences, from housekeeping to front desk.",
      image: "/sectionThreeImages/2.jpg"
  },
  {
      header: "Universities",
      description: "Flexible staffing solutions for campus events, dining halls, and administrative support.",
      image: "/sectionThreeImages/3.jpg",
  },
  {
      header: "Corporate Events",
      image: "h/sectionThreeImages/4.jpg",
      description: "Skilled personnel to deliver seamless service for meetings, conferences, and private gatherings."
  },
  {
      header: "Banquet Halls",
      description: "Dedicated team members to provide flawless service for weddings, parties, and special events.",
      image: "/sectionThreeImages/5.jpg"
  },
  {
      header: "Stadiums",
      description: "Versatile staff for concession stands, VIP sections, and event operations to keep fans happy and events running smoothly.",
      image: "/sectionThreeImages/6.jpg"
  },
  {
      header: "Catering Companies",
      description: "Professional and efficient staff to assist with meal prep, service, and cleanup for events of any scale.",
      image: "/sectionThreeImages/7.jpg"
  },
  {
      header: "Cruise Lines",
      description: "Dedicated hospitality teams ready to deliver premium service on and off the water.",
      image: "/sectionThreeImages/8.jpg"
  },

]
import "./StackCards.css"

const ScrollStackCards = () => {

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  useGSAP(()=> {

    gsap.to(".StackContainer", {
      y:0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
          trigger: "#section3Container",
          start: "10% bottom", // the default values
          end: "bottom top",
          // scrub: 0.1,
          // markers: true,
      }, 
      });


      gsap.to(".sectionThreeHeading_container", {
        // y:0,
        opacity: 1,
        zIndex: 1,
        duration: 1,
        scrollTrigger: {
            trigger: ".scrollFillText",
            start: "120% 20%", // the default values
            end: "110% 30%",
            scrub: true,
            // markers: true,
        }, 
        });


  },[]);


  return (
    <div className="StackContainer max-w-[2000px]">
    <ul id="cards">
      {
        sectionThree_cards.map((card,index)=> {

          const space = (index+1)*-10;
          const space2 = space+32;
          // const space3 = space2+"px"

          return (
            <li className="card" id={`card${index+1}`} key={card.header}
            >
            <div className={`card-body relative overflow-hidden`}
            >
              <Image src={`/sectionThreeImages/${index+1}.jpg`} fill alt={card.header}
              className='absolute w-full h-full cardImgStack'>
  
              </Image>
  
              <div className='absolute w-full h-full flex flex-col bg-[#00000060]
              text-white px-[2rem] vp4:px-[5rem] pt-[5rem] vp3:pt-[calc(5rem+6vw)]'
              style={{
                background: "#00000060",
                background: "linear-gradient(160deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 51%, rgba(255,255,255,0) 100%)"
              }}>


                <h3 className='heading2'>
                  {/* <span className='text-sm vp4:text-xl mr-[0.5rem]'>{index+1}</span> */}
                  {card.header}
                </h3>
                <p className='paragraph1 max-w-[900px]'>{card.description}</p>
              </div>
  
            </div>
        </li>
            
          )

      })
      }

   
    </ul>
</div>
  )
}

export default ScrollStackCards