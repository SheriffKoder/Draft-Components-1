"use client"
import { useEffect, useState } from 'react';

interface IncreasingNumbersProps {
  number: number;
  duration?: number; // Optional duration in milliseconds
}

const IncreasingNumbers = ({ number, duration = 1000 }: IncreasingNumbersProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < number) {
      // Calculate the interval based on the duration and target number
      const intervalTime = duration / number;
      
      const timer = setTimeout(() => {
        setCount(prev => prev + 1);
      }, intervalTime);

      return () => clearTimeout(timer);
    }
  }, [count, number, duration]);

  return (
    <span className='border w-[100px] text-end text-2xl font-bold'>
        {count.toString().split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        <span className={`${count === number ? "text-white" : "text-black"} absolute`}>+</span>
    </span>
    )
};

export default IncreasingNumbers;
