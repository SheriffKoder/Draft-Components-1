"use client"
import { Flippen } from "./Flip";
import { useEffect, useState } from "react";
// https://codesandbox.io/p/sandbox/react-flip-countdown-timer-forked-wpvqy8?file=%2Fsrc%2FFlippen.js%3A10%2C30


function FlipClock2() {
  const [num, setNum] = useState(36);


  return (
    <div>
        <Flippen value={num} />


        <div className="flex flex-row gap-2 my-[2rem]">
            <button className="danger" onClick={() => {setNum(num - 1); console.log(num)}}>
            Decrease by 1
            </button>


            <button onClick={() => setNum(num + 1)}>Increase by 1</button>


            <button className="danger" onClick={() => setNum(num - 10)}>
                Decrease by 10
            </button>


            <button onClick={() => setNum(num + 10)}>Increase by 10</button>
        </div>

     
    </div>
  );
}

export default FlipClock2;
