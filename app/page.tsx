import Image from "next/image";
import {
  componentsCSSPerspective, 
  componentsUI,
  components3D,
  componentsElements,
  componentsGsap,
  componentsBackground,
  OliverComponents,
  LunComponents
} from "@/constants/HomeComponents";

import HomeCardLink from "@/components/home/HomeCardLink";
import mainLogo from "@/public/mainLogo.png"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pb-24">
      <div className="z-10 w-full items-center justify-between font-bold text-normal">
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

      <div className="relative h-[50vh] z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src={mainLogo}
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

        <div className="grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left gap-4 px-5">

          <h1 className="col-span-full text-2xl font-bold">3D Elements</h1>
          {components3D.map((component) => (
            <HomeCardLink key={component.title} cmp={component} />
          ))}

          <h1 className="col-span-full text-2xl font-bold mt-20">CSS Perspective</h1>
          {componentsCSSPerspective.map((component) => (
            <HomeCardLink key={component.title} cmp={component} />
          ))}

          <h1 className="col-span-full text-2xl font-bold mt-20">Layout & UI</h1>
          {componentsUI.map((component) => (
            <HomeCardLink key={component.title} cmp={component} />
          ))}

          <h1 className="col-span-full text-2xl font-bold mt-20">Backgrounds</h1>
          {componentsBackground.map((component) => (
            <HomeCardLink key={component.title} cmp={component} />
          ))}

          <h1 className="col-span-full text-2xl font-bold mt-20">Elements</h1>
          {componentsElements.map((component) => (
            <HomeCardLink key={component.title} cmp={component} />
          ))}

          <h1 className="col-span-full text-2xl font-bold mt-20">GSAP</h1>
          {componentsGsap.map((component) => (
            <HomeCardLink key={component.title} cmp={component} />
          ))}

          <h1 className="col-span-full text-2xl font-bold mt-20">Olivier Larose</h1>
          {OliverComponents.map((component) => (
            <HomeCardLink key={component.title} cmp={component} />
          ))}

          <h1 className="col-span-full text-2xl font-bold mt-20">LunDev</h1>
          {LunComponents.map((component) => (
            <HomeCardLink key={component.title} cmp={component} />
          ))}
          
        </div>
    </main>
  );
}
