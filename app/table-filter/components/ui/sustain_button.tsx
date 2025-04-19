import React from 'react'

/**
 * A customizable button component with different sizes and variants
 * Allowing to keep the same style for all buttons with custom props
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The content to be rendered inside the button
 * @param {Function} [props.onClick] - Optional click handler function
 * @param {boolean} [props.disabled] - Whether the button is disabled
 * @param {"small" | "large"} props.size - The size of the button
 * @param {"primary" | "secondary"} props.variant - The visual style variant of the button
 * @param {"button" | "submit" | "reset"} [props.type] - The HTML button type
 */
const SustainButton = ({children, onClick, disabled, size, variant, type, className}: {
    children: React.ReactNode;
    onClick?: any;
    disabled?: boolean;
    size: "small" | "large";
    variant: "primary" | "secondary";
    type?: "button" | "submit" | "reset";
    className?: string;
}) => {
  return (
    <button
    className={`text-background bg-primary hover:bg-primary1 
    flex flex-row gap-[10px] items-center justify-center trans1 cursor-pointer
    ${disabled ? "opacity-50 cursor-not-allowed" : "    "}
    ${variant === "primary" ? "bg-primary hover:bg-primary1" : "bg-sgrey2 hover:bg-sgrey text-black/70"}
    ${size === "small" ? "text-[12px] py-[5px] px-[10px] min-w-[140px] min-h-[40px] rounded-[5px]" : "text-[14px] py-[7px] px-[40px] rounded-[10px]"}
    ${className}
    `}
        onClick={onClick}
        disabled={disabled}
        type={type}
    >   
      {children}
    </button>
  )
}

export default SustainButton
