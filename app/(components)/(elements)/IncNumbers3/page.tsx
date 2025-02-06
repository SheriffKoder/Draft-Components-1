"use client"
import React, { useState } from "react";
import RollingNumber from "./RollingNumbers";
import NumberCounter from "./NumberCounter"
const Page = () => {

const [number, setNumber] = useState(10);

const addRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1; // Random number between 1 and 1000
    setNumber((prev) => prev + randomNumber + 100000);
  };

  return (
    <div className='flex items-center justify-center h-[100vh] flex-col gap-[5rem]'>
        <NumberCounter targetNumber={1234567} duration={3000} />

        <div>
            <h1>Rolling Number Animation</h1>
            <RollingNumber value={number} duration={3000} />
            <button
                onClick={addRandomNumber}
                style={{ marginTop: "20px" }}
            >
                Increment Number
            </button>
        </div>

    </div>
  )
}

export default Page
