
import React from 'react'

type CaretProps = {
  size: string | number,
  color: string,
}


const CaretDown2 = (props: CaretProps) => {
  return (
    <svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path id="Vector" d="M16 10L12 14L8 10" stroke={props.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default CaretDown2;

