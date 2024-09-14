import React, { useContext, useEffect, useState } from 'react';
import { Axios, userContext } from '../App';
import Navigation from '../Components/Navigation';
import { toast } from 'react-toastify';
import { useAuthContext } from '../Context/AuthContext';

const Cart = () => {
  const { cart, setCart } = useContext(userContext);
  const { authUser } = useAuthContext();

  const cartProducts = async () => {
    try {
      const rspns = await Axios.get(`http://localhost:9000/api/users/cart/${authUser._id}`);
      setCart(rspns.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch cart items');
    }
  };

  useEffect(() => {
    cartProducts();
  }, [authUser._id]);

  const removeCartItem = async (id) => {
    try {
      const productId = id;
      await Axios.delete(`http://localhost:9000/api/users/cart/${authUser._id}`, { data: { productId } });
      cartProducts();
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove cart item');
    }
  };

  const handlePaymentAll = async () => {
    try {
      const rspns = await Axios.post(`http://localhost:9000/api/users/payment/${authUser._id}`);
      const Session = rspns.data.session;
      window.location.href = Session;
    } catch (err) {
      console.error(err);
      toast.error('Payment failed');
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

  const totalCartPrice = Array.isArray(cart) ? cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ) : 0;

  return (
    <>
      <div style={{ background: "#f0f0f0", minHeight: '100vh' }}>
        <Navigation />
        <div className="container mt-4">
          <h1 className="text-center text-dark mb-4" style={{ fontFamily: 'Georgia, serif', fontSize: '2rem' }}>
            My Cart
          </h1>
          <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-lg shadow-sm mb-4">
            <h2 className="font-weight-bold" style={{ fontSize: "20px", color: "#333333", fontFamily: "'Helvetica Neue', sans-serif" }}>
              Total Amount: ₹{totalCartPrice}
            </h2>
            <button
              type="button"
              class="btn btn-success"
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '1rem',
                fontSize: '1rem',
                border: '1px solid',
              }}
              onClick={handlePaymentAll}
            >
              Buy All
            </button>
          </div>
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <div className="d-flex flex-column">
                  <h5>{item.title}</h5>
                  <p><i className="bi bi-currency-rupee"></i> ₹{item.price}</p>
                  <div className="btn-group mb-2">
                    <button type="button" className="btn btn-outline-secondary">-</button>
                    <button type="button" className="btn btn-outline-secondary">+</button>
                    <button onClick={() => removeCartItem(item._id)} type="button" className="btn btn-outline-danger">Remove</button>
                    <button type="button" onClick={() => handlePayment(item._id)} className="btn btn-outline-success">Buy now</button>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <img src={item.image} alt={item.title} className="img-fluid mb-2" style={{ width: "100px" }} />
                  <p>Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Cart;
