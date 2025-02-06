"use client"
import React, { useState } from "react";
import AnimatedNumber from "./AnimatedNumber";


const App = () => {
  const [number, setNumber] = useState(1);

  const addRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1; // Random number between 1 and 1000
    setNumber((prev) => prev + randomNumber + 100000);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Rolling Animated Number</h1>
      <AnimatedNumber value={number} duration={500} />
      <button onClick={addRandomNumber} style={{ marginTop: "1rem" }}>
        Increment
      </button>
    </div>
  );
};

export default App;
