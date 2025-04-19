"use client";
import type { Metadata } from "next";
import Image from "next/image";
import SideNav from "./sidebar";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapse, setIsCollapse] = useState(false);

  return (
    <div className="min-h-screen flex">
      <SideNav isCollapse={isCollapse} setIsCollapse={setIsCollapse} />
      <main className={`flex-1 ${isCollapse ? "pl-[80px]" : "pl-[200px]"}`}>
        {children}
      </main>
    </div>
  );
}
