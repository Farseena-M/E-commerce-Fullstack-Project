import React, { useRef, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios  from 'axios'

const AdminLogin = () => {
  const Nvgt=useNavigate()
  const [error]=useState('')
  const adminName=useRef()
  const adminPass=useRef()
  const hndlChng = async(e) => {
    e.preventDefault()
    const LadminName=adminName.current.value;
    const LadminPass=adminPass.current.value;
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
    <Container style={{alignItems:'center'}} className=' mt-4 p-4'>
    <div className='m-4 p-5 mt-4 d-flex align-items-center justify-content-center flex-wrap'>
      <div className='shadow p-4 mt-5' style={{alignItems:'center',width:'650px', height:'350px',border:'1px',borderRadius:'8px' ,backgroundColor:'lightgrey'}}>
     <Form className='p-4 m-4'>
      <h2 style={{textAlign:'center'}}>Admin Login</h2><br/>
     <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Control type="text" placeholder="Enter Username" style={{width:'500px'}} ref={adminName} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword" style={{width:'500px'}}>
        <Form.Control type="password" placeholder="Enter Password" ref={adminPass} required /><br/>
        {error &&
       (<p style={{textAlign:'center',color:'red'}}>{error}</p>)}
        <Button onClick={hndlChng} style={{position:'relative',left:'200px',backgroundColor:'black',border:'none'}} type="button">Login</Button>
      </Form.Group>
      </Form>
    </div>
    </div>
    </Container>
)
}

export default AdminLogin