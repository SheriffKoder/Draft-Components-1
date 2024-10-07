"use client"
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import React from 'react'
import {ScrollTrigger} from "gsap/all";

const Page = () => {

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(()=> {

    let sections2 = gsap.utils.toArray(".section2");

    gsap.to(sections2, {
        xPercent: -100 * (sections2.length -1),
        ease: "none",
        scrollTrigger: {
            trigger: ".container2",
            pin: true,
            scrub: 1,
            // slide in automatically when middle of the section
            snap: 1/ (sections2.length -1),
            // the end function gets recalled each time the viewport resizes
            end: ()=> "+="+document.querySelector(".container2").offsetWidth,
        }
    })

    },[]);






  return (


        <div className="container2 text-xl overflow-x-hidden flex flex-row">
            <div className='section2 min-w-[100vw] h-[100vh] pt-[300px] pl-[100px] bg-slate-400'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit adipisci iusto impedit ex quasi, dolor mollitia culpa accusamus. Quis molestias maiores ut recusandae repellendus deleniti alias esse officiis laboriosam adipisci.
            Saepe labore tenetur quo? Saepe a ratione perferendis minima earum aspernatur doloribus. Cumque expedita recusandae illo doloremque eum asperiores, impedit aliquid corporis sint labore? Non laboriosam maxime illum obcaecati similique.
            Neque vel odio nulla vitae dolorum asperiores inventore sint nostrum doloribus provident? Veritatis, alias saepe repellat cumque fugit illum possimus, quos temporibus rem necessitatibus suscipit quia provident error esse nulla.
            </div>
            <div className='section2 min-w-[100vw] h-[100vh] pt-[300px] pl-[100px] bg-slate-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, delectus quia aliquid quae iure doloribus animi, qui cum aut non consequatur velit vero, eius repellendus tempora impedit maiores tenetur alias.
            Error id cum obcaecati. Rerum alias excepturi corrupti illum consequatur aut laudantium minus dolorem cupiditate est magnam, eos nisi voluptates hic quibusdam nemo ipsum amet beatae velit. Reiciendis, at molestias!
            Voluptatum illum nulla laudantium deserunt fugit error temporibus voluptate, delectus dicta corrupti dolores in sunt earum iste! Commodi aliquam, neque veniam alias temporibus, exercitationem eius omnis laborum excepturi voluptate voluptatum?
            </div>
            <div className='section2 min-w-[100vw] h-[100vh] pt-[300px] pl-[100px] bg-slate-800'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt necessitatibus qui accusamus cum dolorem praesentium deleniti? Voluptates, voluptatum consequuntur ut rerum harum, unde aliquid accusamus iusto, et fuga illo quis.
            In dolores quibusdam provident molestiae nihil eos. Cupiditate, voluptatibus nostrum? Numquam perspiciatis error, assumenda autem cumque necessitatibus reiciendis quaerat facere ut ullam ea minima distinctio accusamus expedita nostrum suscipit doloribus.
            Expedita dolorem ipsam blanditiis animi? Perspiciatis quisquam voluptates similique molestiae, quasi cumque, beatae quo, exercitationem repellendus maxime quaerat minus consectetur eveniet perferendis expedita ratione in. Reprehenderit aut accusantium iste consequatur.
            Deleniti esse aut atque sapiente! Accusantium nisi culpa delectus alias, explicabo atque voluptas facere omnis. Eaque non repellat dolorem sit laborum amet numquam voluptatem velit, quas cumque. Autem, reiciendis impedit?
            </div>
        </div>

  )
}

export default Page