import React from 'react'
import ContainerIframe from './iframe-container'
const page = () => {

// the iframe html wrapper has to be in the public folder /iframes/booking-form.html
// pass the src to the iframe-container component
// the iframe-container component wraps the iframe in a div and adds a loading state
    // the loading state is a div with a spinner and a message
    // the loading state is displayed when the iframe is loading
    // the loading state is hidden when the iframe is loaded

  return (
    <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
      <div className="bg-black/20 dark:bg-gray-800 rounded-xl shadow-2xl p-6 px-7 animate-fade-up transition-all overflow-hidden">
        <h2 className="text-2xl font-display font-bold mb-1 text-white">Rent a Luxury Vehicle</h2>
        <ContainerIframe src="/iframes/booking-form.html" />

      </div>
    </div>
  )
}

export default page
