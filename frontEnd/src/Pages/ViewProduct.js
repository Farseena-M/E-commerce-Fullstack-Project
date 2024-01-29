import React, { useEffect, useState } from 'react'
import {Axios} from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Container } from 'react-bootstrap'
import Navigation from '../Components/Navigation'
import { toast } from 'react-toastify'
import axios from 'axios'
import Footer from '../Components/Footer'
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
        <div style={{ backgroundColor: 'lightgrey', position: 'absolute', height: '100%', width: '100%' }}>
            <Navigation />
<section style={{"background-color": "#eee;"}}>
  <div className="container py-5" >
    <div className="row justify-content-center mb-3" >
      <div className="col-md-12 col-xl-10" >
        {a.map((item)=>(
        <div className="card shadow-0 border rounded-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                <div className="bg-image hover-zoom ripple rounded ripple-surface">
                  <img src={item.image}
                    className="w-100" style={{"height":"300px"}}/>
                  <a href="#!">
                    <div className="hover-overlay">
                      <div className="mask" style={{"background-color": "rgba(253, 253, 253, 0.15);"}}></div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-6">
                <h1>{item.title}</h1>
                <div className="d-flex flex-row">
                
                </div>
                <p className="text-truncate mb-4 mb-md-0">{item.description}</p>
              </div>
              <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                <div className="d-flex flex-row align-items-center mb-1">
                  <h1 className="mb-1 me-1">${item.price}</h1>
                  {/* <span className="text-danger"><s>$20.99</s></span> */}
                </div>
                <h6 className="text-success">Free shipping</h6>
                <div className="d-flex flex-column mt-4">
                  {/* <button className="btn btn-primary btn-sm" type="button">Details</button> */}
                  <button className="btn btn-outline-dark btn-sm mt-2" type="button" onClick={()=>addToWishList(item._id)}>
                    Add to wishlist
                  </button>
                  <button className="btn btn-outline-dark btn-sm mt-2" type="button" onClick={handleCart}>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  </div>
</section>
<Footer />
</div>
    )
}

export default ViewProduct

