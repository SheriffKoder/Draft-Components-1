
const aboutCards = [
  {
    title: "Web Development",
    description: "We create beautiful and functional websites that are optimized for performance and speed.",
    color: "rgba(11,42,53,255)",
    fileName: "computer-model",
    rotationSpeed: 0.003
  },
  {
    title: "Web Development",
    description: "We create beautiful and functional websites that are optimized for performance and speed.",
    color: "rgba(34,23,55,255)",
    fileName: "camera-model",
    rotationSpeed: 0.001
  },
  {
    title: "Web Development",
    description: "We create beautiful and functional websites that are optimized for performance and speed.",
    color: "rgba(34,23,55,255)",
    fileName: "chart-model",
    rotationSpeed: 0.002
  },
  {
    title: "Web Development",
    description: "We create beautiful and functional websites that are optimized for performance and speed.",
    color: "rgba(11,42,53,255)",
    fileName: "money-model",
    rotationSpeed: 0.002
  }
]


const AboutWrapper = () => {


  return (
          <div className='h-[400px] w-[300px] rounded-lg overflow-hidden relative border border-gray-700/40'>

                {/* Noise overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-[0.3]" 
                  style={{
                    backgroundImage: `url('/card_grain.svg')`,
                    backgroundSize: 'cover',
                    // mixBlendMode: 'soft-light'
                  }}
                ></div>
                
                {/* items with radial background separated from the card background */}
                <div className='h-full flex flex-col' style={{
                  background: `radial-gradient(circle, rgba(0,100,155,0) 0%, rgba(255,255,255,0) 60%)`,
                }}>
                  <h3 className='Paragraph2 px-4 py-4' style={{fontWeight: 500}}>Title</h3>
                  
                  <div className='flex-1 flex justify-center items-center brightness-[0.35]'>
                  </div>

                  <p className='Paragraph2 px-4 py-4 opacity-50' style={{fontWeight: 400}}>Description</p>
                  
                </div>
              </div>
   

      
  )
}

export default AboutWrapper
