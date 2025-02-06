"use client"
import { useState } from "react";
import TestimonialsCard from "./TestimonialsCard";

const TestimonialsCardsSlider_phone = ({ cards, mode }:{cards:any, mode?:string}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = cards.length;

  const canSlideLeft = currentIndex > 0;
  const canSlideRight = currentIndex < totalCards - 1;

  const handleNext = () => {
    if (canSlideRight) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (canSlideLeft) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Calculate progress percentage
  const progressPercentage = ((currentIndex + 1) / totalCards) * 100;

  return (
    <div className="slider-container relative w-full max-w-[80vw] mx-auto overflow-hidden">
      {/* Slider Cards */}
      <div
        className="cards-wrapper flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${totalCards * 100}%`,
        }}
      >
        {cards.map((card:any, index:any) => (
          <div
            key={index}
            className="card flex-shrink-0 w-full p-0 box-border"
          >
            <TestimonialsCard card={card} index={index} variation={3}
            mode={mode}
            />

          </div>
        ))}
      </div>

      <div className="flex flex-row items-center justify-between max-w-[80vw] gap-[1rem] h-[50px] w-[100vw] mx-auto">
    {/* Progress Bar (Bottom-Left) */}
      <div className="w-1/4 bg-gray-200 rounded-full overflow-hidden h-2">
        <div
          className="bg-green-500 h-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Navigation Buttons (Bottom-Right) */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handlePrev}
          disabled={!canSlideLeft}
          className={`h-[30px] w-[30px] bg-foreground rounded-[7px] hover:bg-primary text-primary hover:text-foreground ${
            !canSlideLeft ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          disabled={!canSlideRight}
          className={`h-[30px] w-[30px] bg-foreground rounded-[7px] hover:bg-primary text-primary hover:text-foreground ${
            !canSlideRight ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &gt;
        </button>
      </div>
    </div>
    </div>
  );
};

export default TestimonialsCardsSlider_phone;
