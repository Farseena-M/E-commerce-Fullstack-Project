import React, { useEffect, useState } from 'react'
import { Axios } from '../App'
import Navigation from '../Components/Navigation'
import { toast } from 'react-toastify'
import { useAuthContext } from '../Context/AuthContext'
const Cart = () => {
  const [cart, setCart] = useState([])
  const { authUser } = useAuthContext()


  const cartProducts = async () => {
    try {
      const rspns = await Axios.get(`http://localhost:9000/api/users/cart/${authUser._id}`)
      //  console.log(rspns.data.data);
      setCart(rspns.data.data)

    } catch (err) {
      toast.error(err)
    }
  }
  useEffect(() => {
    cartProducts()
  }, [])




  const removeCartItem = async (id) => {
    try {
      const productId = id
      const rspns = await Axios.delete(`http://localhost:9000/api/users/cart/${authUser._id}`, { data: { productId: productId } })
      console.log(rspns);
      cartProducts()
    } catch (err) {
      toast.error(err)
    }
  }


  const handlePayment = async () => {
    try {
      const rspns = await Axios.post(`http://localhost:9000/api/users/payment/${authUser._id}`)
      // console.log(rspns.data.session);
      const Session = rspns.data.session;
      console.log(Session);
      window.location.href = Session
    } catch (err) {
      toast.error(err)
    }
  }

  const totalCartPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  return (
    <>
      <div style={{ background: "#f0f0f0", minHeight: '100vh' }}>
        <Navigation />
        <div className="continer" style={{ color: "white" }}>
          <h1 className="mt-4" style={{ textAlign: 'center', color: 'black', fontFamily: 'Georgia, serif', fontSize: '2rem' }}>
            My Cart
          </h1>
          <div className="flex justify-between items-center p-1 bg-gray-100 rounded-lg shadow-md">
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 500,
                color: "#333333",
                fontFamily: "'Helvetica Neue', sans-serif",
              }}
            >
              Total Amount: ₹{totalCartPrice}
            </h2>
          </div>
          <ul className="list-group">
            {cart.map((item) => (
              <li
                key={item._id}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "" }}
              >
                <div>
                  <h5>{item.title}</h5>
                  <p>
                    {" "}
                    <i class="bi bi-currency-rupee"></i>
                    ₹{item.price}

                  </p>
                  <div className="input-group">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeCartItem(item._id)}
                      type="button"
                      className="btn btn-outline-danger"
                    >
                      Remove
                    </button>
                    <button
                      onClick={handlePayment}
                      type="button"
                      className="btn btn-outline-success "
                    >
                      Buy now
                    </button>
                  </div>
                </div>
                <div>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100px" }}
                  />
                  <p>Quantity :{item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
export default Cart 