import React from 'react'
import Link from 'next/link'
import MainLogo from '@/components/LoadingLogo/LogoSVGs/MainLogo'

const MainNavLinks = [
    {
        text:"Shop",
        href: "/",
        type: "normal"
    },
    {
        text:"About",
        href: "/",
        type: "normal",
    },
    {
        text:"Contact",
        href: "/",
        type: "button",
    }
]

const Page = () => {
  return (
    <main className="relative">
        <header className="fixed w-full pl-4 pr-4 pt-5 pb-8 text-[#ffffff]"
        style={{background: "linear-gradient(180deg, rgba(0,0,0,0.23) 0%, rgba(0,0,0,0.115) 30%, rgba(0,0,0,0.04) 70%, rgba(0,0,0,0) 100%)"}}
        >
            <nav className="flex flex-row justify-between">
                <div className="flex flex-row gap-1 w-[100px] mr-10">
                    <span className="mt-[-0.125rem]">
                        <MainLogo color="ffff" size="20px"/>
                    </span>
                    <p className="font-write tracking-wider text-xs">Brand name</p>
                </div>

                <ul className="flex flex-row justify-between uppercase text-xs flex-1 max-w-[calc(90px*3)]">
                    { MainNavLinks.map((link) => (
                        <li key={"main navigation link "+link.text}>
                            <Link href={link.href}
                            className={`${link.type === "button" ? 'px-3 py-1 bg-indigo-600 rounded-full text-white' : null}`}>{link.text}</Link>
                        </li>
                    ))}
                </ul>

            </nav>
        </header>

        <div className="h-[50vh] w-full bg-indigo-950">

        </div>
        <div className="h-[50vh] w-full bg-indigo-900">

        </div>
        <div className="h-[50vh] w-full bg-indigo-950">

        </div>


        <footer className="flex flex-row justify-between items-center px-4 min-h-[10vh]
        bg-[#00000051] font-nunito lowercase text-sm text-white">
        <ul className="flex flex-row gap-4">
            {MainNavLinks.map((link)=> (
                <li key={"footer link "+link.text}>
                    <Link href={link.href} className="p-2">{link.text}</Link>
                </li>
            ))}
        </ul>

        <span className="flex flex-row gap-2 items-center justify-center">
            <MainLogo color="#ffff" size="20px" />
            <Link href="/" className="p-2 capitalize">Brand name</Link>
        </span>


    </footer>

    </main>
  )
}

export default Page