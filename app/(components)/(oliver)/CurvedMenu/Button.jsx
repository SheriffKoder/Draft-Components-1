
const Button = ({isActive, changeState}) => {


  return (
    <div className="fixed top-0 right-0 m-[20px] w-[80px] aspect-square bg-violet-500 rounded-full
    flex items-center justify-center cursor-pointer"
    onClick={changeState}>
        <div className={`
        w-[40%] h-[40%] flex flex-col
        items-center justify-center
        `}>
            <span
            className={`w-full bg-white h-[1px] mb-[5px] transition-all duration-[0.3] ease-linear
            ${isActive ? "rotate-45 mb-[-5px]" : ""}`}></span>
            <span 
            className={`w-full bg-white h-[1px] mt-[5px] transition-all duration-[0.3] ease-linear
            ${isActive ? "rotate-[-45deg] mt-[5px]" : ""}`}></span>
        </div>
    </div>
  )
}

export default Button