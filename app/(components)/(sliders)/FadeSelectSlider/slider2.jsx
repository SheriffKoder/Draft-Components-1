"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./ImageSlider.module.css";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [manualChange, setManualChange] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!manualChange) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
      setManualChange(false); // Reset manual change after one cycle
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length, manualChange]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setManualChange(true); // Temporarily stop auto-slide
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.imageContainer}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.image} ${
              currentIndex === index ? styles.active : styles.inactive
            }`}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
              priority={currentIndex === index} // Optimize current image
            />
          </div>
        ))}
      </div>
      <div className={styles.dots}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              currentIndex === index ? styles.activeDot : ""
            }`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
