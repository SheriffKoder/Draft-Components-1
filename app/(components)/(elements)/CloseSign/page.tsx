import React from 'react'

const CloseSign = () => {
  return (
    <div className='FullScreen_CenteredFlex'>
         <button 
        // onClick={()=> {hideSignUp();}}
        className="ml-auto bg-blue-500 hover:bg-blue-700 opacity-80 hover:opacity-100 dark:opacity-100 dark:bg-blue-700 dark:hover:bg-blue-500 h-5 w-5 rounded-[6px] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/> <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/> </svg>
        </button>
    </div>
  )
}

export default CloseSign