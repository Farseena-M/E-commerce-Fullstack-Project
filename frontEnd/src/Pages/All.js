import React, { useContext, useEffect, useState } from 'react'
import { Axios, userContext } from '../App'
import { Card, CardSubtitle, Container} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import { useNavigate} from 'react-router-dom'
import Navigation from '../Components/Navigation'
import Footer from '../Components/Footer'
import { FaHeart } from "react-icons/fa";
import axios from 'axios'
import { toast } from 'react-toastify'
const All = () => {
  const{search,setSearch}=useContext(userContext)
  const [product,setProduct] =useState([])
  const Nvgt=useNavigate()
  const userId = localStorage.getItem('userId')

  useEffect(()=>{
    const fetchProducts = async () =>{
    try{
      const res = await axios.get('http://localhost:9000/api/users/products')
       console.log(res.data.data.products);
      if(res.status === 200){
       setProduct(res.data.data.products);
      }
    }catch (err) {
      toast.error(err);
    }
  }
  fetchProducts()
},[])
  
  const Searches=product.filter((val)=>{
    if(search===''){
      return val;
    }else if(val.title.toLowerCase().includes(search.toLowerCase())){
      return val;
    }else{
      return '';
    }
  })

  const addToWishList=async(id)=>{
    try{
      const rspns = await Axios.post(`http://localhost:9000/api/users/wishlist/${userId}`,{product:id})
      console.log(rspns);
      if (rspns.status === 201){
          await Axios.get(`http://localhost:9000/api/users/wishlist/${userId}`)
          toast.success("Product added to the wishlist!")
        }
    }catch(err){
      toast.error(err.message)
    }
  }

  return (
    <div style={{backgroundColor:'lightgrey'}}>
      <Navigation/>
      <div
        className="templateContainer "
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <div className="searchInput_Container">
          <input
            style={{ width: "350px" ,height:'35px',border:'none',borderRadius:'5px',position:'relative',top:'30px'}}
            id="searchInput"
            type="text"
            placeholder="Search here..."
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
      </div>

    <Container>
      <div className='m-4 p-5 mt-4 d-flex align-items-center justify-content-center flex-wrap'>
      {
       Searches.map((item)=>(
          <div>
           <Card className="shadow p-5 m-1 bg-body-tertiary rounded" style={{ width: '23rem', height: '28rem', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
           <CardSubtitle title="wishlist" style={{display:'flex',position:'relative',right:'150px',top:'0.5px',fontSize:'22px',cursor:'pointer'}} onClick={()=>addToWishList(item._id)}><    FaHeart /></CardSubtitle>
      <Card.Img variant="top" src={item.image}style={{height:"200px",width:'250px'}}/>
      <Card.Body>
        <Card.Title style={{fontFamily:'serif',textAlign:'center'}}>{item.title}</Card.Title>
        <Card.Title style={{fontFamily:'serif',textAlign:'center'}}>Price:{item.price}</Card.Title><br/><br/>
        <Button onClick={()=>Nvgt(`/view/${item._id}`)} style={{backgroundColor:'black',border:'none',alignItems:'center'}}>View Product</Button>
      </Card.Body>
    </Card><br/>
    </div>
        ))}
        </div>
        </Container>
        <Footer/>
    </div>
  )
}

export default All