import React, { useContext, useState } from 'react'
import Sidebar from './SideBar'
import { useNavigate, useParams } from 'react-router-dom'
import { userContext } from '../App'
import { Button, Form } from 'react-bootstrap'

const Edit = () => {
    const nvgt=useNavigate()
    const {id} =useParams()
    const {product,setProduct}=useContext(userContext)
    const editProduct=product.find((item)=>item.id===parseInt(id))
    console.log(editProduct);
    const [name,setName]=useState(editProduct.productName)
    const [price,setPrice]=useState(editProduct.Price)
    const [image,setImage]=useState(editProduct.productImage)
    const [baby,setbaby]=useState(editProduct.baby)
    const handleSave=(e)=>{
    e.preventDefault()
    const updates={ 
      ...editProduct,
    productName:name,
    Price:price,
    productImage:image,
    baby:baby
    }
    const updatedProduct=product.map((item)=>item.id===parseInt(id)?updates:item)
    console.log(updatedProduct);
    setProduct(updatedProduct)
    nvgt('/adminprdcts')
    }
  return (
    <div style={{display:'flex'}}>
      <Sidebar />
      <div style={{flex:'1',textAlign:'center'}}>
        <h1 style={{fontFamily:'sans-serif',padding:'10px',position:'relative',top:'30px',color:'#333'}}>Edit Product</h1><br /><hr />
       <Form>
        <label style={{fontSize:'20px',fontFamily:'italic'}}> Product Name </label><br />
        <input className='shadow' style={{height:'45px',width:'500px',border:'1px solid grey',borderRadius:'8px',textAlign:'center'}} type='text' name='productName' defaultValue={editProduct.productName} onChange={(e)=>setName(e.target.value)}/><br /><br />
        <label style={{fontSize:'20px',fontFamily:'italic'}}> Product Description </label><br />
        <input className='shadow' style={{height:'45px',width:'500px',border:'1px solid grey',borderRadius:'8px',textAlign:'center'}} type='text' name='productName' defaultValue={editProduct.productName} onChange={(e)=>setName(e.target.value)}/><br /><br />
        <label style={{fontSize:'20px',fontFamily:'italic'}} > Product Price </label><br />
        <input className='shadow' style={{height:'45px',width:'500px',border:'1px solid grey',borderRadius:'8px',textAlign:'center'}}  type='text' name='Price' defaultValue={editProduct.Price} onChange={(e)=>setPrice(e.target.value)}/><br /><br />
        
        <label style={{fontSize:'20px',fontFamily:'italic'}} > Product Image </label><br />
        <input className='shadow' style={{height:'45px',width:'500px',border:'1px solid grey',borderRadius:'8px',textAlign:'center'}}  type='text' name='productImage' defaultValue={editProduct.productImage} onChange={(e)=>setImage(e.target.value)}/><br /><br />
        
        <select className='shadow' style={{height:'40px',width:'300px',border:'1px solid grey',borderRadius:'8px',textAlign:'center',fontSize:'20px'}} name='baby' defaultValue={editProduct.baby} onChange={(e)=>setbaby(e.target.value)}>
        <option>Product Type</option>
        <option>Cloth</option>
        <option>Product</option></select><br /><br />
        <Button  onClick={handleSave} style={{backgroundColor:'black',border:'1px solid grey',height:'40px',width:'100px'}} >Save</Button>
       </Form>
      </div>
    </div>
  )
}

export default Edit