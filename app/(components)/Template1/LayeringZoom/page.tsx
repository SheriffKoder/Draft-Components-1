import React from 'react'
import LayeringZoomAdjustable from './LayeringZoomAdjustable'
import LayeringZoomBase from './LayeringZoomBase'
import LayeringZoom from './LayeringZoom'
import LayeringZoomBoxes from './LayeringZoomBoxes'
const page = () => {
  return (
    <div className='w-full bg-black flex flex-col justify-center items-center'>
      {/* <LayeringZoomAdjustable /> */}
      {/* <LayeringZoomBase /> */}
      {/* <LayeringZoom /> */}
      <LayeringZoomBoxes />
    </div>
  )
}

export default page
