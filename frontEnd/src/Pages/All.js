import React, { useContext, useEffect, useState } from 'react';
import { Axios, userContext } from '../App';
import { Card, CardSubtitle, Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthContext } from '../Context/AuthContext';

const All = () => {
  const { search, setSearch } = useContext(userContext);
  const [product, setProduct] = useState([]);
  const {authUser}= useAuthContext()
  const Nvgt = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:9000/api/users/products');
        console.log(res.data.data.products);
        if (res.status === 200) {
          setProduct(res.data.data.products);
        }
      } catch (err) {
        toast.error(err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = product.filter((val) => {
    if (search === '') {
      return val;
    } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
      return val;
    } else {
      return '';
    }
  });

  const addToWishList = async (id) => {
    try {
      const rspns = await Axios.post(`http://localhost:9000/api/users/wishlist/${authUser._id}`, { product: id });
      console.log(rspns);
      if (rspns.status === 200) {
        await Axios.get(`http://localhost:9000/api/users/wishlist/${authUser._id}`);
        toast.success("Product added to the wishlist!");
      }
    } catch (err) {
      toast.error("Product already added to the wishlist!");
    }
  };

  return (
    <div style={{ backgroundColor: 'lightgrey' }}>
      <Navigation />
      <div
        className="search-container"
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
        }}
      >
        <input
          style={{
            width: "350px",
            height: '35px',
            border: 'none',
            borderRadius: '5px',
            padding: '0 10px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          }}
          id="searchInput"
          type="text"
          placeholder="Search here..."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      <Container>
        <Row className='m-4'>
          {filteredProducts.map((item) => (
            <Col md={3} className="mb-4 d-flex align-items-stretch" key={item._id}>
              <Card className="shadow p-3 bg-white rounded" style={{ width: '100%', textAlign: 'center' }}>
                <CardSubtitle title="wishlist" style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '22px', cursor: 'pointer', color: 'grey' }} onClick={() => addToWishList(item._id)}>
                  <FaHeart />
                </CardSubtitle>
                <Card.Img variant="top" src={item.image} style={{ height: "200px", objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title style={{ fontFamily: 'serif' }}><b>{item.title}</b></Card.Title>
                  <Card.Title style={{ fontFamily: 'serif' }}>₹{item.price}</Card.Title>
                  <Button
                    style={{
                      backgroundColor: 'black',
                      border: 'none',
                      width: '100%',
                      padding: '10px',
                      borderRadius: '30px',
                      marginTop: '15px',
                      fontWeight: 'bold',
                    }}
                    onClick={()=>Nvgt(`/view/${item._id}`)}
                  >
                    View Product
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default All;
