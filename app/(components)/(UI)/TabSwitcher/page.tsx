import React from 'react'
import TabSwitcher from './TabSwitcher'


const incomingData = [
    {
        title: 'Web Development',
        description: 'We specialize in creating custom websites tailored to your business needs.'
    },
    {
        title: 'Automation',
        description: 'Random description for automation'
    },
    {
        title: 'Social Media Management',
        description: 'Random description for social media management'
    },
    {
        title: 'Data Analysis',
        description: 'Random description for data analysis'
    },
    {
        title: 'UI/UX Design',
        description: 'We specialize in creating custom websites tailored to your business needs.'
    },
    {
        title: 'AI Solutions',
        description: 'We specialize in creating custom websites tailored to your business needs.'
    },
    {
        title: 'Accounting',
        description: 'We specialize in creating custom websites tailored to your business needs.'
    }
]

const page = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        <div className='w-[80vw] h-[80vh] border border-gray-200 rounded-2xl relative'>
            <TabSwitcher incomingData={incomingData} />
        </div>
    </div>
  )
}

export default page
