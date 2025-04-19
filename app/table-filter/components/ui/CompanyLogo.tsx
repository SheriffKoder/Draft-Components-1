import React from 'react'
import Image from 'next/image'

const CompanyLogo = () => {
  return (
    <div className='companyLogo h-[62px] w-[62px]'>
    <Image 
      src="/images/sustainserv_logo.png"
      alt="Company Logo"
      width={62}
      height={62}
    />
  </div>
  )
}

export default CompanyLogo
