import React from 'react'
import  banner from '../Components/Assets/Banner.png'

const Banner = () => {
  return (
    <>
  <div class="carousel-inner">
    <div class="carousel-item active" style={{height:'100%', width:'100%'}}>
        <img src={banner} class="d-block w-100" alt="..." />
    </div>
  </div>
    </>
  )
}
export default Banner