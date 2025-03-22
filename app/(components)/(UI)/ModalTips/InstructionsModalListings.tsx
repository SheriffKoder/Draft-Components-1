/**
 * @fileoverview InstructionsModal Component
 * 
 * PURPOSE:
 * This modal component provides first-time users with instructions on how to use
 * premium features. It displays feature costs, usage instructions, and a cost breakdown
 * showing current and remaining token credits. The modal includes proceed and cancel options.
 * 
 * INDEX OF STEPS:
 * 1. Import dependencies and constants
 * 2. Define component props interface
 * 3. Initialize component state and animation effects
 * 4. Render modal structure
 *    a. Modal overlay and container
 *    b. Modal header and feature introduction
 *    c. Feature instructions list
 *    d. Token cost breakdown
 *    e. Action buttons (Proceed/Cancel)
 */
"use client"
import React, { useEffect, useState } from 'react'
import { Lightbulb, X } from 'lucide-react';

// Add this constant at the top of your file, after the imports
const OVERVIEW_POINTS = [
    "Listings are fetched from your Hostaway account upon first connection.",
    "But you have to click 'Pull reviews' to get the updated reviews and data associated with your listings.",
    "Selecting listings allow to preview their reviews, filter through them, and generate AI-recommendations from them.",
    "You can select multiple listings but not exceed your plan listings limit. To add more simply change your subscription plan.",
    "Once you select a listing, it cannot be unselected unless you buy a 1 listing reset-token from your account page.",
    "Reset tokens act as a listing replacement token. You can use them to replace a listing with a new one.",
    "If the listing has been removed/changed from your provider account, refresh and a reset-token will be granted in replacement.",
    "But we got you! You are granted a one time ability for FREE to reset all selected listings at once each month.",
];

///////////////////////////////////////////////////////////////////////////////
// 1. COMPONENT DEFINITION AND PROPS
///////////////////////////////////////////////////////////////////////////////

/**
 * InstructionsModal displays instructions and cost breakdown for premium features
 * @param {string} featureName - Name of the feature being purchased
 * @param {number} featureCost - Cost in tokens for the feature
 * @param {function} setShowTokenModal - Function to control modal visibility
 * @param {function} setToast - Function to trigger toast notifications
 * @param {function} setRefresh - Function to trigger a refresh after transaction
 * @returns {JSX.Element} Modal component
 */
const InstructionsModalListings = ({setShowInstructionsModal, showInstructionsModal}: {setShowInstructionsModal: (showInstructionsModal: boolean) => void, showInstructionsModal: boolean}) => {

    ///////////////////////////////////////////////////////////////////////////////
    // 2. STATE MANAGEMENT AND EFFECTS
    ///////////////////////////////////////////////////////////////////////////////

    // state to control the animation styling
    const [animate, setAnimate] = useState(false);
    // state to close the modal entirely
    const [closeModal, setCloseModal] = useState(false);

    // make the modal appear, allow the animation to play
    useEffect(() => {
        setTimeout(() => {
            setAnimate(true);
        }, 0);
    }, []);

    useEffect(() => {

        // allow time to display the out animation then close the modal
        if (!showInstructionsModal) {
            setAnimate(false);
            setTimeout(() => {
                setCloseModal(true);
            }, 100);

        // make the modal appear, allow the animation to play
        } else {
            setCloseModal(false);

            setTimeout(() => {
                setAnimate(true);

            }, 100);
        }

    }, [showInstructionsModal]);


    ///////////////////////////////////////////////////////////////////////////////
    // 3. COMPONENT RENDERING
    ///////////////////////////////////////////////////////////////////////////////

    if (!closeModal) {
    return (
        // Modal overlay with semi-transparent black background
        <div className={`fixed inset-0 bg-black/50 z-50 h-screen w-screen flex flex-col items-center justify-end vp2:justify-center`}>
            {/* Modal container with primary background and brain icon decoration */}
            <div className={` my-4 relative overflow-hidden bg-[#0f0f0f] rounded-lg shadow-lg border border-blue-500/20
            max-w-2xl mx-4 ${animate ? "sm:translate-y-0 translate-y-0 opacity-100" : "sm:translate-y-3 opacity-0 translate-y-5"} transition-all duration-300`}>

                {/* Background Icon */}
                <div className={`pointer-events-none absolute top-[10%] right-[-25%] h-[80%] w-[80%] flex items-center justify-center z-0
                transition-all duration-[350ms] group-hover:right-[-39%] group-hover:top-[18%] group-hover:h-[102%] group-hover:w-[102%]
                opacity-10
                `}>
                    <Lightbulb className={`w-full h-full text-white group-hover:text-blue-500`} />
                </div>
          
                {/* Close button */}
                <div className='absolute top-2 right-2 bg-white/10 rounded-full p-1 cursor-pointer'>
                    <X className="w-4 h-4 text-white" onClick={() => setShowInstructionsModal(false)} />
                </div>

                {/* Main content container */}
                <div className='h-full w-full flex flex-col justify-center px-4 sm:px-8 pt-5 pb-5'>

                    {/* ///////////////////////////////////////////////////////////////////////////////
                    // 3.1 MODAL HEADER AND FEATURE INTRODUCTION
                    /////////////////////////////////////////////////////////////////////////////// */}

                    <div className="">
                        <h3 className='text-white text-2xl font-bold mb-3 sm:mb-0'>Instructions</h3>
                        
                        <p className="hidden sm:flex text-white text-lg flex-row items-center justify-start gap-1 my-6 sm:my-2 flex-wrap">
                            <span className="flex-wrap">This is your first time using the </span>
                            <span className="bg-white/10 px-2 py-1 rounded-md"> Listings Dropdown </span>
                            <span className="flex-wrap">functionality.</span>
                        </p>
                        {/* ///////////////////////////////////////////////////////////////////////////////
                        // 3.2 FEATURE INSTRUCTIONS LIST
                        /////////////////////////////////////////////////////////////////////////////// */}

                        <div className="bg-white/5 border border-white/10 rounded-md p-4 ">
                            
                            <p className="text-white font-semibold flex flex-row items-center justify-start gap-1 sm:my-0 mb-4 sm:mb-4 flex-wrap text-sm sm:text-lg">
                                <span className="">Just a brief overview of how this functionality works:</span>
                            </p>

                            <div className="flex flex-col items-start justify-center max-w-lg gap-2 text-xs sm:text-sm">

                                {OVERVIEW_POINTS.map((point, index) => (
                                  <div key={index} className="text-gray-300 mb-1 relative pl-4">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full absolute top-[7px] left-0"></div>
                                    <p className="">{point}</p>
                                  </div>
                                ))}
                            </div>
                        </div>


                    </div>

                    {/* ///////////////////////////////////////////////////////////////////////////////
                    // 3.4 ACTION BUTTONS
                    /////////////////////////////////////////////////////////////////////////////// */}

                    {/* Action buttons container */}
                    <div className="flex flex-row gap-2 items-center justify-center mt-4">
                        {/* Proceed button - confirms the token usage */}
                        <button className="w-full bg-blue-500 text-black font-semibold px-4 py-[7px] rounded-md flex items-center justify-center gap-2 text-center group
                        hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                        onClick={() => {
                            setShowInstructionsModal(false);
                        }}
                        >
                            OK
                        </button>

                    </div>

                </div>
          
            </div>
        </div>
    )
    }
}

export default InstructionsModalListings
