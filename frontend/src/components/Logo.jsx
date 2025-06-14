import React from 'react'


function Logo({width = '100px', height = '60px'}) {
  return (
    <div>
        <img src="../public/Airbnb-Logo.wine.png" alt="Logo" style={{ width, height }} />
    </div>
  )
}

export default Logo