import React, { useState } from 'react';
import Sidebar from './SideBar';
import { Button, Form } from 'react-bootstrap';
import { AXIOS } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const Nvgt = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !image || !price || !category || !quantity) {
      toast.error('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('quantity', quantity);

    buttonSubmit(formData);
  }

  const buttonSubmit = async (formData) => {
    try {
      const rspns = await AXIOS.post('http://localhost:9000/api/admin/create', formData);
      if (rspns.status === 201) {
        toast.success('Product added successfully');
        Nvgt('/adminprdcts');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to add product');
    }
  }

  return (
    <div className='d-flex'>
      <Sidebar />
      <div style={{ flex: '1', textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.1)', height: '100vh', padding: '20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', marginTop: '30px', marginRight: '250px' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#4A4A4A', fontStyle: 'oblique', fontSize: '2.5rem', fontWeight: 'lighter' }}>
            Add Product
          </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label style={{ fontSize: '16px', fontFamily: 'italic' }}>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ marginBottom: '15px', height: '35px' }}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label style={{ fontSize: '16px', fontFamily: 'italic' }}>Product Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ marginBottom: '15px', height: '35px' }}
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label style={{ fontSize: '16px', fontFamily: 'italic' }}>Product Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                style={{ marginBottom: '15px', height: '35px' }}
              />
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label style={{ fontSize: '16px', fontFamily: 'italic' }}>Product Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleChangeImage}
                required
                style={{ marginBottom: '15px' }}
              />
            </Form.Group>

            <Form.Group controlId="formQuantity">
              <Form.Label style={{ fontSize: '16px', fontFamily: 'italic' }}>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                style={{ marginBottom: '15px', height: '35px' }}
              />
            </Form.Group>

            <Form.Group controlId="formCategory">
              <Form.Label style={{ fontSize: '16px', fontFamily: 'italic' }}>Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                style={{ marginBottom: '15px', height: '35px' }}
              >
                <option value="">Select Category</option>
                <option value="cloth">Cloth</option>
                <option value="product">Product</option>
              </Form.Control>
            </Form.Group>
            <Button type="submit" className="custom-button btn btn-dark w-100">
              Add
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Add;
