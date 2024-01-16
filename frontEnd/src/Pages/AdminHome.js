import React from 'react'
import Sidebar from '../Components/SideBar'

const AdminHome = () => {
  return (
    <div style={{display:'flex'}}>
        <Sidebar />
        <div style={{flex:'1',textAlign:'center'}}>
            <h1 style={{position:'relative',top:'350px',fontFamily:'sans-serif',fontSize:'50px'}}>Welcome...</h1>
        </div>
    </div>
  )
}

export default AdminHome