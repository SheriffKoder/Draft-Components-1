import React, { useEffect, useState } from 'react'

interface RandomTextAnimatorProps {
  children: string
  isActive: boolean
  duration?: number
  interval?: number
  className?: string
  firstDelay?: number
}

const RandomTextAnimator: React.FC<RandomTextAnimatorProps> = ({ 
  children, 
  isActive, 
  duration = 1000, 
  interval = 100,
  className = "",
  firstDelay = 0
}) => {
  const [animatedText, setAnimatedText] = useState(children || '')
  const [isDelayed, setIsDelayed] = useState(false);
  
    const targetText = children || ''
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
    const characters = '0123456789@#$%';
    
  useEffect(() => {
    if (isActive && targetText) {
        if (!isDelayed) {
                setAnimatedText(
                    targetText
                      .split('')
                      .map(char => {
                        if (char === ' ') return ' '
                        return characters[Math.floor(Math.random() * characters.length)]
                      })
                      .join('')
                  )

                setIsDelayed(true)
        }

        let intervalId: NodeJS.Timeout | null = null;
        
        setTimeout(() => {
            intervalId = setInterval(() => {
                setAnimatedText(
                targetText
                .split('')
                .map(char => {
                if (char === ' ') return ' '
                return characters[Math.floor(Math.random() * characters.length)]
                })
                .join('')
            )

            }, interval)
      }, firstDelay)

      const timeout = setTimeout(() => {
        if (intervalId) {
            clearInterval(intervalId)
        }
        setAnimatedText(targetText)
      }, duration+firstDelay)

      return () => {
        if (intervalId) {
            clearInterval(intervalId)
        }
        if (timeout) {
            clearTimeout(timeout)
        }
      }
    } else {
      setAnimatedText(targetText)
    }
  }, [isActive, targetText, duration, interval])

  return <span className={`${className}`}>{animatedText}</span>
}

export default RandomTextAnimator 