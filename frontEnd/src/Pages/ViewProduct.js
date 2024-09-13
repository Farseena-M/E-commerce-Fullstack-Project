import React, { useEffect, useState } from 'react';
import { Axios } from '../App';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../Context/AuthContext';


const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const {authUser}= useAuthContext()


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const rspns = await axios.get(`http://localhost:9000/api/users/prdcts/${id}`);
        setProduct(rspns.data.data.products);
      } catch (err) {
        toast.error(err.message);
      }
    }
    fetchProduct();
  }, [id]);

  const handleCart = async () => {
    try {
      const rspns = await Axios.post(`http://localhost:9000/api/users/cart/${authUser._id}`, { product: id });
      if (rspns.status === 200) {
        toast.success("Product added to the cart!");
      }
    } catch (err) {
      toast.error("Product already added to the cart");
    }
  };

  const addToWishList = async (id) => {
    try {
      const rspns = await Axios.post(`http://localhost:9000/api/users/wishlist/${authUser._id}`, { product: id });
      if (rspns.status === 200) {
        toast.success("Product added to the wishlist!");
      }
    } catch (err) {
      toast.error("Product already added to the wishlist");
    }
  };

  const handlePayment = async() =>{
    try{
    const rspns = await Axios.post(`http://localhost:9000/api/users/payment/${authUser._id}`)
    // console.log(rspns.data.session);
    const Session = rspns.data.session;
    console.log(Session);
    window.location.href = Session     
    }catch(err){
      toast.error(err)  
    }
  }

  return (
    <div className="bg-light min-vh-100">
      <Navigation />
      <section className="py-5 mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              {product && (
                <div className="card shadow-lg border-0 rounded-4">
                  <div className="row g-0">
                    <div className="col-md-12 col-lg-5">
                      <div className="bg-image hover-zoom ripple rounded" style={{ width: '100%', overflow: 'hidden' }}>
                        <img
                          src={product.image}
                          className="img-fluid rounded-start"
                          alt={product.title}
                          style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-7 d-flex flex-column justify-content-between p-4 position-relative">
                      <div>
                        <h1 className="display-4 mb-3" style={{ fontFamily: "'Lora', serif", fontSize: "2.5rem", fontWeight: "700" }}>{product.title}</h1>
                        <p className="text-muted mb-4" style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "1.125rem" }}>{product.description}</p>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h2 className="mb-0" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", color: "#333" }}>₹{product.price}</h2>
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <button className="btn btn-warning btn-lg mb-2" onClick={handleCart} style={{ backgroundColor: '#ffc107', borderColor: '#ffc107' }}>
                          Add to cart
                        </button>
                        <button className="btn btn-success btn-lg mb-2" onClick={handlePayment} style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}>
                          Buy Now
                        </button>
                        <div className="position-absolute top-0 end-0 p-3">
                          <FontAwesomeIcon
                            icon={faHeart}
                            size="2x"
                            className="text-light-gray cursor-pointer"
                            style={{ color: ' #d3d3d3', cursor: 'pointer' }}
                            onClick={() => addToWishList(product._id)}
                            title="Add to wishlist"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewProduct;
