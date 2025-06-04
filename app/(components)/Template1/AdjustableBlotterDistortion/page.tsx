// This is a server component (no 'use client' directive)
import DistortedTextClient from './DistortedTextClient';



export default function Page() {
  // Server component renders the client component
  return <DistortedTextClient 
    text="DISTORT" 
    fontFamily="Monument, sans-serif"
    fontSize={180}
    fontColor="white"
    showControls={true}
  />;
}