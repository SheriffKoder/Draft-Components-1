"use client"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

// import { socials } from "@/constants/constants"
// import SocialIcons from "./Helpers/social"

const Footer = () => {

    const path = usePathname().split("/")[1];
    //single project page check
    const path2 = usePathname().split("/");

    // console.log(path2);
  return (
    <></>
  )
}

export default Footer