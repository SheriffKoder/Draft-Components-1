
// https://dev.to/joeattardi/let-s-make-a-css-cube-1fed

import React from 'react'
import "./rotatingCube.css";

const page = () => {


  return (
    <div className="FullScreen_CenteredFlex">
      <div className="rotatingCube_container">
        <div className="rotatingCube_cube">
          <div className="rotatingCube_face rotatingCube_top">Top</div>
          <div className="rotatingCube_face rotatingCube_bottom">Bottom</div>
          <div className="rotatingCube_face rotatingCube_left">Left</div>
          <div className="rotatingCube_face rotatingCube_right">Right</div>
          <div className="rotatingCube_face rotatingCube_front">Front</div>
          <div className="rotatingCube_face rotatingCube_back">Back</div>
        </div>
      </div>
    </div>
  )
}

export default page