
"use client";


// import React from 'react'
import DarkModeToggle from "./DarkModeToggle"
import { bodyNoScroll } from "./utils/bodyNoScroll";


//01.03
import Link from "next/link";
import Image from "next/image";
import {useState, useEffect, useRef} from "react";


//02X.04
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


import constants from "@/app/(components)/(UI)/NavRE/constants";
import { nav_link_type } from "./types";
import Nav_svg from "@/public/SVG/nav_link";
import Nav_user_logo from "@/public/SVG/nav_user_logo";
import "./Nav.css"

const Nav = () => {

  //02X.04
  //get the session object
  //destructure out the data and status the data will be the user (if successfully signed in)
  // according to different status can render different UI
  // const { data: session, status } = useSession();      //get the status //edited
  let session = {
    user: "hi "
  }
  const isAuth = status === "authenticated";  //use the status
  const router = useRouter();
  const [userIconBG,setUserIconBG] = useState("bg-ui_bright_not_active dark:bg-ui_dark_not_active");

  //user icon drop down, to show login/signup or go to profile, signout etc...
  function handleDropDownIcon (input : string) {
      
      if( input === "leave" ) {
        document.querySelector(".nav-user-menu")?.classList.remove("flex");
        document.querySelector(".nav-user-menu")?.classList.add("hidden");
        // document.querySelector(".nav-user-icon")?.classList.remove("agentNavIcon_background");
        setUserIconBG("bg-[#bebebe2e] dark:bg-[#4f4f4f2e]");

      } else if ( input === "enter" ) {
        document.querySelector(".nav-user-menu")?.classList.add("flex");
        document.querySelector(".nav-user-menu")?.classList.remove("hidden");
        // document.querySelector(".nav-user-icon")?.classList.add("agentNavIcon_background");
        setUserIconBG("dark:bg-[#212121] bg-white");

      }
      

      // setToggleDropDown((prev)=>!prev);
  }


  function showLogin () {
    let loginComponent = document.getElementById("login__container");
    let signUpComponent = document.getElementById("signUp__container");

    if (signUpComponent?.style.display === "flex") {
      signUpComponent!.style.display = "none";
    }

    loginComponent!.style.display = "flex";

    document.querySelector(".nav-user-menu")?.classList.remove("flex");
    document.querySelector(".nav-user-menu")?.classList.add("hidden");

  }

  function showSignUp () {
    let signUpComponent = document.getElementById("signUp__container");
    let loginComponent = document.getElementById("login__container");

    if (loginComponent?.style.display === "flex") {
      loginComponent!.style.display = "none";
    }

    signUpComponent!.style.display = "flex";

    document.querySelector(".nav-user-menu")?.classList.remove("flex");
    document.querySelector(".nav-user-menu")?.classList.add("hidden");

  }


  //01.04
  // const [providers, setProviders] = useState(null);


  const toggleDropDown = useRef("false");
  // let isUserLoggedIn = false;


  return (
    <nav className="w-full px-2 md:px-12  max-w-7xl absolute my-8">

      <span className=" dark:bg-ui_dark bg-ui_bright
       text-accent_bright dark:text-accent_dark
       flex flex-row gap-3 
      rounded-full px-2 shadow-l  text-sm mx-auto
      glass-container-background-3
      ">

        <ul className="flex flex-row items-center gap-3 ml-2 h-12" aria-label="main navigation links">
        
          {/* company logo icon */}
          <li className="h-full">
              <Link href="/" className=" flex items-center h-full nav-icon gap-2 flex-center" aria-label="home page link">
                <Nav_svg/>
              </Link>
          </li>

          {
          constants.nav_links.map((link:nav_link_type) => (
            <li className="h-full" key={link.text+" Link"}>
              <Link href={link.href} aria-label={link.aria} className="hover:opacity-80 flex items-center h-full css_transition">
                {link.text}
              </Link>
            </li>
          ))
          }
        </ul>


        {/* user icon, user menu (hidden and displayed by click or mouse-enter), theme toggle icon */}
        <span className="bg-red ml-auto flex flex-row gap-3 items-center relative">

          {/* user icon, drop down handles */}
          <span 
          onClick={()=>{ if (toggleDropDown.current === "false") { handleDropDownIcon("enter"); toggleDropDown.current = "true"; } else { handleDropDownIcon("leave"); toggleDropDown.current = "false";}}}
          onMouseLeave={()=>{handleDropDownIcon("enter");}}
          >

            {/* user icon */}
            {/* optional bg */}
            {/* .

            
            */}
            <button type="button" className={`
            nav-user-icon flex gap-2 items-center justify-center rounded-full border-0 
            h-7 w-7
            hover:dark:bg-ui_dark_active hover:bg-ui_bright_active
            focus:dark:bg-ui_dark_active focus:bg-ui_bright_active
            bg-ui_bright_not_active dark:bg-ui_dark_not_active
            css_transition hover:opacity-100
            `}
            // onMouseEnter={()=>{setUserIconBG("dark:bg-ui_dark_active bg-ui_bright_active")}}
            // onClick={()=>{setUserIconBG("dark:bg-ui_dark_active bg-ui_bright_active")}}
            // onMouseLeave={()=>{setUserIconBG("bg-ui_bright_not_active dark:bg-ui_dark_not_active")}}
            aria-label="open user menu">

              <Nav_user_logo/>

            </button>
          </span >


          {/* user menu - logged in - positioned absolute*/}
          {/* {isAuth && ( */}
          {session?.user && (
            <div className="nav-user-menu  hidden dark:bg-ui_dark bg-ui_bright"
            // onMouseLeave={()=>handleDropDownIcon("leave")}
            onMouseLeave={()=>{handleDropDownIcon("leave"); console.log(session?.user);}}
            >
                <ul className="flex flex-col items-center justify-center w-full">

                  <li className="py-2 border-b-[1px] dark:border-ui_dark_menu_border border-ui_bright_menu_border
                  w-full text-center dark:hover:bg-ui_dark_menu_button_hover_bg rounded-t-[17px] hover:bg-ui_bright_menu_button_hover_bg">
                    <Link href={"/agents/+session?.user.id"} className="w-full flex justify-center">
                      Go to Profile
                    </Link>
                  </li>
                  {/* //edited */}
                  
                  {/* 02X.4 */}
                  {/* //02X.07 */}
                  <li className=" py-2 w-full text-center dark:hover:bg-ui_dark_menu_button_hover_bg  hover:hover:bg-ui_bright_menu_button_hover_bg rounded-b-[17px] ">
                  <button type="button" className="w-full flex justify-center"
                  onClick={()=>{signOut({ redirect: false }).then(()=> {localStorage.removeItem("loggedIn"); router.push("/");})}}
                  // onClick={()=>signOut()}

                  >
                      Sign out
                    </button>
                  </li>

                </ul>
            </div>
          )}

          {/* user menu - not logged in - positioned absolute */}
          {/* {!isAuth && ( */}
          {!session?.user && (
            <div className="nav-user-menu hidden dark:bg-ui_dark bg-ui_bright"
            onMouseLeave={()=>handleDropDownIcon("leave")}
            >
                <ul className="flex flex-col items-center justify-center w-full">

                  <li className=" py-2 w-full text-center dark:hover:bg-ui_dark_menu_button_hover_bg  hover:hover:bg-ui_bright_menu_button_hover_bg rounded-t-[17px]">
                    <button onClick={() => {bodyNoScroll(); showLogin()}} className="w-full flex justify-center">
                      Login
                    </button>
                  </li>

                  <li className=" py-2 w-full text-center dark:hover:bg-ui_dark_menu_button_hover_bg  hover:hover:bg-ui_bright_menu_button_hover_bg rounded-b-[17px]">
                    <button onClick={() => {bodyNoScroll(); showSignUp()}} className="w-full flex justify-center">
                      Sign up
                    </button>
                  </li>

                </ul>
            </div>
          )}

          {/* the theme toggle icon */}
          <DarkModeToggle/>

        </span>

      </span>



    </nav>
  )
}

export default Nav;