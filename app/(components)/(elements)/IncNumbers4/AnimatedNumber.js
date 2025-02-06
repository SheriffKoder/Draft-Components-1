import React, { useEffect, useState } from "react";
import "./AnimatedNumber.css";

const AnimatedNumber = ({ value, duration = 1000 }) => {
  const [formattedParts, setFormattedParts] = useState({
    millions: null,
    thousands: null,
    lastThreeDigits: "0",
  });

  const [fadeIn, setFadeIn] = useState({ thousands: false, millions: false });

  // Format the number into parts: millions, thousands, and last three digits
  const formatNumberParts = (number) => {
    const numberStr = number.toString().padStart(9, "0"); // Ensure 9 digits with leading zeros
    const millions = parseInt(numberStr.slice(0, 3), 10); // First 3 digits
    const thousands = parseInt(numberStr.slice(3, 6), 10); // Middle 3 digits
    const lastThreeDigits = parseInt(numberStr.slice(6, 9), 10); // Last 3 digits

    return {
      millions: millions > 0 ? millions.toString() : null, // No padding for millions
      thousands:
        millions > 0 // If millions exist
          ? thousands.toString().padStart(3, "0") // Pad thousands to 3 digits
          : thousands > 0 // If no millions, display naturally
          ? thousands.toString()
          : null,
      lastThreeDigits:
        millions > 0 || thousands > 0 // If millions or thousands exist
          ? lastThreeDigits.toString().padStart(3, "0") // Pad last three digits to 3 digits
          : lastThreeDigits.toString(), // Otherwise, display naturally
    };
  };

  useEffect(() => {
    const parts = formatNumberParts(value);

    // Trigger fade-in effect when fields appear
    if (parts.millions && !formattedParts.millions) {
      setFadeIn((prev) => ({ ...prev, millions: true }));
    }

    if (parts.thousands && !formattedParts.thousands) {
      setFadeIn((prev) => ({ ...prev, thousands: true }));
    }

    setFormattedParts(parts);
  }, [value]);

  return (
    <div className="animated-number flex flex-row justify-end w-[300px] border">
      {/* Millions Section */}
      <div className="millions-section">
        {formattedParts.millions && (
          <div
            className={`millions ${fadeIn.millions ? "fade-in" : "opacity-0"}`}
          >
            {formattedParts.millions.split("").map((digit, index) => (
              <div
                key={`millions-${index}`}
                className="digit-container"
                style={{
                  transform: `translateY(calc(-1em * ${digit}))`,
                  "--roll-duration": `${duration}ms`,
                }}
              >
                {[...Array(10).keys()].map((num) => (
                  <span key={num} className="digit">
                    {num}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}
        {formattedParts.millions && <span className="comma">,</span>}
      </div>

      {/* Thousands Section */}
      <div className="thousands-section">
        {formattedParts.thousands && (
          <div
            className={`thousands ${fadeIn.thousands ? "fade-in" : "opacity-0"}`}
          >
            {formattedParts.thousands.split("").map((digit, index) => (
              <div
                key={`thousands-${index}`}
                className="digit-container"
                style={{
                  transform: `translateY(calc(-1em * ${digit}))`,
                  "--roll-duration": `${duration}ms`,
                }}
              >
                {[...Array(10).keys()].map((num) => (
                  <span key={num} className="digit">
                    {num}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}
        {formattedParts.thousands && <span className="comma">,</span>}
      </div>

      {/* Last Three Digits Section */}
      <div className="last-three-section">
        <div className="last-three-digits fade-in">
          {formattedParts.lastThreeDigits.split("").map((digit, index) => (
            <div
              key={`last-${index}`}
              className="digit-container"
              style={{
                transform: `translateY(calc(-1em * ${digit}))`,
                "--roll-duration": `${duration}ms`,
              }}
            >
              {[...Array(10).keys()].map((num) => (
                <span key={num} className="digit">
                  {num}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedNumber;
