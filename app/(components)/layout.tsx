import Link from "next/link";
import React from "react";


export default function Layout({
    children,
  }:{
    children: React.ReactNode;
  }) {
    return (
        <main className="relative">
            {children}
            <div className="absolute bottom-[1rem] w-full flex items-center justify-center">
                <Link href="/" className="text-center text-neutral-700 hover:text-white transition-colors">back</Link>
            </div>
        </main>
    );
  }