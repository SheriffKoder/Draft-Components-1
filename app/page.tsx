"use client"
import Image from "next/image";
import {
  componentsCSSPerspective, 
  componentsUI,
  components3D,
  componentsElements,
  componentsGsap,
  componentsBackground,
  OliverComponents,
  LunComponents,
  Sliders,
  componentsFunctionalities,
  FramerMotion,
  chartComponents,
  componentsGsap2,
  GSAPText
} from "@/constants/HomeComponents";
import { useState, useMemo } from "react";

import HomeCardLink from "@/components/home/HomeCardLink";
import mainLogo from "@/public/mainLogo.png"

export default function Home() {
  const [activeTab, setActiveTab] = useState("Display");
  
  const categories = [
    { title: "3D Elements", components: components3D },
    { title: "CSS Perspective", components: componentsCSSPerspective },
    { title: "Layout & UI", components: componentsUI },
    { title: "Backgrounds", components: componentsBackground },
    { title: "Elements", components: componentsElements },
    { title: "Functionalities", components: componentsFunctionalities },
    { title: "Framer Motion", components: FramerMotion },
    { title: "GSAP", components: componentsGsap },
    { title: "GSAP custom", components: componentsGsap2 },
    { title: "GSAP text", components: GSAPText },
    { title: "Olivier Larose", components: OliverComponents },
    { title: "LunDev", components: LunComponents },
    { title: "Image Sliders", components: Sliders },
    { title: "Chart Components", components: chartComponents }, 
  ];

  // Generate 6 random components from all categories
  const randomComponents = useMemo(() => {
    // Flatten all components into a single array
    const allComponents = categories.flatMap(category => category.components);
    
    // Shuffle the array and take the first 6 items
    return [...allComponents]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
  }, [categories]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pb-24">
      
      <div className="hidden z-10 w-full items-center justify-between font-bold text-normal">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b 
        border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 
        dark:bg-zinc-800/30 dark:from-inherit">
          My Components&nbsp;
          {/* <code className="font-mono font-bold">app/page.tsx</code> */}
        </p>
        {/* <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div> */}
      </div>



      <div className="w-full px-[3vw] flex flex-col items-center overflow-hidden">
        <div className="flex flex-row justify-between items-center pt-[5vh] pb-[30px]">
          {/* Tab Switcher */}
          <div className="w-[50%] flex flex-wrap justify-start gap-4 mb-2 mt-8">
            <button
              onClick={() => setActiveTab("Display")}
              className={`px-4 py-2 font-medium transition-colors rounded-lg ${
                activeTab === "Display"
                  ? "text-white bg-blue-600"
                  : "text-white/80 bg-white/20"
              }`}
            >
              Display
            </button>
            {categories.map((category) => (
              <button
                key={category.title}
                onClick={() => setActiveTab(category.title)}
                className={`px-4 py-2 font-medium transition-colors rounded-lg ${
                  activeTab === category.title
                    ? "text-white bg-blue-600"
                    : "text-white/80 bg-white/20"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src={mainLogo}
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>

        </div>

        
        {/* Divider Line */}
        <div className="w-full h-px bg-gray-300 dark:bg-gray-700 mb-8"></div>
        
        {/* Component Cards */}
        <div className="flex-1 w-[90vw] overflow-y-auto" style={{ maxHeight: 'calc(100vh - 250px)' }}>
          <div className="grid text-center vp4:mb-0 vp4:w-full vp4:grid-cols-3 vp4:text-left gap-4">
            {activeTab === "Display" ? (
              <div className="col-span-full">
                <h1 className="col-span-full text-2xl font-bold mb-6">Featured Components</h1>
                <div className="grid vp4:grid-cols-3 gap-4">
                  {randomComponents.map((component) => (
                    <HomeCardLink key={component.title} cmp={component} />
                  ))}
                </div>
              </div>
            ) : (
              categories.map((category) => (
                category.title === activeTab && (
                  <div key={category.title} className="col-span-full">
                    <h1 className="col-span-full text-2xl font-bold mb-6">{category.title}</h1>
                    <div className="grid vp4:grid-cols-3 gap-4">
                      {category.components.map((component) => (
                        <HomeCardLink key={component.title} cmp={component} />
                      ))}
                    </div>
                  </div>
                )
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
