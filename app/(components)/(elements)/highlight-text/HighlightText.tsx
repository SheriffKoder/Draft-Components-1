/**
 * Props interface for the HighlightText component
 * @interface HighlightTextProps
 * @property {string} text - The full text content to be displayed and searched through
 * @property {string} highlight - The search query string to highlight within the text
 */
interface HighlightTextProps {
    text: string;
    highlight: string;
}

// Takes two props: text (the full text to display) and highlight (the search query to highlight)
/**
 * A component that displays text with highlighted search matches
 * @param {HighlightTextProps} props - The component props
 * @param {string} props.text - The full text to display
 * @param {string} props.highlight - The search query to highlight
 * @returns {JSX.Element} A span element containing the text with highlighted matches
 */
export function HighlightText({ text, highlight }: HighlightTextProps) {

    // If there's no highlight text or the main text is empty, it returns the original text
    if (!highlight.trim() || !text) {
      return <span>{text}</span>;
    }

    // Uses regex to split the text into parts based on the highlight query (case-insensitive)
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  
    return (
      <span>
        {/* Maps through the parts */}
        {parts.map((part, index) => {
          // applies highlighting styles to matching segments
          // by checking if the part is exactly the same as the highlight (case-insensitive)
          const isMatch = part.toLowerCase() === highlight.toLowerCase();
          return (
            <span
              key={index}
              className={isMatch ? "bg-blue-500/80 text-black border-b-2 border-blue-200" : ""}
            >
              {part}
            </span>
          );
        })}
      </span>
    );
  }