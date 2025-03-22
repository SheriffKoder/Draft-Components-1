import React from 'react'
import ShineButton from './ShineButton'

const page = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
        <ShineButton text="Click me" variant="primary" href="/" />
    </div>
  )
}

export default page
