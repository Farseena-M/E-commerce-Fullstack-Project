import React, { useContext, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'
import { userContext } from '../App'
import { Button, Container } from 'react-bootstrap'
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
      console.error(err);
    }
  }
  return (
    <>
      <Container style={{ alignItems: 'center' }} className=' mt-4 p-4'>
        <div className='m-4 p-5 mt-4 d-flex align-items-center justify-content-center flex-wrap'>
          <div className=' p-4 mt-5' style={{ alignItems: 'center', width: '650px', height: '400px', border: '1px', borderRadius: '8px', backgroundColor: 'lightgrey' }}>
            <Form className='p-4 m-4'>
              <h2 style={{ textAlign: 'center' }}>SignUp</h2><br />
              <Form.Group className="mb-3" controlId="formGroupUsername">
                <Form.Control type="text" placeholder="Enter Username" style={{ width: '500px' }} ref={reffname} required/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Control type="email" placeholder="Enter Email" style={{ width: '500px' }} ref={reffEmail} required/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword" style={{ width: '500px' }}>
                <Form.Control type="password" placeholder="Enter Password" ref={reffPass} required/><br />
                {error &&
                  (<p style={{ textAlign: 'center', color: 'red' }}>{error}</p>)}
                <Button style={{ position: 'relative', left: '200px', backgroundColor: 'black', border: 'none' }} onClick={handleChange} type="submit">Submit</Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </Container>
    </>
  )
}

export default SignUp