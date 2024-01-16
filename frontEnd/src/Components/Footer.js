import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <footer className=' text-black pt-5 pb-4' style={{backgroundColor:'lightgray'}}>
<div className='container text-center text-md-left'>
<div className='row text-center text-md-left'>
<div className='col-md-3 col-lg-3 col-xl-3 mx-auto mt-3'>
<h5 className='text-uppercase mb-4 font-weight-bold text-warning'>Company</h5>
<p>Who we are
Find a Store
Babyshh Center
Careers
Contact Us</p>
</div>
<div className='col-md-2 col-lg-2col-xl-2 mx-auto mt-3'>
<h5 className='text-uppercase mb-4 font-weight-bold text-warning'>Products</h5>
<p>
 <Link style={{textDecoration:'none',color:'black'}} to='/cloths'>Baby Cloths</Link>
</p>
<p>
 <Link style={{textDecoration:'none',color:'black'}} to='/prdcts'>Baby Products</Link>
</p>
</div>
<div className='col-md-3 col-lg-2 col-xl-2 mx-auto mt-3'>
<h5 className='text-uppercase mb-4 font-weight-bold text-warning'>Services</h5>
<p>
  <span className='text-black' style={{textDecoration:'none'}}>Privacy Policy</span> 
</p>
<p>
  <span  className='text-black' style={{textDecoration:'none'}}>Return&Refund Policy</span>
</p>
<p>
  <span  className='text-black' style={{textDecoration:'none'}}>Free Shipping</span>
</p>
<p>
  <span  className='text-black' style={{textDecoration:'none'}}>Security</span>
</p>
</div>
<div className='col-md-4 col-lg-3 col-xl-3 mx-auto mt-3'>
<h5 className='text-uppercase mb-4 font-weight-bold text-warning'>Contact</h5>
<p>
  <i className='fas fa-phone mr-3'></i>  9876543234
</p>
<p>
  <i className='fas fa-envelope mr-3'></i>  Babyshh123@gmail.com
</p>
<p>
  <i></i>Place : Kakkanchery
</p>
</div>
</div>
<hr className='mb-4'></hr>
<div className='row align-items-center'>
<div>
  <p>
    Copyright @2023 All rights reserved 
  </p>
</div>
</div>
</div>
      </footer>
    </div>
  )
}

export default Footer