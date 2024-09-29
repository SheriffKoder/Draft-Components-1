"use client"
import React, {useState} from 'react'

import styles from "./page.module.css"
import Project from './project';
import Modal from "./modal";

const page = () => {

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
    <main>
        <div className={styles.main}>
            <div className={styles.body}>
                {
                    projects.map((project, index) => {
                        return <Project 
                                key={index} index={index} 
                                title={project.title} setModal={setModal}
                                />
                    })
                }
            </div>
            <Modal modal={modal} projects={projects}/>

        </div>

    </main>
  )
}

export default page