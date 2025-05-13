"use client"
import { useState, useEffect } from "react";

///////////////////////////////////////////////////////////
// INTERFACES
///////////////////////////////////////////////////////////

interface BookingIframeProps {
  src: string;        // URL source for the iframe
  height?: number;    // Optional custom height for the iframe
}

///////////////////////////////////////////////////////////
// MAIN COMPONENT
///////////////////////////////////////////////////////////

const ContainerIframe = ({ src, height = 500 }: BookingIframeProps) => {
  ///////////////////////////////////////////////////////////
  // STATE MANAGEMENT
  ///////////////////////////////////////////////////////////
  
  // Controls the loading indicator visibility
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  
  // Manages responsive height of the iframe
  const [iframeHeight, setIframeHeight] = useState(440); // Default height

  ///////////////////////////////////////////////////////////
  // STEP 1: HANDLE RESPONSIVE SIZING
  ///////////////////////////////////////////////////////////
  
  useEffect(() => {
    // Set the height based on window width once the component mounts
    setIframeHeight(window.innerWidth > 800 ? 440 : 600);

    // Add a resize listener for responsive behavior
    const handleResize = () => {
      setIframeHeight(window.innerWidth > 800 ? 440 : 600);
    };

    window.addEventListener('resize', handleResize);
    
    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  ///////////////////////////////////////////////////////////
  // STEP 2: HANDLE IFRAME LOADING DETECTION
  ///////////////////////////////////////////////////////////
  
  useEffect(() => {
    if (isIframeLoading) {
      // Set up interval to check for content loading
      const checkForButton = setInterval(() => {
        try {
          const iframe = document.querySelector('iframe');
          if (iframe && iframe.contentDocument) {
            // Try multiple selectors to find the button
            const nextButton = iframe.contentDocument.querySelector('button[value="next"], .btn-primary, button:contains("Next"), [type="submit"]');
            
            // Also check if the iframe has loaded significant content
            const hasContent = iframe.contentDocument.body && 
                              iframe.contentDocument.body.innerHTML.length > 500;
            
            if (nextButton || hasContent) {
              console.log("Content loaded, hiding loading indicator");
              setIsIframeLoading(false);
              clearInterval(checkForButton);
            }
          }
        } catch (e) {
          // If we get cross-origin errors, fall back to a timeout approach
          console.log("Cannot access iframe content due to same-origin policy");
          // Set a fallback timeout to hide the loading indicator after 5 seconds
          setTimeout(() => {
            setIsIframeLoading(false);
            clearInterval(checkForButton);
          }, 5000);
        }
      }, 500);
      
      // Fallback: Hide loading state after 10 seconds regardless
      const fallbackTimer = setTimeout(() => {
        setIsIframeLoading(false);
      }, 10000);
      
      // Clean up timers on component unmount or when loading completes
      return () => {
        clearInterval(checkForButton);
        clearTimeout(fallbackTimer);
      };
    }
  }, [isIframeLoading]);

  ///////////////////////////////////////////////////////////
  // STEP 3: RENDER COMPONENT
  ///////////////////////////////////////////////////////////
  
  return (
    <div className="relative">
      {/* Iframe Element */}
      <iframe
        src={src}
        width="100%"
        height={iframeHeight}
        style={{ border: 'none' }}
        title="Car Rental Widget"
        onLoad={() => {
          // Keep the loading state, we'll check for the button
          // The useEffect will handle finding the button
        }}
      />
      
      {/* Loading Indicator */}
      {isIframeLoading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center ">
          <div className="mb-4 relative">
            <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-secondary/30 rounded-full"></div>
          </div>
          <p className="text-2xl font-medium text-secondary animate-pulse">Loading the booking form...</p>
          <p className="text-secondary mt-2 text-shadow-lg">This may take a few seconds</p>
        </div>
      )}
    </div>
  );
};

///////////////////////////////////////////////////////////
// EXPORT
///////////////////////////////////////////////////////////

export default ContainerIframe;