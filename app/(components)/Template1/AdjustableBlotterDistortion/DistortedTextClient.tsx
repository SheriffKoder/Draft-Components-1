'use client'; // This directive tells Next.js this is a client component (runs in the browser)

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script'; // Next.js component for loading external scripts

// Props interface for the component
interface DistortedTextProps {
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  fontColor?: string;
  showControls?: boolean;
  initialUniforms?: {
    uSineDistortSpread?: number;
    uSineDistortCycleCount?: number;
    uSineDistortAmplitude?: number;
    uNoiseDistortVolatility?: number;
    uNoiseDistortAmplitude?: number;
    uRotation?: number;
    uSpeed?: number;
  };
}

// Control panel component for adjusting uniforms
const ControlPanel = ({ uniforms, setUniforms, visible }) => {
  if (!visible) return null;

  // Handler for slider changes
  const handleChange = (e, property) => {
    const value = parseFloat(e.target.value);
    setUniforms(prev => ({
      ...prev,
      [property]: value
    }));
  };

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg shadow-lg w-80 z-50">
      <h3 className="text-lg font-bold mb-4">Distortion Controls</h3>
      
      {Object.entries(uniforms).map(([key, value]) => (
        <div key={key} className="mb-3">
          <div className="flex justify-between">
            <label className="text-sm">{key}</label>
            <span className="text-xs">{value.toFixed(3)}</span>
          </div>
          <input
            type="range"
            min={key === 'uRotation' ? 0 : 0}
            max={key === 'uRotation' ? 360 : key === 'uNoiseDistortVolatility' ? 30 : 0.2}
            step={0.001}
            value={value}
            onChange={(e) => handleChange(e, key)}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
};

export default function DistortedTextClient({
  text = "DISTORT",
  fontFamily = "Monument, sans-serif",
  fontSize = 180,
  fontColor = "white",
  showControls = false,
  initialUniforms = {
    uSineDistortSpread: 0.035,
    uSineDistortCycleCount: 2,
    uSineDistortAmplitude: 0.03,
    uNoiseDistortVolatility: 15,
    uNoiseDistortAmplitude: 0.01,
    uRotation: 170,
    uSpeed: 0.08
  }
}: DistortedTextProps) {
  // Create a reference to the DOM element where we'll attach the Blotter text
  const textRef = useRef<HTMLDivElement>(null);
  
  // Flag to track if Blotter has been initialized to prevent duplicate initialization
  const blotterInitialized = useRef(false);
  
  // Reference to the Blotter material for updating uniforms
  const materialRef = useRef<any>(null);
  
  // State for the uniform values
  const [uniforms, setUniforms] = useState(initialUniforms);

  // Get the actual font family from CSS variable
  const [actualFontFamily, setActualFontFamily] = useState(fontFamily);
  
  useEffect(() => {
    // Get the computed value of the CSS variable if it's a variable
    if (fontFamily.includes('var(')) {
      const tempElement = document.createElement('span');
      document.body.appendChild(tempElement);
      tempElement.style.fontFamily = fontFamily;
      const computedFont = window.getComputedStyle(tempElement).fontFamily;
      document.body.removeChild(tempElement);
      setActualFontFamily(computedFont);
    }
  }, [fontFamily]);

  // Update the material when uniforms change
  useEffect(() => {
    if (materialRef.current) {
      Object.entries(uniforms).forEach(([key, value]) => {
        if (materialRef.current.uniforms[key]) {
          materialRef.current.uniforms[key].value = value;
        }
      });
    }
  }, [uniforms]);

  // useEffect runs after component renders
  useEffect(() => {
    // This code only runs in the browser (not during server-side rendering)
    // It checks if Blotter.js is loaded and if we haven't initialized it yet
    if (typeof window !== 'undefined' && window.Blotter && !blotterInitialized.current) {
      initBlotter(); // Call our initialization function
      blotterInitialized.current = true; // Mark as initialized
    }
  }, [actualFontFamily]); // Re-run when the resolved font family changes

  // Function to set up Blotter.js
  const initBlotter = () => {
    // Safety check: make sure our DOM element exists and Blotter is loaded
    if (!textRef.current || !window.Blotter) return;

    // Create a Blotter Text object with our desired text and styling
    const blotterText = new window.Blotter.Text(text, {
      family: actualFontFamily, // Use the resolved font family
      size: fontSize, // Text size
      fill: fontColor // Text color
    });

    // Create the distortion material (effect)
    const material = new window.Blotter.RollingDistortMaterial();
    materialRef.current = material;
    
    // Configure the distortion effect parameters
    Object.entries(uniforms).forEach(([key, value]) => {
      if (material.uniforms[key]) {
        material.uniforms[key].value = value;
      }
    });

    // Create a Blotter instance with our material and text
    const blotter = new window.Blotter(material, {
      texts: blotterText // Attach our text to the effect
    });

    // Get a "scope" for our text (needed to append to DOM)
    const scope = blotter.forText(blotterText);
    
    // Clear any previous content
    if (textRef.current.firstChild) {
      textRef.current.innerHTML = '';
    }
    
    // Append the Blotter text to our div element
    scope.appendTo(textRef.current);
  };

  return (
    <>
      {/* Load the main Blotter.js script */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/Blotter/0.1.0/blotter.js"
        onLoad={() => {
          // This function runs after the main Blotter script loads
          
          // Create a new script element for the material (effect) script
          const materialScript = document.createElement('script');
          materialScript.src = "https://cdnjs.cloudflare.com/ajax/libs/Blotter/0.1.0/materials/rollingDistortMaterial.js";
          
          // Set up what happens when the material script loads
          materialScript.onload = () => {
            // Initialize Blotter if not already done
            if (!blotterInitialized.current) {
              initBlotter();
              blotterInitialized.current = true;
            }
          };
          
          // Add the material script to the document
          document.body.appendChild(materialScript);
        }}
      />
      
      {/* Control panel for adjusting uniforms */}
      <ControlPanel 
        uniforms={uniforms} 
        setUniforms={setUniforms} 
        visible={showControls} 
      />
      
      {/* Container for our effect using Tailwind classes */}
      <div className="flex justify-center items-center min-h-screen w-full relative">
        {/* Background element */}
        <div className="absolute inset-0 bg-[#121212] -z-10"></div>
        
        {/* This div will hold our Blotter text effect */}
        <div id="text" ref={textRef}></div>
      </div>
    </>
  );
} 