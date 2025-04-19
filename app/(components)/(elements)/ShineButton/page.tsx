import React from 'react'
import ShineButton from './ShineButton'
const page = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-black">
      <ShineButton text="Click me" variant="primary" href="/" />
    </div>
  )
}

export default page
