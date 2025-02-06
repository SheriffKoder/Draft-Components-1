"use client"

import { useState } from "react";
import TestimonialsCard from "./TestimonialsCard";

const Slider = ({ cards, variation, mode, handleShowModal }: { cards: any, variation: number, mode?: string, handleShowModal?: (identifier:string) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = cards.length;
  const visibleCards = 3; // Number of visible cards in the slider at once

  const canSlideLeft = currentIndex > 0;
  const canSlideRight = currentIndex < totalCards - visibleCards;

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
  const progressPercentage = ((currentIndex + 1) / (totalCards - visibleCards + 1)) * 100;

  return (

    <div className="relative">

        <div className="slider-container relative w-full overflow-hidden">
        {/* Slider Cards */}
        <div
            className="cards-wrapper transition-transform duration-300 ease-in-out flex flex-row gap-[1rem] "
            style={{
            transform: `translateX(-${currentIndex * (100 / visibleCards) }%)`,
            }}
        >
            {cards.map((card: any, index: number) => (
                <div key={index} className="flex-shrink-0 w-[calc(100%/3)]">
                    <TestimonialsCard card={card} index={index} variation={variation}
                    mode={mode}
                    />
                </div>
              ))}
        </div>


        </div>

    <div className="flex flex-row items-center justify-between gap-[1rem] h-[50px] w-[80%] mx-auto">
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

export default Slider;
