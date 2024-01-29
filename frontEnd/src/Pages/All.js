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
      if (rspns.status === 200){
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
           <CardSubtitle title="wishlist" style={{display:'flex',position:'relative',right:'150px',top:'0.5px',fontSize:'22px',cursor:'pointer',color:'grey'}} onClick={()=>addToWishList(item._id)}><    FaHeart /></CardSubtitle>
      <Card.Img variant="top" src={item.image}style={{height:"200px",width:'250px'}}/>
      <Card.Body>
        <Card.Title style={{fontFamily:'serif',textAlign:'center'}}><b>{item.title}</b></Card.Title>
        <Card.Title style={{fontFamily:'serif',textAlign:'center'}}>${item.price}</Card.Title><br/><br/>
        <Button onClick={()=>Nvgt(`/view/${item._id}`)} style={{backgroundColor:'black',border:'none',alignItems:'center'}}>View Product</Button>
      </Card.Body>
    </Card><br/>
    </div>
        ))}
        </div>
        </Container>

{/* <section style={{"background-color": "lightgrey"}}>
  <div class="text-center container py-5 ">
    <div class="row">
      <div class="col-lg-4 col-md-12 mb-4 ">
      {
       Searches.map((item)=>(
        <div class="card" >
          <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
            data-mdb-ripple-color="light" >
            <img src={item.image}
              class="w-100" style={{height:'300px',width:'300px'}}/>
            <a href="#!">
              <div class="mask">
                <div class="d-flex justify-content-start align-items-end h-100">
                <CardSubtitle title="wishlist" style={{display:'flex',position:'relative',left:'40px',top:'20px',fontSize:'22px',cursor:'pointer'}} onClick={()=>addToWishList(item._id)}><    FaHeart /></CardSubtitle>
                </div>
              </div>
              <div class="hover-overlay">
                <div class="mask" style={{"background-color": "rgba(251, 251, 251, 0.15);"}}></div>
              </div>
            </a>
          </div>
          <div class="card-body">
            <a href="" class="text-reset">
              <h2 class="card-title mb-3">{item.title}</h2>
            </a>
            <h5 class="mb-3">${item.price}</h5>
          </div>
          <Button onClick={()=>Nvgt(`/view/${item._id}`)} style={{backgroundColor:'grey',border:'none',alignItems:'center',color:'black'}}>View Product</Button>
        </div>
         ))}
      </div>
</div>
</div>
</section> */}
        <Footer/>
    </div>
  )
}

export default All