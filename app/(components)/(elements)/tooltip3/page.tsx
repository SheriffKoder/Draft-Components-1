import React from 'react'
import { Tooltip } from './tooltip'

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
      <Tooltip content="Tooltip content"
      delay={300}
      position="bottom"
      maxWidth="200px"
      className="text-white"
      fontColor="text-white"
      backgroundColor="bg-blue-500"
      >
        <div className="text-black bg-primary">Hover me</div>
      </Tooltip>
    </div>
  )
}

export default page
