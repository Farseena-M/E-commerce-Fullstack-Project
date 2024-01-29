 import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Axios, userContext } from '../App'
import { Button, Card, Container } from 'react-bootstrap'
import Navigation from '../Components/Navigation'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
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

  const totalCartPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
    <>
     <div className="vh-100" style={{backgroundColor:'lightgrey'}}>
      <Navigation/>
      <div className="continer" style={{ color: "white" }}>
        <h1 className="mt-4" style={{textAlign:'center',color:'black '}}>Your Cart</h1>
        <ul className="list-group">
          {cart.map((item) => (
            <li
              key={item._id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ backgroundColor: "" }}
            >
              <div>
                <h5>{item.title}</h5>
                <p>
                  {" "}
                  <i class="bi bi-currency-rupee"></i>
                  ${item.price}
                  
                </p>
                <div className="input-group">
                  <button
                    // onClick={() => cartDegrement(item)}
                    type="button"
                    className="btn btn-outline-secondary"
                  >
                    -
                  </button>
                  <button
                    // onClick={() => cartIncrement(item)}
                    type="button"
                    className="btn btn-outline-secondary"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeCartItem(item._id)}
                    type="button"
                    className="btn btn-outline-danger"
                  >
                    Remove
                  </button>
                  <button
                    onClick={handlePayment}
                    type="button"
                    className="btn btn-outline-success "
                  >
                    Buy now
                  </button>
                </div>
              </div>
              <div>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: "100px" }}
                />
                <p>Quantity :{item.quantity}</p>
                {/* <p>
                  Total : <i class="bi bi-currency-rupee"></i>
                </p> */}
              </div>
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="mt-3" style={{ fontSize: "25px", fontWeight: 600 ,color:'black'}}>
            Your Total Amount : ${totalCartPrice}
          </h2>
          <p className="mt-3" style={{ fontSize: "25px", fontWeight: 600 }}>
            {/* <i class="bi bi-currency-rupee"></i>{totalAmount} */}
          </p>
        </div>
      </div>
     </div>
    </>
  )
}
export default Cart 