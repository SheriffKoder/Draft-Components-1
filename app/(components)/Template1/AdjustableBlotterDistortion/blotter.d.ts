// Add Blotter property to the Window interface so TypeScript knows it exists
interface Window {
    Blotter: any; // 'any' type because we're not fully typing the library
  }
  
  // Declare types for the Blotter library
  declare namespace Blotter {
    // Text class for creating text elements
    class Text {
      constructor(text: string, options: {
        family: string; // Font family
        size: number;   // Font size
        fill: string;   // Text color
      });
    }
  
    // The RollingDistortMaterial class for the distortion effect
    class RollingDistortMaterial {
      // Properties that control the distortion effect
      uniforms: {
        uSineDistortSpread: { value: number };     // How wide the distortion spreads
        uSineDistortCycleCount: { value: number }; // Number of distortion cycles
        uSineDistortAmplitude: { value: number };  // Strength of sine wave distortion
        uNoiseDistortVolatility: { value: number }; // How rapidly noise changes
        uNoiseDistortAmplitude: { value: number };  // Strength of noise distortion
        uRotation: { value: number };              // Rotation angle
        uSpeed: { value: number };                 // Animation speed
      };
    }
  
    // The main Blotter class
    class Blotter {
      constructor(material: any, options: { texts: Text });
      forText(text: Text): any; // Method to get a scope for a text element
    }
  }