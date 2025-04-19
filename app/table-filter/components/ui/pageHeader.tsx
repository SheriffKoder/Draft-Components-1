import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

/**
 * PageHeader component displays a header section with a title, optional subtitle, and user button
 * @param {Object} props - Component props
 * @param {string} props.text - Main title text to display
 * @param {string} [props.subText] - Optional subtitle text to display below the main title
 * @returns {JSX.Element} Header component with title and user button
 */
const PageHeader = ({ text, subText }: { text: string; subText?: string }) => {
  return (

    <div
    className="h-[100px] flex justify-between items-center p-[1rem]
    border-b border-sgrey mx-[1rem]"
    >
      {/* Left side - Title and subtitle section */}
      <div className="flex flex-col items-start justify-start">
        <h1 className="heading1 capitalize">{text}</h1>
        <p className="text-sm text-muted-foreground">{subText}</p>
      </div>

      {/* Right side - User button */}
      {/* <UserButton /> */}

    </div>
  );
};

export default PageHeader;
