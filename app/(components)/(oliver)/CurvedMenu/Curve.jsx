import React from 'react'
import {motion} from "framer-motion";

// imported and used in the end of Nav.jsx
const Curve = () => {

    // the first thing move our pen to 100 on the X and 0 on the Y
    // a line from x 100 to on the y-axis
    // Q to draw the curve from top and to the middle of the screen
    // if we changed Q0 to Q-100 will have more curve out
    // Curve
    const initialPath = `M100 0 L100 ${window.innerHeight} Q-100 ${window.innerHeight/2} 100 0`

    // flat
    const targetPath = `M100 0 L100 ${window.innerHeight} Q100 ${window.innerHeight/2} 100 0`


    // now we want to have a transition between initial and target paths
    const pathAnimation = {
        initial: {
            d: initialPath,
        },
        enter: {
            d: targetPath,
            transition: {duration: 1, ease: [0.76, 0, 0.24, 1]},
        },
        exit: {
            d: initialPath,
            transition: {duration: 1, ease: [0.76, 0, 0.24, 1]}
        }
    }

  return (
    <svg className="absolute top-0 left-[-99px] width-[100px] h-full fill-[rgb(41,41,41)] stroke-none">
        <motion.path d={initialPath}
        variants={pathAnimation} initial="initial" animate="enter" exit="exit">

        </motion.path>
    </svg>
  )
}

export default Curve