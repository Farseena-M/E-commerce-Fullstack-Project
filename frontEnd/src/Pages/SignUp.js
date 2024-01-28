import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../App'
import logo from '../Components/Assets/Babyshh.png'
import imglogin from '../Components/Assets/login.jpg'
import axios from 'axios'
import { toast } from 'react-toastify';
const SignUp = () => {
  const [error] = useState('')
  const { user, setUser } = useContext(userContext)
  const Nvgt = useNavigate()
  const reffname = useRef()
  const reffPass = useRef()
  const reffEmail = useRef()
  const handleChange = async (e) => {
    e.preventDefault()
    const refname = reffname.current.value
    const refPass = reffPass.current.value
    const refEmail = reffEmail.current.value
    const value = { name: refname, pass: refPass, email: refEmail }
    setUser([...user, value]);
    try {
      const data = {
        "username": refname,
        "password": refPass,
        "email"   : refEmail
      }
      await axios.post('http://localhost:9000/api/users/signup', data).then((res) => {
        console.log(res);
        toast.success("User Registered Successfully");
         Nvgt('/login')
      }).catch((err) => {
        toast.error(err)
      })
    } catch (err) {
      toast.error(err);
    }
  }
  return (
    <>
   <section className="vh-100" style={{"background-color": "grey"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{"border-radius": "1rem;"}}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src={imglogin} 
                alt="login form" className="img-fluid" style={{"border-radius": "1rem 0 0 1rem;","height":"680px"}} />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

                <form>

                  <div className="d-flex align-items-center mb-3 pb-1">
                    <span className="h1 fw-bold mb-0"><img style={{height:'100px'}} src={logo} alt='logo'/></span>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{"letter-spacing": "1px;"}}>Sign into your account</h5>

                  <div className="form-outline mb-4">
                    <input type="username" id="form2Example17" className="form-control form-control-lg" ref={reffname}/>
                    <label className="form-label" for="form2Example17">Username</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="email" id="form2Example17" className="form-control form-control-lg" ref={reffEmail}/>
                    <label className="form-label" for="form2Example17">Email</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example27" className="form-control form-control-lg" ref={reffPass}/>
                    <label className="form-label" for="form2Example27">Password</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" type="button" onClick={handleChange} style={{"width":"100%"}}>SignUp</button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default SignUp