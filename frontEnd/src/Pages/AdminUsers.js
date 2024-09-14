import React, { useContext, useEffect } from 'react'
import { AXIOS, userContext } from '../App'
import { Table } from 'react-bootstrap'
import Sidebar from '../Components/SideBar'
import { toast } from 'react-toastify'

const AdminUsers = () => {
    const {user,setUser}=useContext(userContext)
   
    useEffect(()=>{
      const admnFetchUsers = async() =>{
       try{
        const rspns = await AXIOS.get('http://localhost:9000/api/admin/users')
        console.log(rspns.data.data.user);
        setUser(rspns.data.data.user)
       }catch(err){
        toast.error(err)
       }
      }
      admnFetchUsers()
    },[])

  return (
    
    <div style={{display:'flex'}}>
      <Sidebar />
      <div style={{flex:'1',textAlign:'center'}}>
       <Table  striped bordered hover size="sm" style={{margin:'0 auto'}}>
      <thead >
        <tr>
          <th style={{width:'850px'}}>UserName</th>
          <th>E-mail</th>
        </tr>
      </thead>
      {user.map((item)=>(
        <tbody>
      <tr>
         <td>{item.username}</td>
         <td>{item.email}</td>
         </tr>
         </tbody>
      ))}
      </Table>
    </div></div>
  )
}

export default AdminUsers