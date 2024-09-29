import React from 'react'
import styles from "./style.module.css";
import Image from 'next/image';

const Modal = ({projects, modal}) => {

    const {active, index} = modal;

  return (
    <div className={styles.modalContainer}>
        <div className={styles.modalSlider}
        style={{top: index * -100 + "%"}}>
            {
                projects.map((project, index) => {
                    const {src, color} = project;
                    return <div className={styles.modal}
                    style={{backgroundColor: color}}
                    key={`modal_${index}`}
                    >
                        <Image
                        src={`/OliverImages/ProjectGallery/${src}`}
                        width={300}
                        height={0}
                        alt="image"
                        />
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default Modal