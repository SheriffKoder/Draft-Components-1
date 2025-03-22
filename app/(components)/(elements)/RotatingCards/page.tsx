import React from 'react'
import { FeatureCard } from './FeatureCard'
import { Shield } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: "Feature 1",
    description: "Description 1"
  }
]

const page = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold relative'>Rotating Cards
        {features.map((feature) => (
          <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
        ))}
      </h1>
    </div>
  )
}

export default page
