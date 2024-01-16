import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../App'
import { Card, Container} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import { useNavigate} from 'react-router-dom'
import Navigation from '../Components/Navigation'
import Footer from '../Components/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
const Collections = () => {
  const{search,setSearch}=useContext(userContext)
  const [product,setProduct] =useState([])
  const Nvgt=useNavigate()

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

export default Collections