
interface StaticDownloadIconProps {
  color?: string;
  className?: string;
}

/**
 * AnimatedDownloadIcon Component
 * A custom animated download icon with arrow movement effect
 * 
 * @param {StaticDownloadIconProps} props - Component props
 * @returns {JSX.Element} Rendered animated icon
 */
export function StaticDownloadIcon({ 
  color = "rgb(214, 178, 255)", // Default purple color from the original design
  className = "",
}: StaticDownloadIconProps) {
  return (
    <>
      <style jsx>{`
        .Btn {
        color: ${color};
        }


        ${!color ? `
        .Btn {
          color: black;
        }
        ` : ''}
      `}</style>
       <span className={`Btn ${className}`}></span>
    </>
  );
}