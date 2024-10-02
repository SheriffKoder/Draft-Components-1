import React from 'react'

// import styles from "./style.module.css";

const Project = ({index, title, setModal}) => {
  return (
    <div className="flex w-full py-[50px] px-[100px] items-center justify-between
    border-t border-[rgb(212,212,212)] transition-all duration-[0.2s] ease-out
    hover:opacity-[0.4]"
    onMouseEnter={()=>{setModal({active: true, index: index})}}
    onMouseLeave={()=>{setModal({active: false, index: index})}}

    >
        <h2 className="text-[60px] font-[400] m-0 transition-all duration-[0.2s] ease-out
        hover:translate-x-[-10px]">
            {title}
        </h2>
        <p className="font-[300] transition-all duration-[0.2s] ease-out
        hover:translate-x-[10px]">
            Design & Development
        </p>
    </div>
  )
}

export default Project