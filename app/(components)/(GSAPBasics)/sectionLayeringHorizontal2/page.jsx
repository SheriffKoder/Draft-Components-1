"use client"
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import React from 'react'
import {ScrollTrigger} from "gsap/all";

const page = () => {

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(()=> {

    let sections2 = gsap.utils.toArray(".section2");

    let scrollTween = gsap.to(sections2, {
        xPercent: -100 * (sections2.length -1),
        ease: "none", // progress evenly distributed over time, important
        scrollTrigger: {
            trigger: ".container2",
            pin: true,
            scrub: 1,
            // slide in automatically when middle of the section
            // snap: 1/ (sections2.length -1),
            // the end function gets recalled each time the viewport resizes
            end: ()=> "+="+document.querySelector(".container2").offsetWidth,
            // markers: true,
            start: "center center"
        }
    })

    gsap.to(".box-1", {
        // y: -130,
        opacity: 0.5,
        duration: 1,
        // ease: "elastic",
        scrollTrigger: {
          trigger: ".box-1",
          containerAnimation: scrollTween,  // to get horizontal markers for the box
          start: "left center",
          toggleActions: "play none none reset",
          id: "1",
          markers: true,
        }
      });

    },[]);






  return (

        <div>
            <div className="w-full h-[100vh] bg-black">
            </div>
            <div className="container2 text-xl overflow-x-hidden flex flex-row">
                <div className='section2 min-w-[100vw] h-[50vh]  bg-slate-400
                flex flex-row items-center justify-center gap-[2rem]'>
                    <p className="w-[300px] text-sm">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit adipisci iusto impedit ex quasi, dolor mollitia culpa accusamus. Quis molestias maiores ut recusandae repellendus deleniti alias esse officiis laboriosam adipisci.
                        Saepe labore tenetur quo? Saepe a ratione perferendis minima earum aspernatur doloribus. Cumque expedita recusandae illo doloremque eum asperiores, impedit aliquid corporis sint labore? Non laboriosam maxime illum obcaecati similique.
                        Neque vel odio nulla vitae dolorum asperiores inventore sint nostrum doloribus provident? Veritatis, alias saepe repellat cumque fugit illum possimus, quos temporibus rem necessitatibus suscipit quia provident error esse nulla.
                    </p>
                    <div className="box-1 w-[100px] h-[100px] bg-black">

                    </div>
                    
                </div>
                <div className='section2 min-w-[100vw] h-[50vh] bg-slate-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, delectus quia aliquid quae iure doloribus animi, qui cum aut non consequatur velit vero, eius repellendus tempora impedit maiores tenetur alias.
                Error id cum obcaecati. Rerum alias excepturi corrupti illum consequatur aut laudantium minus dolorem cupiditate est magnam, eos nisi voluptates hic quibusdam nemo ipsum amet beatae velit. Reiciendis, at molestias!
                Voluptatum illum nulla laudantium deserunt fugit error temporibus voluptate, delectus dicta corrupti dolores in sunt earum iste! Commodi aliquam, neque veniam alias temporibus, exercitationem eius omnis laborum excepturi voluptate voluptatum?
                </div>
                <div className='section2 min-w-[100vw] h-[50vh]  bg-slate-800'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt necessitatibus qui accusamus cum dolorem praesentium deleniti? Voluptates, voluptatum consequuntur ut rerum harum, unde aliquid accusamus iusto, et fuga illo quis.
                In dolores quibusdam provident molestiae nihil eos. Cupiditate, voluptatibus nostrum? Numquam perspiciatis error, assumenda autem cumque necessitatibus reiciendis quaerat facere ut ullam ea minima distinctio accusamus expedita nostrum suscipit doloribus.
                Expedita dolorem ipsam blanditiis animi? Perspiciatis quisquam voluptates similique molestiae, quasi cumque, beatae quo, exercitationem repellendus maxime quaerat minus consectetur eveniet perferendis expedita ratione in. Reprehenderit aut accusantium iste consequatur.
                Deleniti esse aut atque sapiente! Accusantium nisi culpa delectus alias, explicabo atque voluptas facere omnis. Eaque non repellat dolorem sit laborum amet numquam voluptatem velit, quas cumque. Autem, reiciendis impedit?
                </div>
            </div>
            <div className="w-full h-[100vh] bg-black">
            </div>
        </div>

  )
}

export default page