import React from 'react'

const MainLogo = ({size = "20px", color}: {
  size: string;
  color: string;
}) => {
  return (
    <svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
        width={size} height={size} viewBox="0 0 32 32" xmlSpace="preserve">
    <path className={`fill-[#ffff]`} d="M24.535,6H7.465l-4.717,7.075L16,28.536l13.252-15.461L24.535,6z M13.868,12L16,8.803L18.132,12
        H13.868z M18.674,14L16,23.36L13.326,14H18.674z M17.868,8h4.263L20,11.197L17.868,8z M12,11.197L9.868,8h4.263L12,11.197z
        M10.132,12H5.868L8,8.803L10.132,12z M11.245,14l2.536,8.875L6.174,14H11.245z M20.755,14h5.072l-7.608,8.875L20.755,14z
        M21.868,12L24,8.803L26.132,12H21.868z"/>
    </svg>
  )
}

export default MainLogo