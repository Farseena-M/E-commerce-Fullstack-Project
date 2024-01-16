 import React from 'react'
import { useContext } from 'react'
import { userContext } from '../App'
import { Button, Card, Container } from 'react-bootstrap'
import Navigation from '../Components/Navigation'
const Cart = () => {
  const {cart,setCart,buy,setBuy} =useContext(userContext)
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
     }
  return (
    <div style={{backgroundColor:'lightgrey'}}>
      <Navigation/>
    <Container  style={{alignItems:'center'}}className=' mt-4 p-4'>
    <h1 style={{textAlign:'center',fontFamily:'serif'}}><u>Cart</u></h1>
    <div  className='m-4 p-5 mt-4 d-flex align-items-center justify-content-center flex-wrap'>
       {
       cart.map((item)=>(
          <div key={item.id}>
      <Card className="shadow p-5 m-1 bg-body-tertiary rounded" style={{ width: '23rem', height: '30rem', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Card.Img variant="top" src={item.productImage}style={{height:"200px",width:'250px'}}/>
      <Card.Body>
        <Card.Title style={{fontFamily:'serif',textAlign:'center'}}>{item.productName}</Card.Title>
        <Card.Title style={{fontFamily:'serif',textAlign:'center'}}>Price:{item.Price}</Card.Title>
        <div><h6 style={{alignItems:'center',position:'relative',left:'70px'}}>qty:{item.qty}<br/>
          <Button onClick={()=>dcrmnt(item.id)} className='m-1' style={{backgroundColor:'black',border:'none',position:'relative',right:'15px'}}>-</Button>
          <Button onClick={()=>incrmnt(item.id)} className='m-1' style={{backgroundColor:'black',border:'none',position:'relative',right:'15px'}}>+</Button></h6>
          <h6 style={{textAlign:'center'}}>Total:{totalAmount(item)}</h6>
        </div>     
          <Button onClick={()=>buyNow(item.id)} style={{backgroundColor:'black',marginLeft:'10px',border:'none'}}>Buy now</Button>
          <Button onClick={()=>remove(item.id)} style={{backgroundColor:'black',marginLeft:'10px',border:'none'}}>Remove</Button>
      </Card.Body>
    </Card><br/>
    </div>
        ))}    
      </div>
      <h2 style={{textAlign:'center'}}>Total Price:{totalPrice}</h2>
      <button onClick={clearProduct}
      style={{height:"40px",width:'85px',border:'none',backgroundColor:'black',color:'white',position:'relative',left:'600px',borderRadius:'8px'}}>
      Clear</button>
    </Container>
    </div>
  )
}
export default Cart 