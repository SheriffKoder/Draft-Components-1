"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { routes } from "@/data/routes";
import { ChevronRightIcon } from "lucide-react";
import "./sidebar.css";



const routes = [
  {
    label: "home",
    href: "/",
    icon: "/images/home.svg",
  },
  {
    label: "side-nav",
    href: "/side-nav",
    icon: "/images/home.svg",
  },
  {
    label: "tab-gallery",
    href: "/tab-gallery",
    icon: "/images/home.svg",
  },
];    






const SideNav = ({
  isCollapse,
  setIsCollapse,
}: {
  isCollapse: boolean;
  setIsCollapse: Dispatch<SetStateAction<boolean>>;
}) => {
  let path = usePathname().split("/")[1];
  if (path === "time-logs") {
    path = "timelogs";
  }
  // console.log(path);

  const resetAnimation = () => {
    document.getElementById("pageLogo")?.classList.add("repeatcompanyLogoAnim");
    setTimeout(() => {
      document
        .getElementById("pageLogo")
        ?.classList.remove("repeatcompanyLogoAnim");
    }, 1000);
  };

  return (
    <nav
      className={` border border-sgrey2 h-[calc(100svh-10px)] fixed ml-[5px] my-[5px] bg-background z-[90] box_shadow_dark_main rounded-[3px] m-[0px]
    flex flex-col gap-[40px] pt-[20px] trans1
    ${isCollapse ? "w-[80px]" : "w-[205px]"}
    `}
    >
      {/* logo image and text */}
      <div
        className="pl-[12px] h-[60px] flex flex-row justify-start items-center overflow-hidden
        "
      >
        <div className="relative h-[55px] w-[55px]">
          <Image
            src="/images/sustainserv_logo.png"
            alt="Company Logo"
            width={88}
            height={85}
            className="companyLogoAnim hover:rotate-90 trans1"
            id="pageLogo"
          />

          {/* text-logo absolute to the logo image, to allow the image to be the main element in the side nav layout in this position without conflict on expansion and text-reveal */}
          <div
            className={`trans1 absolute right-[-120px] top-[50%] translate-y-[-50%] w-[110px] h-[45px]
                ${isCollapse ? "opacity-0" : "opacity-1"}`}
          >
            <Image
              src="/images/sustainserv_logo_text.png"
              alt="Company Logo"
              width={206}
              height={85}
            />
          </div>
        </div>

        {/* <h2 className="text-[14px]">sustain<span className="font-semibold">serv</span></h2> */}
      </div>

      {/* nav links and tool-tip */}
      <ul className="flex flex-col gap-[20px] px-[10px] w-full text_body2">
        {routes.map((link, index) => (
          <div className="relative sidebarLink-container" key={index}>
            <Link
              className={`bg-primary w-full h-[40px] rounded-lg overflow-hidden
                flex items-center pl-[18px] trans1 relative
                ${
                  path === link.label
                    ? "bg-primary text-background"
                    : "bg-transparent text-foreground hover:bg-sgrey2"
                }
                
                `}
              href={link.href}
              onClick={() => {
                resetAnimation();
              }}
            >
              <Image
                src={link.icon}
                alt=""
                width={20}
                height={20}
                className={`
                    ${path === link.label ? "invert" : ""}
                  `}
              ></Image>
              <div
                className={`capitalize pb-[1px] ml-[15px]
                    ${isCollapse ? "opacity-0" : "opacity-100"} trans1`}
              >
                {link.label.replace(/-/g, " ")}
              </div>
            </Link>

            {/* tooltip relative to each button */}
            {isCollapse && (
              <div
                className="toolbar-container absolute right-[-130px] translate-x-[-300px]
                    text-xs font-light
                    top-[1px] translate-y-[-50%]"
              >
                <div className="tooltip-box">
                  <div className="tooltip trans1">
                    <span className="triangle rotate-[270deg] translate-y-[-50%]"></span>
                    {link.label.replace(/-/g, " ").split(' ').map((word, index) => (
                      <span key={index}>
                        {word.charAt(0).toUpperCase() + word.slice(1)}
                        {index < link.label.replace(/-/g, " ").split(' ').length - 1 && ' '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </ul>

      {/* button triggers the state that changes the side bar's width */}
      <div
        onClick={() => {
          setIsCollapse(!isCollapse);
        }}
        className="w-[30px] flex mt-auto ml-[5px] mb-[5px]"
      >
        <div
          className="bg-sgrey flex items-center justify-center w-[30px] h-[30px] cursor-pointer
          rounded-[3px] mx-auto"
        >
          <ChevronRightIcon
            size={18}
            className={`${isCollapse ? "rotate-0" : "rotate-180"} trans1`}
          />
        </div>
      </div>
    </nav>
  );
};

export default SideNav;
