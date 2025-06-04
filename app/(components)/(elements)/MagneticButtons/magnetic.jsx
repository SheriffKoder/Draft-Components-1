"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';

export default function MagneticButton({children}) {
   
    const ref = useRef(null);

    useEffect(() => {
        // Only proceed if ref.current exists
        if (!ref.current) return;
        
        const element = ref.current;
        
        const xTo = gsap.quickTo(element, "x", {duration: 1, ease: "elastic.out(1, 0.3)"})
        const yTo = gsap.quickTo(element, "y", {duration: 1, ease: "elastic.out(1, 0.3)"})

        const mouseMove = (e) => {
            //  Gets mouse position (clientX, clientY)
            const { clientX, clientY } = e;
            // get the position of the element / Calculates element's center position
            const {height, width, left, top} = element.getBoundingClientRect();
            // Finds the distance from mouse to element center
            const x = clientX - (left + width/2);
            const y = clientY - (top + height/2); 
            // clientY - mouse Y position from viewport top
            // top + height/2 = element center Y position from viewport top
            // y = 150 - 125 = 25px


            // apply the magnetic effect - Moves the element by that distance (creating the "magnetic" follow effect)
            xTo(x)
            yTo(y)
        }

        const mouseLeave = () => {
            // reset the element to its original position when mouse leaves the element
            xTo(0)
            yTo(0)
        }

        element.addEventListener("mousemove", mouseMove);
        element.addEventListener("mouseleave", mouseLeave);

        return () => {
            // Check if element still exists before removing event listeners
            if (element) {
                element.removeEventListener("mousemove", mouseMove);
                element.removeEventListener("mouseleave", mouseLeave);
            }
        }
    }, [])

    return (
        <div>
            {React.cloneElement(children, {ref:ref})}
        </div>
    )
}