import React from 'react'
import SecondaryLogo from './LogoSVGs/SecondaryLogo'
import MainLogo from './LogoSVGs/MainLogo'

const MainCube = () => {
  return (
    <div className="LoadingLogo_container">
        <div className="LoadingLogo_cube">
            <div className="LoadingLogo_face LoadingLogo_top"></div>
            <div className="LoadingLogo_face LoadingLogo_bottom">Bottom</div>
            <div className="LoadingLogo_face LoadingLogo_left">Left</div>
            <div className="LoadingLogo_ace LoadingLogo_right">Right</div>

            <div className="LoadingLogo_face LoadingLogo_front">
                <SecondaryLogo size="50px" color="#0000"/>
            </div>
            <div className="LoadingLogo_face LoadingLogo_back">
                <MainLogo size="50px"color="#0000"/>
            </div>
        </div>
    </div>
  )
}

export default MainCube