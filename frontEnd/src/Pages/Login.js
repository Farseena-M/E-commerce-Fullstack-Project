import React, { useContext, useRef, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { userContext } from '../App'
import { Form } from 'react-bootstrap'
import { Button ,Container} from 'react-bootstrap'
import axios from 'axios'
import { toast } from 'react-toastify'
const Login = () => {
  const [error] =useState('')
  const Nvgt=useNavigate()
   const Lreffname=useRef()
   const LreffPass=useRef() 
   const handleClick = async (e)=>{
    e.preventDefault()
   const newLreffName=Lreffname.current.value
    const newLreffPass=LreffPass.current.value
    try{
      const data = {
        "username" :newLreffName,
        "password" :newLreffPass
       }
       await axios.post('http://localhost:9000/api/users/login',data).then((res)=>{
        console.log(res);
         const userToken = res.data.token
       localStorage.setItem('userToken',userToken)
       const userId = res.data.userDetails._id 
       localStorage.setItem('userId',userId)
       toast.success("User login Successfully")
       Nvgt('/')
      }).catch((err)=>{
        toast.error(err)
      })
    }catch(err){
      console.error(err);
    }
  }
  return (
  <>
    <Container fluid style={{alignItems:'center'}} className=' mt-4 p-4'>
    <div className='m-4 p-5 mt-4 d-flex align-items-center justify-content-center flex-wrap'>
      <div className='shadow p-4 mt-5' style={{alignItems:'center',width:'650px', height:'350px',border:'1px',borderRadius:'8px' ,backgroundColor:'lightgrey'}}>
     <Form className='p-4 m-4'>
      <h2 style={{textAlign:'center'}}>Login</h2><br/>
     <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Control type="text" placeholder="Enter Username" style={{width:'500px'}} ref={Lreffname} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword" style={{width:'500px'}}>
        <Form.Control type="password" placeholder="Enter Password" ref={LreffPass} required /><br/>
        {error &&
       (<p style={{textAlign:'center',color:'red'}}>{error}</p>)}
        <Button onClick={handleClick} style={{position:'relative',left:'200px',backgroundColor:'black',border:'none'}} type="button">Login</Button>
        <Button style={{position:'relative',left:'210px',backgroundColor:'black',border:'none'}} onClick={()=>Nvgt('/signup')}>SignUp</Button>
      </Form.Group>
      </Form>
    </div>
    </div>
    </Container>
  </>
  )
}

export default Login