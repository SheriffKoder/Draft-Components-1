
import React from 'react'
import "./expandingCards.css";

const page = () => {


  return (
    <div className="FullScreen_CenteredFlex">
      <div className="expandingCards_container">
        <div className="expandingCards_cube">
          <div className="expandingCards_face expandingCards_top">Top</div>
          {/* <div className="face bottom">Bottom</div> */}
          {/* <div className="face left">Left</div> */}
          {/* <div className="face right">Right</div> */}
          <div className="expandingCards_face expandingCards_front">Front</div>
          <div className="expandingCards_face expandingCards_back">Back</div>
        </div>
      </div>
    </div>
  )
}

export default page