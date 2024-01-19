import React, { useEffect, useState } from 'react'
import {Axios} from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Container } from 'react-bootstrap'
import Navigation from '../Components/Navigation'
import { toast } from 'react-toastify'
import axios from 'axios'
const userId = localStorage.getItem('userId')
console.log(userId);

const ViewProduct = () => {
    const Nvgt = useNavigate()
    const { id } = useParams();
    const [product, setProduct] = useState([])
    console.log(userId);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const rspns = await axios.get(`http://localhost:9000/api/users/prdcts/${id}`)
                console.log(rspns.data.data.products);
                setProduct(rspns.data.data.products);
            } catch (err) {
                toast.error(err)
            }
        }
        fetchProduct()
    }, [])
    let a = [];
    a.push(product);

    // cart section

    const handleCart = async () => {
      try{
        const rspns = await Axios.post(`http://localhost:9000/api/users/cart/${userId}`,{product:id})
        console.log(rspns);
        if (rspns.status === 200){
            await Axios.get(`http://localhost:9000/api/users/cart/${userId}`)
            toast.success("Product added to the cart!")
          }
      }catch(err){
        toast.error(err.message)
      }
    }

    return (
        <div style={{ backgroundColor: 'lightgrey', position: 'absolute', height: '100%', width: '100%' }}>
            <Navigation />
            <Container style={{ alignItems: 'center' }} className=' mt-4 p-4'>
                <div className='m-4 p-5 mt-4 d-flex align-items-center justify-content-center flex-wrap'>
                    {
                        a.map((item) => (
                            <div>
                                <Card className="shadow p-5 m-1 bg-body-tertiary rounded" style={{ width: '23rem', height: '28rem', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Card.Img variant="top" src={item.image} style={{ height: "250px", width: '250px' }} />
                                    <Card.Body>
                                        <Card.Title style={{ fontFamily: 'serif', textAlign: 'center' }}>{item.title}</Card.Title>
                                        {/* <Card.Title style={{ fontFamily: 'serif', textAlign: 'center' }}>{item.description}</Card.Title> */}
                                        <Card.Title style={{ fontFamily: 'serif', textAlign: 'center' }}>{item.price}</Card.Title>
                                        {/* {cart.find((crtItm) => crtItm.id === item.id) ? */}
                                            {/* <Button onClick={() => Nvgt(`/cart/${userId}`)} style={{ backgroundColor: 'black', border: 'none' }}>Go to cart</Button>  */}
                                            <Button onClick={handleCart} style={{ backgroundColor: 'black', border: 'none' }}>Add to cart</Button>
                                </Card.Body>
                            </Card><br />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default ViewProduct










/* return (
     <div class="card card-body mt-3">
                          <div class="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
                              <div class="mr-2 mb-3 mb-lg-0">
                                  
                                       <img src="" width="150" height="150" alt=""> 
                                 
                              </div>

                              <div class="media-body">
                                  <h6 class="media-title font-weight-semibold">
                                      <a href="#" data-abc="true">Apple iPhone XS Max (Gold, 64 GB)</a>
                                  </h6>

                                  <ul class="list-inline list-inline-dotted mb-3 mb-lg-2">
                                      <li class="list-inline-item"><a href="#" class="text-muted" data-abc="true">Phones</a></li>
                                      <li class="list-inline-item"><a href="#" class="text-muted" data-abc="true">Mobiles</a></li>
                                  </ul>

                                  <p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto ea,<br /> praesentium ratione illum veritatis culpa provident quisquam soluta tenetur nisi. Aperiam laudantium esse sed,
                                  <br /> error doloremque ratione laboriosam totam possimus. </p>

                                  <ul class="list-inline list-inline-dotted mb-0">
                                      <li class="list-inline-item">All items from <a href="#" data-abc="true">Mobile junction</a></li>
                                      <li class="list-inline-item">Add to <a href="#" data-abc="true">wishlist</a></li>
                                  </ul>
                              </div>

                              <div class="mt-3 mt-lg-0 ml-lg-3 text-center">
                                  <h3 class="mb-0 font-weight-semibold">$612.99</h3>

                                  <div>
                                      <i class="fa fa-star"></i>
                                      <i class="fa fa-star"></i>
                                      <i class="fa fa-star"></i>
                                      <i class="fa fa-star"></i>
                                      <i class="fa fa-star"></i>

                                  </div>

                                  <div class="text-muted">2349 reviews</div>

                                  <button type="button" class="btn btn-warning mt-4 text-white"><i class="icon-cart-add mr-2"></i> Add to cart</button>
                              
                              </div>

                          </div>
                      </div>   
)
}

export default ViewProduct */