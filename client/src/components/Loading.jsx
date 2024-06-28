import React from 'react'
import "./components_css/Loading.css"

function Loading  ()  {
  return (
    <>
    <div className="container">
    <div className="liquid"></div>
    <div className="liquid"></div>
    <div className="liquid"></div>
    <div className="liquid"></div>
  </div>
  <svg>
    <filter id="gooey">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
      <feColorMatrix values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 20 -10
          " />
    </filter>
  </svg>
  </>
  )
}

export default Loading
