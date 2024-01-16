import React, { useContext, useState } from 'react'
import Sidebar from './SideBar'
import { Button, Form } from 'react-bootstrap'
import { userContext } from '../App'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Add = () => {
    const Nvgt=useNavigate()
    
    /* const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [image,setImage] = useState('')
    const [price,setPrice] = useState('')
    const [category,setCategory] = useState('')
    const [quantity,setQuantity] = useState('') */
    
    const {product,setProduct}=useContext(userContext)
    const [newProduct,setNewProduct]=useState({
        id:product.length+1,
        productName:'',
        Price:'',
        productImage:'',
        qty:'',
        baby:''
    })
    const Change= (e) =>{
      const {name,value}=e.target
      setNewProduct({
        ...newProduct,[name]:value
      })
    }
    const Submit =()=>{
   if(newProduct.productName && newProduct.Price && newProduct.productImage && newProduct.qty && newProduct.baby){
    setProduct([...product,newProduct])
    setNewProduct({
        id:product.length+1,
        productName:'',
        Price:'',
        productImage:'',
        qty:'',
        baby:''
    })
    Nvgt('/adminprdcts')
   }else{
    toast.error('Fill')
   }
    }
  return (
    <div className='d-flex'>
        <Sidebar/>
        <div style={{flex:'1',textAlign:'center',backgroundColor:'grey',height:'850px',width:'100%'}}>
        <h1 style={{fontFamily:'sans-serif',padding:'10px',position:'relative',top:'30px',color:'#333'}}>Add Product</h1><br /><hr />
          <Form>
            <label  style={{fontSize:'20px',fontFamily:'italic'}} >Product Name</label><br />
            <input className='shadow' style={{height:'45px',width:'500px',border:'1px solid grey',borderRadius:'8px',textAlign:'center'}} type='text' name='productName' value={newProduct.productName} onChange={Change} required/> <br /><br />
            <label  style={{fontSize:'20px',fontFamily:'italic'}} >Product Description</label><br />
            <input className='shadow' style={{height:'45px',width:'500px',border:'1px solid grey',borderRadius:'8px',textAlign:'center'}} type='text' name='productName' value={newProduct.productName} onChange={Change} required/> <br /><br />   
            <label  style={{fontSize:'20px',fontFamily:'italic'}} >Product Price</label><br />
            <input className='shadow' style={{height:'45px',width:'500px',border:'1px solid grey',borderRadius:'8px',textAlign:'center'}} type='number' name='Price' value={newProduct.Price}  onChange={Change} required/><br /><br />
            <label style={{fontSize:'20px',fontFamily:'italic'}} >Product Image</label><br />
            <input className='shadow' style={{height:'45px',width:'500px',border:'1px solid grey',borderRadius:'8px',textAlign:'center'}} type='text' name='productImage' value={newProduct.productImage}  onChange={Change}  required/><br /><br />
            <label  style={{fontSize:'20px',fontFamily:'italic'}} >Qty</label><br />
            <input className='shadow' style={{height:'45px',width:'500px',border:'1px solid grey',borderRadius:'8px',textAlign:'center'}} type='number' name='qty' value={newProduct.qty}  onChange={Change} required/><br /><br />
            <select className='shadow' style={{height:'40px',width:'300px',border:'1px solid grey',borderRadius:'8px',textAlign:'center',fontSize:'20px'}}  name='baby' value={newProduct.baby}  onChange={Change} required>
            <option>Product Type</option>
            <option>Cloth</option>
            <option>Product</option></select><br /><br />
            <Button style={{backgroundColor:'black',border:'none',height:'40px',width:'100px'}} onClick={Submit}>Add</Button>
            </Form>
        </div>
    </div>
  )
}

export default Add