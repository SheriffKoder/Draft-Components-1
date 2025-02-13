"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

// 2
import React, { useState } from 'react'


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

// this component will contain the animation skeleton
// it just needs isOpen, onClose, children
// isOpen to control the display yes or no << triggers the animate and exit points
// onClose will be used to close the modal when the user clicks the close button or something
// children to display the content, but the content will ...
export function FramerSlider({ isOpen, onClose, children }: ModalProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-blue-500/10 backdrop-blur-[1px] z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-background rounded-[10px] w-[425px] relative z-[101]"
            // initial={{ y: "2rem", opacity: 0 }}
            // animate={{ y: 0, opacity: 1 }}
            // exit={{ y: "2rem", opacity: 0 }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 200,
              duration: 0.3
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// the content will 
export function FramerSliderContent() {

    // handle the open from outside (button) and inside (another button)
    const [isOpen, setIsOpen] = useState(false);

    // handles the text that will be displayed when the modal is closing
    const [isClosing, setIsClosing] = useState(false);
    
    // gives some time space between the closing and the closing text
    // so the text can appear before the modal actually closes
    const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300); // 300ms is the duration of the animation
    };

  return (
    <>

        {/* button to open the modal and will display the closing text */}
        <button 
          onClick={() => setIsOpen(true)} 
          className='ml-[2rem]'
          disabled={isClosing}
        >
          {isClosing ? 'Closing...' : 'Open Modal'}
        </button>

        {/* the modal - just place the content inside */}
        <FramerSlider isOpen={isOpen} onClose={handleClose}>
          <div className="p-6 bg-white text-black border-white/10 rounded-[10px]">
            <h2>Modal Title</h2>
            <p>Modal content...</p>

            {/* this button will just close the modal */}
            <button 
              onClick={handleClose}
              className={`${isClosing ? 'opacity-50' : ''}`}
              disabled={isClosing}
            >
              {isClosing ? 'Closing...' : 'Close'}
            </button>
          </div>
        </FramerSlider>
    </>
  )
}
