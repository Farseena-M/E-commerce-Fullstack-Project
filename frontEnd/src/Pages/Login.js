import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Components/Assets/Babyshh.png';
import imglogin from '../Components/Assets/login.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthContext } from '../Context/AuthContext';

const Login = () => {
  const [error, setError] = useState(false);
  const Nvgt = useNavigate();
  const Lreffname = useRef();
  const LreffPass = useRef();
  const { setAuthUser } = useAuthContext();


  const handleClick = async (e) => {
    e.preventDefault();
    const newLreffName = Lreffname.current.value;
    const newLreffPass = LreffPass.current.value;
    if (newLreffName.length === 0 || newLreffPass.length === 0) {
      setError(true);
      toast.warning(`Please fill in the blank`);
    }
    try {
      const data = {
        username: newLreffName,
        password: newLreffPass,
      };
      await axios.post('http://localhost:9000/api/users/login', data)
        .then((res) => {
          const userToken = res.data.token;
          localStorage.setItem('userToken', userToken);
          const Data = res.data.userDetails
          localStorage.setItem('user', JSON.stringify(Data))
          setAuthUser(Data)
          toast.success('User login Successfully');
          Nvgt('/');
        })
        .catch((err) => {
          console.error(err.message);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: 'grey' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: '1rem' }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src={imglogin}
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: '1rem 0 0 1rem', height: '600px' }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-3 text-black">

                      <form>
                        <div className="d-flex justify-content-center align-items-center mb-2 pb-1">
                          <span className="h1 fw-bold mb-0">
                            <img style={{ height: '80px' }} src={logo} alt="logo" />
                          </span>
                        </div>

                        <h5 className="fw-normal mb-2 pb-1" style={{ letterSpacing: '1px', fontSize: '16px', fontStyle: 'italic' }}>Sign into your account</h5>

                        <div className="form-outline mb-3">
                          <input type="username" id="form2Example17" className="form-control form-control-lg" ref={Lreffname} />
                          <label className="form-label" htmlFor="form2Example17">Username</label>
                        </div>

                        <div className="form-outline mb-3">
                          <input type="password" id="form2Example27" className="form-control form-control-lg" ref={LreffPass} />
                          <label className="form-label" htmlFor="form2Example27">Password</label>
                        </div>

                        <div className="pt-1 mb-3">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="button"
                            onClick={handleClick}
                            style={{ width: '100%', marginBottom: '8px' }}
                          >
                            Login
                          </button>
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="button"
                            onClick={() => Nvgt('/adminlogin')}
                            style={{ width: '100%' }}
                          >
                            Admin Login
                          </button>
                        </div>

                        <p className="mb-3" style={{ color: '#393f81' }}>
                          Don't have an account?
                          <button
                            type="button"
                            style={{ marginLeft: '10px', border: 'none', color: 'blue', textDecorationLine: 'underline' }}
                            onClick={() => Nvgt('/signup')}
                          >
                            Register Here
                          </button>
                        </p>
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
  );
};

export default Login;
