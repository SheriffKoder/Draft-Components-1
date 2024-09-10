// import React from 'react'

"use client";
import ScrollBarEdit from "./utils/ScrollBarEdit";
import Head from "next/head";
import { useState, useEffect } from "react";

//the dark toggle icons, localStorage set on click/initial render/, icon management
// to activate, just place   darkMode: 'class', in the tailwind.config.js below the component array
// add the constants colors to tailwind.config.js
// use the icons in the public directory

const DarkModeToggle = () => {

    //called when pressing the button on the UI ti call the changing function
    function handleToggle () {

        const toggleBG = document.querySelector("#toggleBG");
        const toggleBT = document.querySelector("#toggleBT");
        const toggleSp = document.querySelector("#mySpan");


        if (localStorage.RE_Website_theme === "light") {

            setTheme("dark");

        } else if (localStorage.RE_Website_theme === "dark") {

            setTheme("light");
        }
    }


    //view the proper theme icon and change scroll
    function setTheme (theme: string) {

        const toggleBT = document.querySelector("#toggleBT");
        const toggleSp = document.querySelector("#mySpan");
        
        //part 11 - custom scroll
        const body = document.querySelector("html");  
        //add the animation to the scroll to fade out and display a scroll with background color and no thumb  
        body?.addEventListener("wheel", ScrollBarEdit);


        let nextTheme :string;
        let toggleBGColor: string;

        (theme === "light") ? nextTheme = "dark" : nextTheme = "light";

        if (theme === "light") {

            toggleBT?.classList.remove(`bg-[url('/SVG/light-theme-icon.svg')]`);
            toggleBT?.classList.add(`bg-[url('/SVG/dark-theme-icon.svg')]`);

            //part 11 - custom scroll
            body?.classList.remove("dark_scroll");
            body?.classList.add("light_scroll");

        } else {

            toggleBT?.classList.remove(`bg-[url('/SVG/dark-theme-icon.svg')]`);
            toggleBT?.classList.add(`bg-[url('/SVG/light-theme-icon.svg')]`); 

            //part 11 - custom scroll
            body?.classList.remove("light_scroll");
            body?.classList.add("dark_scroll");

        }

        localStorage.setItem("RE_Website_theme", theme);

        //move the icon left or right depending on the themes from/to
        window.document.documentElement.classList.remove(nextTheme);
        window.document.documentElement.classList.add(theme);

      
        toggleSp?.classList.remove(`toggle-animation-${nextTheme}`);
        toggleSp?.classList.add(`toggle-animation-${theme}`);


        //part 11 - custom scroll
        //add the animation to the scroll to fade out and display a scroll with background color and no thumb
        ScrollBarEdit(); 
    }

  
    //set the session storage to a theme string value (1)
    useEffect(() => {

        //not need to cause a re-render
        //on initial render set to light
        // localStorage.setItem("theme", "light");

        //use the correct theme from the start of page view
        //based on the inserted theme in jsx or the present session variable to avoid any starting bugs
        if (localStorage.RE_Website_theme === "light" || localStorage.RE_Website_theme === "dark") {
            window.document.documentElement.classList.add(localStorage.RE_Website_theme);
        } 
        else if (localStorage.RE_Website_theme ==  undefined && window.document.documentElement.classList.contains("dark")) {
            localStorage.RE_Website_theme = "dark";
        } else if (localStorage.RE_Website_theme ==  undefined && window.document.documentElement.classList.contains("light")) {
            localStorage.RE_Website_theme = "light";

        } else {
            localStorage.RE_Website_theme = "light";
            window.document.documentElement.classList.add(localStorage.RE_Website_theme);

        }

        setTheme(localStorage.RE_Website_theme);
    });

    return (
      
        <div 
        id="toggleBG"
        className="relative flex flex-row rounded-full border-0 bg-[#bebebe2e] dark:bg-[#4f4f4f2e] h-8 w-16 cursor-pointer p-1">

            <span id="mySpan" className="flex flex-row justify-end w-6">
                <button
                id="toggleBT"
                aria-label="toggle the web site's theme"
                className="hover:brightness-95 dark:hover:brightness-75 h-6 w-6 dark:bg-[#e6e5e57a] bg-white rounded-full dark:invert
                bg-[length:13px_13px] bg-center bg-no-repeat"
                onClick={handleToggle}>
                    
                </button>
            </span>

        </div>
    )
}

export default DarkModeToggle;