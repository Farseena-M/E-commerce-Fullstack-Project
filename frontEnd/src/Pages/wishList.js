import React, { useEffect, useState } from "react";
import { Axios } from "../App";
import { Button, Card, CardBody, CardImg, CardTitle, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navigation from "../Components/Navigation";
import { useAuthContext } from "../Context/AuthContext";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { authUser } = useAuthContext();

  const fetchWishlist = async () => {
    try {
      const response = await Axios.get(`http://localhost:9000/api/users/wishlist/${authUser._id}`);
      setWishlist(response.data.data);
    } catch (err) {
      toast.error("Error fetching wishlist.");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeWishlistItem = async (id) => {
    try {
      await Axios.delete(`http://localhost:9000/api/users/wishlist/${authUser._id}`, {
        data: { productId: id },
      });
      fetchWishlist();
    } catch (err) {
      toast.error("Error removing item from wishlist.");
    }
  };

  const handlePayment = async (id) => {
    try {
      const response = await Axios.post('http://localhost:9000/api/users/payment', {
        productId: id,
        userId: authUser._id,
      });

      if (response.data.status === 'Success') {
        window.location.href = response.data.session;
      } else {
        toast.error('Payment session creation failed');
      }
    } catch (error) {
      toast.error('An error occurred while processing the payment');
      console.error('Payment Error:', error);
    }
  };

  return (
    <div style={{ background: "#f9f9f9", minHeight: '100vh' }}>
      <Navigation />
      <Container >
        <h2 className="text-center text-dark mb-4" style={{ fontFamily: 'Georgia, serif', fontSize: '2rem' }}>My Wishlist</h2>
        <Row className="justify-content-center">
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <Col xs={12} sm={6} md={4} lg={3} key={item._id} className="mb-4">
                <Card className="shadow-sm border-light">
                  <CardImg variant="top" src={item.image} style={{ height: "200px", objectFit: "cover" }} />
                  <CardBody className="text-center">
                    <CardTitle as="h5" className="text-2xl font-bold text-violet-600 hover:text-violet-800">
                      {item.title}
                    </CardTitle>
                    <p className="text-muted">Price: ₹{item.price}</p>
                    <Button variant="outline-danger" onClick={() => removeWishlistItem(item._id)}>
                      Remove
                    </Button>
                    <Button variant="success" className="ms-2" onClick={() => handlePayment(item._id)}>
                      Buy Now
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <div className="text-center">
              <p>Your wishlist is empty.</p>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Wishlist;
