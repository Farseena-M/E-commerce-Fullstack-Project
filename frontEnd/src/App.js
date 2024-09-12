import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login"
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import { createContext, useState } from "react";
import { PRODUCTS } from "./Components/Products";
import Cloths from "./Pages/Cloths";
import Prdcts from "./Pages/Prdcts";
import ViewProduct from "./Pages/ViewProduct";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import AdminLogin from "./Pages/AdminLogin";
import Sidebar from "./Components/SideBar";
import AdminUsers from "./Pages/AdminUsers";
import AdminHome from "./Pages/AdminHome";
import AdminPrdcts from "./Pages/AdminPrdcts";
import Edit from "./Components/Edit";
import Add from "./Components/Add";
import BuyProduct from "./Components/BuyProduct";
import SignUp from "./Pages/SignUp";
import axios from 'axios'
import Wishlist from "./Pages/wishList";
import All from "./Pages/All";

export const userContext = createContext()

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:9000/",
  headers: {
    Authorization: localStorage.getItem("userToken")
  }
})

export const AXIOS = axios.create({
  baseUrl: process.env.REACT_APP_BASE_URL || "http://localhost:9000/",
  headers: {
    Authorization: localStorage.getItem('adminToken')
  }
})


function App() {
  const [user, setUser] = useState([])
  const [login, setLogin] = useState(false)
  const [product, setProduct] = useState(PRODUCTS)
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [buy, setBuy] = useState([])
  return (
    <div>
      <userContext.Provider value={{ user, setUser, login, setLogin, product, cart, setCart, setProduct, search, setSearch, buy, setBuy }}>
        <Routes>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cloths" element={<Cloths />}></Route>
          <Route path="/prdcts" element={<Prdcts />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/adminlogin" element={<AdminLogin />}></Route>
          <Route path="/sidebar" element={<Sidebar />}></Route>
          <Route path="/adminusers" element={<AdminUsers />}></Route>
          <Route path="/adminhome" element={<AdminHome />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
          <Route path="/adminprdcts" element={<AdminPrdcts />}></Route>
          <Route path="/add" element={<Add />}></Route>
          <Route path="/buy" element={<BuyProduct />}></Route>
          <Route path="/all" element={<All />}></Route>
          <Route path="/view/:id" element={<ViewProduct />}></Route>
          <Route path="/wishlist" element={<Wishlist />}></Route>
        </Routes>
      </userContext.Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
