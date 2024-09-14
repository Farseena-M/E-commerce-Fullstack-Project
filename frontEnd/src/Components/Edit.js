import React, { useEffect, useState } from 'react'
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
      // console.log(rspns);
      nvgt('/adminprdcts')
      toast.success(`Product Edited Successfully`)
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
    <div className='d-flex'>
      <Sidebar />
      <div style={{ flex: '1', textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.1)', height: '100vh', padding: '20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', marginTop: '30px' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#4A4A4A', fontStyle: 'oblique', fontSize: '2.5rem', fontWeight: 'lighter' }}>
            Edit Product
          </h1>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label style={{ fontSize: '16px', fontFamily: 'italic' }}>Product Name</Form.Label>
              <Form.Control
                type="text"
                name='title'
                value={products.title}
                onChange={handleChange}
                required
                style={{ marginBottom: '15px', height: '35px' }}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label style={{ fontSize: '16px', fontFamily: 'italic' }}>Product Description</Form.Label>
              <Form.Control
                type="text"
                name='description'
                value={products.description}
                onChange={handleChange}
                required
                style={{ marginBottom: '15px', height: '35px' }}
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label style={{ fontSize: '16px', fontFamily: 'italic' }}>Product Price</Form.Label>
              <Form.Control
                type="number"
                name='price'
                value={products.price}
                onChange={handleChange}
                required
                style={{ marginBottom: '15px', height: '35px' }}
              />
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label style={{ fontSize: '16px', fontFamily: 'italic' }}>Product Image URL</Form.Label>
              <Form.Control
                type="text"
                name='image'
                value={products.image}
                onChange={handleChange}
                required
                style={{ marginBottom: '15px' }}
              />
            </Form.Group>

            <Form.Group controlId="formQuantity">
              <Form.Label style={{ fontSize: '16px', fontFamily: 'italic' }}>Quantity</Form.Label>
              <Form.Control
                type="number"
                name='quantity'
                value={products.quantity}
                onChange={handleChange}
                required
                style={{ marginBottom: '15px', height: '35px' }}
              />
            </Form.Group>

            <Form.Group controlId="formCategory">
              <Form.Label style={{ fontSize: '16px', fontFamily: 'italic' }}>Category</Form.Label>
              <Form.Control
                as="select"
                name='category'
                value={products.category}
                onChange={handleChange}
                required
                style={{ marginBottom: '15px', height: '35px' }}
              >
                <option value="">Select Category</option>
                <option value="cloth">Cloth</option>
                <option value="product">Product</option>
              </Form.Control>
            </Form.Group>

            <Button onClick={saveData} className="custom-button btn btn-dark w-100">
              Save
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Edit