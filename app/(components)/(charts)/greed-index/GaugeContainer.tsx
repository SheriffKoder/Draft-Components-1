'use client'
import React, { useEffect, useState } from 'react'
import GreedIndexChart from './GreedIndexChart';

const GaugeContainer = ({
  value
}: {
  value: number
}) => {



const [primaryColor, setPrimaryColor] = useState<string>("#000000");
const [secondaryColor, setSecondaryColor] = useState<string>("#000000");
const [tertiaryColor, setTertiaryColor] = useState<string>("#000000");
const [boxesPerLine, setBoxesPerLine] = useState(70);
const [selectedSegment, setSelectedSegment] = useState<number>(0);

    // Function to update colors from CSS variables
    const updateColors = () => {
        
          const colorPrimary = getComputedStyle(document.documentElement)
            .getPropertyValue('--color-primary').trim();
          const colorSecondary = getComputedStyle(document.documentElement)
            .getPropertyValue('--color-secondary').trim();
          const colorTertiary = getComputedStyle(document.documentElement)
            .getPropertyValue('--color-tertiary').trim();
        // const colorPrimary = "#ffffff36";
        // const colorSecondary = "#ffffff";
        // const colorTertiary = "#8b5cf6";
        if (colorPrimary) setPrimaryColor(colorPrimary);
        if (colorSecondary) setSecondaryColor(colorSecondary);
        if (colorTertiary) setTertiaryColor(colorTertiary);
    };

    // Initial color setup
    useEffect(() => {
    updateColors();
    }, []);

    // Listen for theme changes
    useEffect(() => {
    // Create a MutationObserver to watch for changes to the document's class or style
    const observer = new MutationObserver(updateColors);
    
    // Start observing the document with the configured parameters
    observer.observe(document.documentElement, { 
        attributes: true, 
        attributeFilter: ['class', 'style'] 
    });
    
    // Clean up the observer on component unmount
    return () => observer.disconnect();
    }, []);

    const data = {
      titles: ["Neutral", "Greed", "Extreme Greed", "Overdrive"],
      percentages: [15, 40, 70, 100],
      colors: ["#8771f4", "#64afe0", "#2eb5b9", "rgba(255, 255, 255, 0.05)"],
      activeColors: ["#8771f4", "#64afe0", "#2eb5b9", "rgba(255, 255, 255, 0.05)"],
    }

  return (
    <div className='px-[1.5rem] py-[1.5rem] relative text-foreground flex items-center justify-center h-full'>

        {/* Title */}
        <h3 className='text-sm absolute top-[1.5rem] left-[1.5rem]'>Greed Index</h3>

        {/* Score */}


        {/* Chart */}
        <div className='w-full h-[220px] relative mt-[2rem]'>
          <div className='absolute bottom-0 left-1/2 translate-x-[-50%] 
              w-[170px] h-[100px] flex items-center justify-center flex-col'>
                <span className='text-xs opacity-50'>{data.titles[selectedSegment]}</span>
                <span className='text-2xl mb-2 mt-[-2px] font-medium'>{value}%</span>
                <span className='text-xs text-tertiary'>+8.3%</span>
          </div>

          <div className='absolute top-0 left-0 w-full h-full'>
            <GreedIndexChart 
            setSelectedSegment={setSelectedSegment}
            titles={["Neutral", "Greed", "Extreme Greed", ""]}
            percentages={[15, 40, 70, 100]}
            colors={["#8771f4", "#64afe0", "#2eb5b9", "rgba(255, 255, 255, 0.05)"]}
            activeColors={["#8771f4", "#64afe0", "#2eb5b9", "rgba(255, 255, 255, 0.05)"]}
            showLabels={false}
            gapDegrees={2}
            size={400}
            className={''}
            needleValue={value || 40}
            showNeedle={true}
            rotation={270}
            arcSpan={180}
            thickness={0.1}
            borderWidth={3}
            borderColors={["#8771f4", "#64afe0", "#2eb5b9", "#ffffff"]}
            labelColors={["#8771f4", "#64afe0", "#2eb5b9", "#ffffff"]}
            labelFontSize={10}
            labelFontWeight={200}
            valueFontSize={10}
            valueFontWeight={500}
            valueColor="#2D8642"
            highlightActiveLabel={false}
            padding={50}
            showValue={true}
            showBorders={false}
            showBorderOnActiveSegmentOnly={true}
            // gapColor='#ffffff'

            // dashed elements replacement
            gapThickness={0.7}
            showBackgroundTrack={false}
            backgroundTrackColor='rgba(255, 255, 255, 0.05)'
            dashedElements={[false, false, false, true]}
            dashWidth={1}
            dashGap={1}
            dashedElementActiveColors={["#8771f4", "#64afe0", "#2eb5b9", "rgba(255, 255, 255, 0.05)"]}

            // outer segments
            showOuterSegments={true}
            outerSegmentTitles={["Neutral", "Greed", "Extreme Greed", ""]}
            outerSegmentColors={["#8771f4", "#64afe0", "#2eb5b9", "rgba(255, 255, 255, 0.05)"]}
            outerSegmentActiveColors={["#8771f4", "#64afe0", "#2eb5b9", "rgba(255, 255, 255, 0.05)"]}
            outerSegmentBorderColors={["#8771f4", "#64afe0", "#2eb5b9", "rgba(255, 255, 255, 0.05)"]}
            outerSegmentThickness={0.4}
            outerSegmentGap={2}
            outerSegmentOffset={0.05}
            showOuterLabels={true}
            outerLabelColors={["#8771f4", "#64afe0", "#2eb5b9", "rgba(255, 255, 255, 0.05)"]} // used for the tooltip but de-activated in code on the segments
            outerLabelFontSize={10}
            outerLabelFontWeight={200}
            showOuterSegmentBorders={false}
            showOuterSegmentBorderOnActiveOnly={true}
            outerActiveLabelFontWeight={500}

            // needle
            needleColor={"#ffffff"}
            needleBaseColor={"#ffffff"}
            needleBaseSize={7}
            needleWidth={3}
            needleLength={1.15}
            needleBaseBorderColor={"#ffffff"}
            needleBaseBorderWidth={1}

            // needle animation
            animateNeedle={true}
            animationDuration={1000}
            animationSteps={100}
            
            // inner arc/circle
            showInnerArc={true}
            innerArcOffset={0.7}
            innerArcThickness={8.3}
            innerArcGradientAngle={90}
            // innerArcStartColor={"rgba(66, 135, 245, 0.7)"}
            // innerArcEndColor={"rgba(96, 58, 212, 0.4)"}
            // innerArcBorderColor={"rgba(255, 255, 255, 0.2)"}
            // innerArcBorderWidth={0}
            innerArcSpan={180}
            innerArcHideBottomBorder={true}

            // bottom index labels
            showIndexLabels={true}
            leftIndexLabel="Index: 0"
            rightIndexLabel="Index: 100%"
            indexLabelColor="rgba(255, 255, 255, 0.4)"
            indexLabelFontSize={12}
            indexLabelFontWeight={400}
            indexLabelOffsetY={25}
            indexLabelOffsetX={0}
            leftIndexLabelOffsetX={-25}
            rightIndexLabelOffsetX={30}

            // tooltip
            segmentSubtitles={[
              "Market sentiment is extremely negative",
              "Investors are fearful",
              "Market sentiment is balanced",
              "Investors are getting greedy",
              "Market sentiment is extremely positive"
            ]}
            outerSegmentSubtitles={["-20 - 10", "-10 - 0", "0 - 10", "10 - 20", "20 - 30"]}
            outerSubtitleFontSize={10} // Smaller font for subtitles
            // outerSubtitleColors={["#FF5733", "#FFC300", "#36A2EB", "#4BC0C0", "#9966FF"]} // Custom colors
            outerSubtitleFontWeight={600}
            outerSubtitleOffset={-10} // Distance below the main title
            outerLabelOffset={5} // Move titles slightly inward
            
            // indicator
            showIndicator={true}
            indicatorValue={value}
            indicatorColor={"#ffffff"}
            indicatorBaseWidth={8}
            indicatorLength={7}
            indicatorOffset={-9}
            indicatorTransitionDuration={1000}
            indicatorSpringConfig={{
              tension: 0.5, // stiffer spring
              friction: 1, // less bouncy
              precision: 1.6 // more accurate
            }}


            />



          </div>

          {/* <div className='absolute top-[70%] left-1/2 translate-x-[-50%] translate-y-[-50%]'>
            <div className='w-[11.8rem] h-[6.5rem] rounded-t-full overflow-hidden'
            style={{
              background: `linear-gradient(190deg, rgba(255, 255, 255, 0.2), 7%, rgba(255, 255, 255, 0.0))`,
              border: `1px solid rgba(255, 255, 255, 0.025)`,
              borderBottom: 'none',
            }}></div>
          </div> */}

          
        </div>

        {/* Footer */}
        {/* <div className='absolute bottom-[1.5rem] px-[1.5rem] flex flex-row items-center w-full text-foreground/30 text-xs'>
            <span className=''>12 Aug</span>
            <div className='flex flex-row items-center gap-[6rem] ml-auto'>
              <span className='text-foreground'>4 Sept</span>
              <span className=''>12 Sept</span>
            </div>
        </div> */}


    </div>
  )
}

export default GaugeContainer
