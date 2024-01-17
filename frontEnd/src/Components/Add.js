import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './SideBar'
import { Button, Form } from 'react-bootstrap'
import { AXIOS, userContext } from '../App'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Add = () => {
    const Nvgt=useNavigate()
    
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [image,setImage] = useState('')
    const [price,setPrice] = useState('')
    const [category,setCategory] = useState('')
    const [quantity,setQuantity] = useState('')

    const handleChangeImage = (e) =>{
      setImage(e.target.files[0])
    }


    const handleSubmit = (e) =>{
     e.preventDefault()
     if(!title || !description || !image || !price || !category || !quantity){
      toast.error('Please fill in the blank')
     }
    }


    const formData = new FormData()
    formData.append('title',title)
    formData.append('description',description)
    formData.append('image',image)
    formData.append('price',price)
    formData.append('category',category)
    formData.append('quantity',quantity)

    const buttonSubmit = async () =>{
        try{
        const rspns = await AXIOS.post(`http://localhost:9000/api/admin/create`,formData)
        console.log(rspns);
        if(rspns.status === 201){
           toast.success('Product added successfully')
           Nvgt('/adminprdcts')
        }
        }catch(err){
          console.log(err);
        }
      }
    console.log();
   

  return (
    <div className='d-flex'>
        <Sidebar/>
        <div style={{flex:'1',textAlign:'center',backgroundColor:'grey',height:'850px',width:'100%'}}>
        <h1 style={{fontFamily:'sans-serif',padding:'10px',position:'relative',top:'30px',color:'#333'}}>Add Product</h1><br /><hr />
          <Form onSubmit={handleSubmit}>
            <label  style={{fontSize:'20px',fontFamily:'italic'}} >Product Name</label><br />
            <input className='shadow' style={{height:'45px',width:'500px',border:'1px solid grey',borderRadius:'8px',textAlign:'center'}} type='text' name='title' value={title} onChange={(e)=>setTitle(e.target.value)} required/> <br /><br />
            <label  style={{fontSize:'20px',fontFamily:'italic'}} >Product Description</label><br />
            <input className='shadow' style={{height:'45px',width:'500px',border:'1px solid grey',borderRadius:'8px',textAlign:'center'}} type='text' name='description' value={description} onChange={(e)=>setDescription(e.target.value)} required/> <br /><br />   
            <label  style={{fontSize:'20px',fontFamily:'italic'}} >Product Price</label><br />
            <input className='shadow' style={{height:'45px',width:'500px',border:'1px solid grey',borderRadius:'8px',textAlign:'center'}} type='number' name='price' value={price}  onChange={(e)=>setPrice(e.target.value)} required/><br /><br />
            <label style={{fontSize:'20px',fontFamily:'italic'}} >Product Image</label><br />
            <input className='shadow' style={{height:'45px',width:'500px',border:'1px solid grey',borderRadius:'8px',textAlign:'center'}} type='file' accept='image/*' name='image' onChange = {handleChangeImage} required/><br /><br />
            <label  style={{fontSize:'20px',fontFamily:'italic'}} >Qty</label><br />
            <input className='shadow' style={{height:'45px',width:'500px',border:'1px solid grey',borderRadius:'8px',textAlign:'center'}} type='number' name='quantity' value={quantity}  onChange={(e)=>setQuantity(e.target.value)} required/><br /><br />
            <select className='shadow' style={{height:'40px',width:'300px',border:'1px solid grey',borderRadius:'8px',textAlign:'center',fontSize:'20px'}}  name='category' value={category}  onChange={(e)=>setCategory(e.target.value)} required>
            <option>Product Type</option>
            <option>cloth</option>
            <option>product</option></select><br /><br />
            <Button onClick={buttonSubmit} style={{backgroundColor:'black',border:'none',height:'40px',width:'100px'}}>Add</Button>
            </Form>
        </div>
    </div>
  )
}

export default Add