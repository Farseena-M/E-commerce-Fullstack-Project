import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import logo from '../Components/Assets/Babyshh.png'
import imglogin from '../Components/Assets/login.jpg'
import axios  from 'axios'

const AdminLogin = () => {
  const Nvgt=useNavigate()
  const [error,setError]=useState(false)
  const adminName=useRef()
  const adminPass=useRef()
  const hndlChng = async(e) => {
    e.preventDefault()
    const LadminName=adminName.current.value;
    const LadminPass=adminPass.current.value;
    if(LadminName.length === 0 || LadminPass.length === 0 ){
      setError(true)
      toast.warning(`Please fill in the blank`)
    }
    try {
      const data = {
        "username": LadminName,
        "password": LadminPass,
      }
      await axios.post('http://localhost:9000/api/admin/login', data).then((res) => {
        console.log(res);
        const adminToken = res.data.token
        localStorage.setItem('adminToken',adminToken)
        toast.success("Admin Login Successfully");
         Nvgt('/adminhome')
      }).catch((err) => {
        toast.error(err)
      })
    } catch (err) {
      console.error(err);
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
                    <input type="username" id="form2Example17" className="form-control form-control-lg" ref={adminName}/>
                    <label className="form-label" for="form2Example17">Username</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example27" className="form-control form-control-lg" ref={adminPass}/>
                    <label className="form-label" for="form2Example27">Password</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" style={{"width":"100%"}} type="button" onClick={hndlChng}>Login</button>
                  </div>

                  {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
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

export default AdminLogin