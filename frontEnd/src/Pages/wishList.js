import React, { useEffect, useState } from "react";
import { Axios} from "../App";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navigation from "../Components/Navigation";
const userId=localStorage.getItem("userId")

const Wishlist = () => {
    const[wishlist,setWishlist]=useState([])

    const Nvgt = useNavigate();
  
    const fetchwishlist=async()=>{
      try {
        const response=await Axios.get(`http://localhost:9000/api/users/wishlist/${userId}`)
        console.log(response.data.data);
        setWishlist(response.data.data)
      } catch (err) {
        console.log("error fetching the product");
        toast.error(err);
      }
    }
    useEffect(()=>{
      fetchwishlist()
    },[])
  
    const RemoveCartItem=async(id)=>{
      try {
        const productId=id;
        const res=await Axios.delete(`http://localhost:9000/api/users/wishlist/${userId}`,{
          data: { productId: productId }  
        })
        fetchwishlist()
        console.log(res);
      } catch (err) {
        console.log("error fetching the product");
        toast.error(err);
      }
    }

   
    
  
  return (
    <div style={{ background: "rgb(230, 230, 219)",height:'930px',width:'100%' }}>
    <Navigation />
    <Container>
      <h2 style={{ textAlign: "center", padding: "10px" }}> My Wishlist</h2>
      <hr />
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="d-flex align-items-center justify-content-center flex-wrap"
          >
            <Card
              className="shadow p-1 m-2 bg-body-tertiary rounded"
              style={{
                width: "13rem",
                height: "22rem",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardBody>
                <CardImg
                  style={{ height: "11rem" }}
                  className="p-2"
                  variant="top"
                  src={item.image}
                />
                <CardTitle style={{ textAlign: "center" }}>
                  {item.title}
                </CardTitle>
                <h6 style={{ textAlign: "center" }}>Price: {item.price}</h6>
                <p style={{ textAlign: "center" }}>Qty: {item.quantity}</p>
                
                <div>
                 
                  <Button
                    className="m-2"
                    variant="outline-dark"
                    onClick={() => RemoveCartItem(item._id)}
                  >
                    Remove
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
      <div className=" p-5 " style={{ background: "rgb(230, 230, 219)" }}>
      
       
        
        <div style={{ textAlign: "center" }}>
          <Button onClick={() => Nvgt("/")}>Back To Home</Button>
        </div>
      </div>
    </Container>
  </div>
  )
}

export default Wishlist;