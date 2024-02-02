import React, { useContext, useEffect } from 'react'
import { Button,  Table } from 'react-bootstrap'
import { AXIOS,userContext } from '../App'
import Sidebar from '../Components/SideBar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminPrdcts = () => {
  const Nvgt=useNavigate()
    const {product,setProduct}=useContext(userContext)
     const admnFetchProducts = async () =>{
       try{
         const rspns = await AXIOS.get('http://localhost:9000/api/admin/products')
         console.log(rspns.data.data.products);
         setProduct(rspns.data.data.products)
        }catch(err){
          toast.error(err)
        }
      }
      useEffect(()=>{
      admnFetchProducts()
     },[])

     const removeItem = async(id) =>{
      try{
       const productId = id
       const rspns = await AXIOS.delete(`http://localhost:9000/api/admin/products`,{data:{productId:productId}})
       console.log(rspns);
       admnFetchProducts()
        }catch(err){
        toast.error(err)
        }
    }


  return (
    <div style={{display:'flex'}}>
    <Sidebar />
    <div style={{flex:'1',textAlign:'center'}}>
     <Table striped bordered hover size="sm" style={{margin:'0 auto'}}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Image</th>
        <th>Qty</th>
        <th>Type</th>
        <th>Action</th>
      </tr>
    </thead>
    {
        product.map((item)=>(
          <tbody>
            <tr>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td><img style={{height:'3rem'}} src={item.image} alt=''/></td>
              <td>{item.quantity}</td>
              <td>{item.category}</td>
              <td ><Button style={{backgroundColor:'black',border:'none'}} className='m-2' onClick={()=>Nvgt(`/edit/${item._id}`)}>Edit</Button>
              <Button  style={{backgroundColor:'black',border:'none'}} onClick={()=>removeItem(item._id)}>Delete</Button></td>
            </tr>
          </tbody>
        ))
}
      </Table>
</div>
</div>
  )
}

export default AdminPrdcts