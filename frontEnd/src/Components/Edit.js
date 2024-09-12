import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './SideBar'
import { useNavigate, useParams } from 'react-router-dom'
import { AXIOS } from '../App'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

const Edit = () => {
  const nvgt = useNavigate()
  const { id } = useParams()
  const [products, setProducts] = useState({ title: '', image: '', description: '', price: '', category: '', quantity: '' })
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const rspns = await AXIOS.put(`http://localhost:9000/api/admin/products/${id}`)
        console.log(rspns.data.data.products);
        const { _id, title, description, image, price, category, quantity } = rspns.data.data.products
        setProducts({
          id: _id,
          title,
          description,
          image,
          price,
          category,
          quantity
        })
      } catch (err) {
        toast.error(err)
      }
    }
    fetchProduct()
  }, [])

  const saveData = async () => {
    try {
      const rspns = await AXIOS.put(`http://localhost:9000/api/admin/products/${id}`, products)
      console.log(rspns);
      nvgt('/adminprdcts')
    } catch (err) {
      toast.error(err)
    }
  }
  const handleChange = (a) => {
    const { name, value } = a.target;
    console.log(value)
    setProducts((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: '1', textAlign: 'center', backgroundColor: 'grey', height: '990px', width: '100%' }}>
        <h1 style={{ fontFamily: 'sans-serif', padding: '10px', position: 'relative', top: '30px', color: '#333' }}>Edit Product</h1><br /><hr />
        <Form>
          <label style={{ fontSize: '20px', fontFamily: 'italic' }}> Product Name </label><br />
          <input className='shadow' style={{ height: '45px', width: '500px', border: '1px solid grey', borderRadius: '8px', textAlign: 'center' }} type='text' name='title' value={products.title} onChange={handleChange} /><br /><br />
          <label style={{ fontSize: '20px', fontFamily: 'italic' }}> Product Description </label><br />
          <input className='shadow' style={{ height: '45px', width: '500px', border: '1px solid grey', borderRadius: '8px', textAlign: 'center' }} type='text' name='description' value={products.description} onChange={handleChange} /><br /><br />
          <label style={{ fontSize: '20px', fontFamily: 'italic' }} > Product Price </label><br />
          <input className='shadow' style={{ height: '45px', width: '500px', border: '1px solid grey', borderRadius: '8px', textAlign: 'center' }} type='number' name='price' value={products.price} onChange={handleChange} /><br /><br />

          <label style={{ fontSize: '20px', fontFamily: 'italic' }} > Product Image </label><br />
          <input className='shadow' style={{ height: '45px', width: '500px', border: '1px solid grey', borderRadius: '8px', textAlign: 'center' }} type='text' name='image' value={products.image} onChange={handleChange} /><br /><br />

          <select className='shadow' style={{ height: '40px', width: '300px', border: '1px solid grey', borderRadius: '8px', textAlign: 'center', fontSize: '20px' }} name='category' value={products.category} onChange={handleChange}>
            <option>Product Type</option>
            <option>Cloth</option>
            <option>Product</option></select><br /><br />
          <Button onClick={saveData} style={{ backgroundColor: 'black', border: '1px solid grey', height: '40px', width: '100px' }} >Save</Button>
        </Form>
      </div>
    </div>
  )
}

export default Edit