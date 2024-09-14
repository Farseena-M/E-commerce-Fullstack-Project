import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Components/Assets/Babyshh.png';
import imglogin from '../Components/Assets/login.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthContext } from '../Context/AuthContext';

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { setAuthUser } = useAuthContext();

  const handleClick = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (username.length === 0 || password.length === 0) {
      setError(true);
      toast.warning('Please fill in the blank');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9000/api/users/login', {
        username,
        password,
      });

      const { token, userDetails } = response.data;
      localStorage.setItem('userToken', token);
      localStorage.setItem('user', JSON.stringify(userDetails));
      setAuthUser(userDetails);

      toast.success('User logged in successfully');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Login failed, please try again');
    }
  };

  return (
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
                      <h5 className="fw-normal mb-2 pb-1" style={{ letterSpacing: '1px', fontSize: '16px', fontStyle: 'italic' }}>
                        Sign into your account
                      </h5>
                      <div className="form-outline mb-3">
                        <input
                          type="text"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          ref={usernameRef}
                        />
                        <label className="form-label" htmlFor="form2Example17">Username</label>
                      </div>

                      <div className="form-outline mb-3">
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          ref={passwordRef}
                        />
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
                          onClick={() => navigate('/adminlogin')}
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
                          onClick={() => navigate('/signup')}
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
  );
};

export default Login;
