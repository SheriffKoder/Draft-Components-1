"use client"
import React, {useState} from 'react'

import Project from './project';
import Modal from "./modal";

const GalleryDennis = () => {

    const projects = [
        {
          title: "C2 Montreal",
          src: "c2montreal.png",
          color: "#000000"
        },
        {
          title: "Office Studio",
          src: "officestudio.png",
          color: "#8C8C8C"
        },
        {
          title: "Locomotive",
          src: "locomotive.png",
          color: "#EFE8D3"
        },
        {
          title: "Silencio",
          src: "silencio.png",
          color: "#706D63"
        }
      ];

    const [modal, setModal] = useState({active: false, index: 0});

  return (
        <section className="flex items-center justify-center h-[100vh]">
            <div className="w-[1000px] flex items-center justify-center flex-col">
                {
                    // pass the title and setModal to each list item
                    // on each, on enter setModal to true/false, index to its index
                    projects.map((project, index) => {
                        return <Project 
                                key={index} index={index} 
                                title={project.title} setModal={setModal}
                                />
                    })
                }
            </div>
            <Modal modal={modal} projects={projects}/>

        </section>
  )
}

export default GalleryDennis;