import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './SideBar'
import { Table } from 'react-bootstrap'
import { AXIOS } from '../App'
import { toast } from 'react-toastify'

const BuyProduct = () => {
    const [purchasedProducts,setPurchasedProducts] = useState([])
    useEffect(()=>{
     const fetchpurchasedProduct = async() =>{
   try{
  const rspns = await AXIOS.get(`http://localhost:9000/api/admin/purchasedproducts`)
      console.log(rspns);
      setPurchasedProducts(rspns.data)
   }catch(err){
   toast.error(err)
  }    
     }
     fetchpurchasedProduct()
    },[])
  return (
    <div style={{display:'flex'}}>
    <Sidebar />
    <div style={{flex:'1',textAlign:'center'}}>
     <Table striped bordered hover size="sm" style={{margin:'0 auto'}}>
    <thead>
      <tr>
        <th style={{width:'850px'}}>Name</th>
        <th>Price</th>
        <th>Image</th>
        <th>Qty</th>
        <th>Type</th>
      </tr>
    </thead>
    {
        purchasedProducts.map((item)=>(
          <tbody>
            <tr>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td><img style={{height:'3rem'}} src={item.image} alt=''/></td>
              <td>{item.quantity}</td>
              <td>{item.category}</td>
            </tr>
          </tbody>
        ))
}
      </Table>
</div>
</div>
  )
}

export default BuyProduct