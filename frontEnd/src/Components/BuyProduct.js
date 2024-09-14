import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { AXIOS } from '../App';
import { toast } from 'react-toastify';
import Sidebar from './SideBar';

const BuyProduct = () => {
  const [purchasedProducts, setPurchasedProducts] = useState([]);

  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      try {
        const response = await AXIOS.get('http://localhost:9000/api/admin/all-orders');
        // console.log(response.data);
        setPurchasedProducts(response.data);
      } catch (error) {
        toast.error('Failed to fetch purchased products.');
        console.error(error);
      }
    };

    fetchPurchasedProducts();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: '1', textAlign: 'center' }}>
        <Table striped bordered hover size="sm" style={{ margin: '0 auto' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Qty</th>
              <th>UserName</th>
              <th>Purchased Date</th>
            </tr>
          </thead>
          <tbody>
            {purchasedProducts.productOrders && purchasedProducts.productOrders.length > 0 &&
              purchasedProducts.productOrders.map((item) => (
                <tr key={item._id}>
                  <td>{item.productId.title}</td>
                  <td>{item.totalAmount}</td>
                  <td><img style={{ height: '3rem' }} src={item.productId.image} alt="" /></td>
                  <td>{item.quantity}</td>
                  <td>{item.userId.username}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            }
            {purchasedProducts.orders && purchasedProducts.orders.length > 0 &&
              purchasedProducts.orders.flatMap(order =>
                order.prdcts.map(item => (
                  <tr key={item.productId._id}>
                    <td>{item.productId.title}</td>
                    <td>{item.productId.price}</td>
                    <td><img style={{ height: '3rem' }} src={item.productId.image} alt="" /></td>
                    <td>{item.quantity}</td>
                    <td>{order.userId.username}</td>
                    <td>{new Date(order.purchaseDate).toLocaleDateString()}</td>
                  </tr>
                ))
              )
            }
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default BuyProduct;
