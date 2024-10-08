import React, { useEffect, useState } from 'react';
import { Axios } from '../App';
import { Card, CardSubtitle, Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import { FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useAuthContext } from '../Context/AuthContext';

const Cloths = () => {
  const Nvgt = useNavigate();
  const [cloth, setCloth] = useState([]);
  const {authUser}= useAuthContext()

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const response = await Axios.get('http://localhost:9000/api/users/category/cloth');
        // console.log(response.data.data.products);
        if (response.status === 200) {
          setCloth(response.data.data.products);
        }
      } catch (err) {
        toast.error(err.message);
      }
    };
    fetchClothes();
  }, []);

  const addToWishList = async (id) => {
    try {
      const rspns = await Axios.post(`http://localhost:9000/api/users/wishlist/${authUser._id}`, { product: id });
      // console.log(rspns);
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
      <Container>
        <Row className='m-4'>
          {cloth.map((item) => (
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
                      backgroundColor: 'gray',
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

export default Cloths;
