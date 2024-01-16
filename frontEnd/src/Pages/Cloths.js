import { PRODUCTS } from '../Components/Products'
import Navigation from '../Components/Navigation'
import { Button, Card, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import { useEffect, useState } from 'react'
import { Axios } from '../App'
import { toast } from 'react-toastify'
const Cloths = () => {
  const Nvgt=useNavigate()
  const [cloth,setCloth] = useState([])
  useEffect(()=>{
    const categoryProduct = async () =>{
     try{
      const response = await Axios.get('http://localhost:9000/api/users/category/cloth')
      console.log(response.data.data.products);
      setCloth(response.data.data.products)
     }catch(err){
      toast.error(err)
     }
    }
    categoryProduct()
  },[])
  return (
    <div style={{backgroundColor:'lightgrey'}}>
      <Navigation/>
      <Container>
      <div className='m-4 p-5 mt-4 d-flex align-items-center justify-content-center flex-wrap'>
      {
       cloth.map((item)=>(
          <div>
           <Card className="shadow p-5 m-1 bg-body-tertiary rounded" style={{ width: '23rem', height: '28rem', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Card.Img variant="top" src={item.image}style={{height:"200px",width:'250px'}}/>
      <Card.Body>
        <Card.Title style={{fontFamily:'serif',textAlign:'center'}}>{item.title}</Card.Title>
        <Card.Title style={{fontFamily:'serif',textAlign:'center'}}>Price:{item.price}</Card.Title><br/><br/>
        <Button onClick={()=>Nvgt(`/view/${item._id}`)} style={{backgroundColor:'black',border:'none'}} variant="primary">View product</Button>
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

export default Cloths