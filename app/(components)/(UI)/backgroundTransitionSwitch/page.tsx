"use client"
import React from 'react'

const BackgroundTransitionSwitch = () => {

    // normal color animation
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {

        const color = e.currentTarget.getAttribute("data-color") as string;

        const root = document.documentElement;
        root.style.setProperty("--primary", color);

        return null;
    }


  return (
    <section className="FullScreen_CenteredFlex bg-primary transition-colors duration-500">
        <h1 className="text-3xl font-bold">GradientBackgroundSwitch</h1>
        <div className="container">
            <div className="mt-4 flex justify-center gap-3">
                <button
                onClick={handleClick}
                data-color="88 202 155" //custom attribute
                className="rounded-lg border px-3 py-1">
                    Green
                </button>

                <button
                onClick={handleClick}
                data-color="196 26 105"
                className="rounded-lg border px-3 py-1">
                    Pink
                </button>


                <button
                onClick={handleClick}
                data-color="102 65 169"
                className="rounded-lg border px-3 py-1">
                    Purple
                </button>


            </div>

        </div>
    </section>
  )
}

export default BackgroundTransitionSwitch