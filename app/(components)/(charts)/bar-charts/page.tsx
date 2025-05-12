import React from 'react'
import BarChartContainerV1 from './versions/v1/BarChartContainer-v1'
import BarChartContainerV2 from './versions/v2/BarChartContainer-v1'
import BarChartContainerV3 from './versions/v3/BarChartContainer-v1'
import BarChartContainerV6 from './versions/v4/BarChartContainer-v1'
import BarChartContainerV7 from './versions/v5/BarChartContainer-v3'
import BarChartContainerV8 from './versions/v6/BarChartContainer-v3'

import BarChartContainerV4 from './versions/h1/BarChartContainer-v2'
import BarChartContainerV5 from './versions/h2/BarChartContainer-v3'
const page = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center pt-[2rem]'>

        <h1 className='text-2xl font-bold p-2 mb-[2rem] w-full bg-white/10 text-center'>
            Interactivity
            <p className='text-xs font-light text-foreground/30'>Manual highlight</p>
        </h1>

        <div className='w-full flex flex-row gap-[2rem] flex-wrap items-center justify-center'>
        
            <div className='relative h-[400px] w-[600px] bg-white/10 p-2 rounded-lg'>
                <p className='pt-2 pl-2'>normal chart with the ability to divide using the dataset</p>
                <BarChartContainerV1 title='normal chart' value='100' subTitle='100' />
            </div>

            <div className='relative h-[400px] w-[600px] bg-white/10 p-2 rounded-lg'>
                <p className='pt-2 pl-2'>when hover we can move the bars, can pass a default split index, return to default index on mouse leave</p>
                <BarChartContainerV2 title='normal chart' value='100' subTitle='100' initialSplitIndex={5} />
            </div>

            <div className='relative h-[400px] w-[600px] bg-white/10 p-2 rounded-lg'>
                <p className='pt-2 pl-2'>when hover can move the bars and stays in current place</p>
                <BarChartContainerV3 title='normal chart' value='100' subTitle='100' initialSplitIndex={5} />
            </div>

            <div className='relative h-[400px] w-[600px] bg-white/10 p-2 rounded-lg'>
            <p className='pt-2 pl-2'>Changing direction with one prop</p>
                <BarChartContainerV6 title='normal chart' value='100' subTitle='100' />
            </div>

            <div className='relative h-[400px] w-[600px] bg-white/10 p-2 rounded-lg'>
            <p className='pt-2 pl-2'>Grouped chart</p>
                <BarChartContainerV7 title='normal chart' value='100' subTitle='100' />
            </div>

            <div className='relative h-[400px] w-[600px] bg-white/10 p-2 rounded-lg'>
            <p className='pt-2 pl-2'>Stacked chart</p>
                <BarChartContainerV8 title='normal chart' value='100' subTitle='100' />
            </div>
        </div>


        <h1 className='text-2xl font-bold p-2 my-[4rem] w-full bg-white/10 text-center'>
            Highlighting
            <p className='text-xs font-light text-foreground/30'>--</p>
        </h1>

        <div className='w-full flex flex-row gap-[2rem] flex-wrap items-center justify-center'>
        
            <div className='relative h-[400px] w-[600px] bg-white/10 p-2 rounded-lg'>
                <p className='pt-2 pl-2'>highlight by index array</p>
                <BarChartContainerV4 title='normal chart' value='100' subTitle='100' />
            </div>

            <div className='relative h-[400px] w-[600px] bg-white/10 p-2 rounded-lg'>
                <p className='pt-2 pl-2'>high and low points</p>
                <BarChartContainerV5 title='normal chart' value='100' subTitle='100' />
            </div>

        </div>


    </div>
  )
}

export default page
