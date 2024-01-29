import { PRODUCTS } from '../Components/Products'
import Navigation from '../Components/Navigation'
import { Button, Card, CardSubtitle, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { Axios } from '../App'
import { toast } from 'react-toastify'
const Prdcts = () => {
  const Nvgt=useNavigate()
  const [prdct,setPrdct] = useState([])
  const userId = localStorage.getItem('userId')
  useEffect(()=>{
    const categoryProduct = async () =>{
      try{
       const response = await Axios.get('http://localhost:9000/api/users/category/product')
       console.log(response.data.data.products);
       setPrdct(response.data.data.products)
      }catch(err){
       toast.error(err)
      }
     }
     categoryProduct()
  },[])

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
      <Container>
      <div className='m-4 p-5 mt-4 d-flex align-items-center justify-content-center flex-wrap'>
      {
       prdct.map((item)=>(
          <div>
     <Card className="shadow p-5 m-1 bg-body-tertiary rounded" style={{ width: '23rem', height: '28rem', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
     <CardSubtitle title="wishlist" style={{display:'flex',position:'relative',right:'150px',top:'0.5px',fontSize:'22px',cursor:'pointer',color:'grey'}} onClick={()=>addToWishList(item._id)}><    FaHeart /></CardSubtitle>
      <Card.Img variant="top" src={item.image}style={{height:"200px",width:'250px'}}/>
      <Card.Body>
        <Card.Title style={{fontFamily:'serif',textAlign:'center'}}>{item.title}</Card.Title>
        <Card.Title style={{fontFamily:'serif',textAlign:'center'}}>${item.price}</Card.Title><br/><br/>
        <Button onClick={()=>Nvgt(`/view/${item._id}`)} style={{backgroundColor:'black',border:'none'}} variant="primary">View product</Button>
      </Card.Body>
      </Card>
      <br/>
      </div>
        ))}
        </div>
        </Container>
        <Footer/>
    </div>
  )
}

export default Prdcts