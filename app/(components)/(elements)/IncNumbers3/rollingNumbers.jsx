import "@layflags/rolling-number"; // Import the library (adjust path if needed)
// https://github.com/layflags/rolling-number
import React, { useEffect, useState } from "react";
import "./laymans.css"



const RollingNumber = ({ value, duration = 2000 }) => {
  const [animatedParts, setAnimatedParts] = useState({ millions: 0, thousands: 0, lastThreeDigits: 0 });

  const formatNumberParts = (number) => {
    const numberStr = number.toString().padStart(9, "0"); // Ensure consistent 9-digit padding

    const lastThreeDigits = parseInt(numberStr.slice(-3), 10); // Last three digits
    const thousands = parseInt(numberStr.slice(-6, -3), 10);   // Middle three digits
    const millions = parseInt(numberStr.slice(-9, -6), 10);   // First three digits
    console.log(value, millions+thousands+lastThreeDigits, millions, thousands, lastThreeDigits)
    return { millions, thousands, lastThreeDigits };
  };

  useEffect(() => {
    const { millions, thousands, lastThreeDigits } = formatNumberParts(value);

    // Push the new parts to the animated state
    setAnimatedParts({
      millions: millions || 0,
      thousands: thousands || 0,
      lastThreeDigits: lastThreeDigits || 0,
    });
  }, [value]);

  const { millions, thousands, lastThreeDigits } = animatedParts;

  return (
    <div className="rolling-number-container flex flex-row justify-end w-[500px] border">

      {/* Render the millions part */}
      <span className={`millions ${millions > 0 ? 'opacity-100' : 'opacity-0'}`}>
        <layflags-rolling-number value={millions} duration={duration}></layflags-rolling-number>
      </span>
      {millions > 0 && <div className={`rollingComma`}>,</div>}


      {/* Render the thousands part */}
      <span className={`thousands ${thousands > 0 ? 'opacity-100' : 'opacity-0'}`}>
        <layflags-rolling-number value={thousands} duration={duration}></layflags-rolling-number>
      </span>
      {thousands > 0 && <div className={`rollingComma`}>,</div>}


      {/* Render the last three digits */}
      <layflags-rolling-number value={lastThreeDigits} duration={duration}></layflags-rolling-number>
    
    </div>
  );
};

export default RollingNumber;
