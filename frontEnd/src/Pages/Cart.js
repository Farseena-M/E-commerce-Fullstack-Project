 import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Axios } from '../App'
import { Button, Card, Container } from 'react-bootstrap'
import Navigation from '../Components/Navigation'
import { toast } from 'react-toastify'
const Cart = () => {

  const [cart,setCart] =useState([])
  const userId = localStorage.getItem('userId')

  useEffect(()=>{
   const cartProducts = async() =>{
    try{
       const rspns = await Axios.get(`http://localhost:9000/api/users/cart/${userId}`)
       console.log(rspns.data.data);
       setCart(rspns.data.data)
       
    }catch(err){
      toast.error(err)
    }
   }
   cartProducts()
  },[])
  

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
     console.log(cart);
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
        <div><h6 style={{alignItems:'center',position:'relative',left:'70px'}}>qty:{item.quantity}<br/>
          <Button className='m-1' style={{backgroundColor:'black',border:'none',position:'relative',right:'15px'}}>-</Button>
          <Button  className='m-1' style={{backgroundColor:'black',border:'none',position:'relative',right:'15px'}}>+</Button></h6>
          <h6 style={{textAlign:'center'}}>Total</h6>
        </div>     
          <Button style={{backgroundColor:'black',marginLeft:'10px',border:'none'}}>Buy now</Button>
          <Button  style={{backgroundColor:'black',marginLeft:'10px',border:'none'}}>Remove</Button>
      </Card.Body>
    </Card><br/>
    </div>
        ))}    
      </div>
      <h2 style={{textAlign:'center'}}>Total Price</h2>
      <button style={{height:"40px",width:'85px',border:'none',backgroundColor:'black',color:'white',position:'relative',left:'600px',borderRadius:'8px'}}>
      Clear</button>
    </Container>
    </div>
  )
}
export default Cart 