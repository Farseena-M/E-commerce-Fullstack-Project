import React, { useContext } from 'react'
import { userContext } from '../App'
import Sidebar from './SideBar'
import { Table } from 'react-bootstrap'

const BuyProduct = () => {
    const {buy}=useContext(userContext)
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
        buy.map((item)=>(
          <tbody>
            <tr>
              <td>{item.productName}</td>
              <td>{item.Price}</td>
              <td><img style={{height:'3rem'}} src={item.productImage} alt=''/></td>
              <td>{item.qty}</td>
              <td>{item.baby}</td>
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