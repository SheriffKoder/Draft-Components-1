"use client"
import React, { useState } from "react";
import styles from "./DemoComponent.module.css"; // For CSS styling, if required

const DemoComponent = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  const handleSlideChange = (direction) => {
    if (direction === "prev") {
      setActiveSlide((prev) => (prev > 1 ? prev - 1 : 3)); // Wrap around to the last slide
    } else {
      setActiveSlide((prev) => (prev < 3 ? prev + 1 : 1)); // Wrap around to the first slide
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.slider} ${styles[`slide-${activeSlide}`]}`}>
        <div className={styles.slide}>Slide 1 Content</div>
        <div className={styles.slide}>Slide 2 Content</div>
        <div className={styles.slide}>Slide 3 Content</div>
      </div>
      <div className={styles.controls}>
        <button className="buttonSlider2" onClick={() => handleSlideChange("prev")}>Previous</button>
        <button className="buttonSlider2" onClick={() => handleSlideChange("next")}>Next</button>
      </div>
    </div>
  );
};

export default DemoComponent;
