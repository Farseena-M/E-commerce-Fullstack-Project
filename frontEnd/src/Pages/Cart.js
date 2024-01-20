 import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Axios, userContext } from '../App'
import { Button, Card, Container } from 'react-bootstrap'
import Navigation from '../Components/Navigation'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const Nvgt = useNavigate()
  const [cart,setCart] =useState([])
  const userId = localStorage.getItem('userId')

  
   const cartProducts = async() =>{
    try{
       const rspns = await Axios.get(`http://localhost:9000/api/users/cart/${userId}`)
       console.log(rspns.data.data);
       setCart(rspns.data.data)
       
    }catch(err){
      toast.error(err)
    }
   }
  useEffect(()=>{
   cartProducts()
  },[])
  



  const removeCartItem = async(id) =>{
    try{
     const productId = id
     const rspns = await Axios.delete(`http://localhost:9000/api/users/cart/${userId}`,{data:{productId:productId}})
     console.log(rspns);
     cartProducts()
      }catch(err){
      toast.error(err)
      }
  }

  
  const handlePayment = async() =>{
    try{
    const rspns = await Axios.post(`http://localhost:9000/api/users/payment/${userId}`)
    // console.log(rspns.data.session);
    const Session = rspns.data.session;
    console.log(Session);
    window.location.href = Session     
    }catch(err){
      toast.error(err)  
    }
  }

/*   const {cart,setCart,buy,setBuy} =useContext(userContext)
  const incrmnt=(id)=>{
 const newqty=cart.map((item)=>
  item.id===id?{...item,qty:item.qty+1}:item)
  setCart(newqty)
   cart.Price=cart.reduce((item)=>item.qty*item.Price)
  }    
  const dcrmnt=(id)=>{
    const newqty=cart.map((item)=>
     item.id===id&&item.qty>1?{...item,qty:item.qty-1}:item
   )
     setCart(newqty)
     }
     const remove=(id)=>{
      const rmvData=cart.filter((item)=>item.id !== id)
      setCart(rmvData)
     }
     const totalPrice=cart.reduce((total,item)=>total+=item.Price*item.qty,0)
     const totalAmount=(item)=>{
      return item.qty*item.Price
     }
     const clearProduct=()=>{
       setCart([]);
     }
     const buyNow=(id)=>{
        const buyProduct=cart.find((item)=>item.id===id)
        const remove=cart.filter((item)=>item.id!==id)
        setBuy([...buy,buyProduct])
        setCart(remove)
     } */

  return (
    <div style={{backgroundColor:'lightgrey'}}>
      <Navigation/>
    <Container  style={{alignItems:'center'}}className=' mt-4 p-4'>
    <h1 style={{textAlign:'center',fontFamily:'serif'}}><u>Cart</u></h1>
    <div  className='m-4 p-5 mt-4 d-flex align-items-center justify-content-center flex-wrap'>
       {
       cart.map((item)=>(
          <div key={item._id}>
      <Card className="shadow p-5 m-1 bg-body-tertiary rounded" style={{ width: '23rem', height: '30rem', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Card.Img variant="top" src={item.image} style={{height:"200px",width:'250px'}}/>
      <Card.Body>
        <Card.Title style={{fontFamily:'serif',textAlign:'center'}}>{item.title}</Card.Title>
        <Card.Title style={{fontFamily:'serif',textAlign:'center'}}>Price:{item.price}</Card.Title>
        <div style={{position:'relative',right:'40px'}}><h6 style={{alignItems:'center',position:'relative',left:'70px'}}>qty:{item.quantity}<br/>
          <Button className='m-1' style={{backgroundColor:'black',border:'none',position:'relative',right:'15px'}}>-</Button>
          <Button  className='m-1' style={{backgroundColor:'black',border:'none',position:'relative',right:'15px'}}>+</Button></h6>
          </div>
          {/* <h6 style={{textAlign:'center'}}>Total</h6>      */}
          <Button onClick={()=>removeCartItem(item._id)} style={{backgroundColor:'black',marginLeft:'10px',border:'none'}}>Remove</Button>
      </Card.Body>
    </Card><br/>
    </div>
        ))}    
      </div>
      <h2 style={{textAlign:'center'}}>Total Price:</h2>
      <button onClick={handlePayment} style={{height:"40px",width:'85px',border:'none',backgroundColor:'black',color:'white',position:'relative',left:'600px',borderRadius:'8px',marginRight:'10px'}}>
      Buy Now</button>
      <button style={{height:"40px",width:'85px',border:'none',backgroundColor:'black',color:'white',position:'relative',left:'600px',borderRadius:'8px'}}>
      Clear</button>
    </Container>
    </div>
  )
}
export default Cart 