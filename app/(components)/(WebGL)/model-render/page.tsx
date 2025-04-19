import React from 'react'
import ModelBoxTheedimentional from './model-box-theedimentional'

const page = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center relative bg-black'>
        <div className='p-10 border rounded-lg border-white/0 bg-[#f0f0f00a]'>
      <ModelBoxTheedimentional fileName="/assets_3D/computer-model.glb" rotationSpeedProp={0.01} />
        </div>
    </div>
  )
}

export default page
