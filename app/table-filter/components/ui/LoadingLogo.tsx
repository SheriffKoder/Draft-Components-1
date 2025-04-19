import CompanyLogo from './CompanyLogo'
import React from 'react'

const LoadingLogo = ({text, className}: {text?: string, className?: string}) => {
  return (
    <div className={`flex-c-c h-[100vh] ${className}`}>
      <div className='relative'>
          <div className='loadingAnimation mr-4'>
              <CompanyLogo/>
          </div>
          {
          text && (
            <p className='w-[300px] translate-x-[-50%] left-1/2 absolute bottom-[-2rem] text-center text-xs text-gray-500 mt-[1rem]'>
            {text}
            </p>
          )}
      </div>

    </div>
  )
}

export default LoadingLogo
