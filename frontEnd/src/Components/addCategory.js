import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from './SideBar'
import CategoryForm from "./categoryForm";
import { Modal } from 'antd'
import { AXIOS } from "../App";


const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("")
  const [visible,setVisible] = useState(false)
  const [selected,setSelected] = useState(null)
  const [updatedName,setUpdatedName] = useState("")

  //handle form

  const handleSubmit = async(e)=>{
e.preventDefault()
try {
  const data = await AXIOS.post('http://localhost:9000/api/admin/createcategory',{name})
if(data.status === 201 ){
  allCategories()
  toast.success(`${name}is created`)
  console.log(data);
  
  
}

} catch (error) {
  console.log(error);
  toast.error('somthing went wrong')
}
  }

  //get all categories
  
    const allCategories = async () => {
      try {
        const response = await AXIOS.get(
          "http://localhost:9000/api/admin/categories"
        );
        console.log(response);
        if (response.status === 200) {
          setCategories(response.data.data.category);
        }
      } catch (error) {
        console.log(error);
        toast.error("somthing went wrong in getting category");
      }
    };
    useEffect(() => {
    allCategories();
  }, []);
//update category
const handleUpdate = async(e)=>{
e.preventDefault()
try {
  const data = await AXIOS.put(`http://localhost:9000/api/admin/updatecategory/65a8f2feca890ce12ac2aa30/${selected._id}`,
  {name: updatedName});
  if(data.status === 200){
    toast.success(`${updatedName} is updated`);
    setSelected(null);
    setUpdatedName("");
    setVisible(false);
    allCategories()
  }
  else{
    toast.error(data.message);
  }
} catch (error) {
  console.log(error);
  toast.error('somthing went wrong')
}
}

//delete categories
const handleDelete = async(id)=>{
  try {
    const data = await AXIOS.delete(`http://localhost:9000/api/admin/deletecategory/65a8e9b8feac43b963b36781/${id}`,
    {name: updatedName});
    if(data.status === 200){
      toast.success(`category is deleted`);
      
      allCategories()
    }
    else{
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error('somthing went wrong')
  }
  }
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: "1",  backgroundColor: "grey" ,height:'100%',width:'100%'}}>
        <h1 style={{color:'white'}} className="p-3 mt-5">Manage Category</h1>
        <div className="p-3 w-75">
          <CategoryForm 
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
        </div>
        <div className="p-3 w-75" >
          <table className="table" >
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Update</th>
                <th scope="col">Remove</th>
                
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <>
                  <tr>
                    <td key={c.id}>{c.name}</td>
                    <td>
                      <button className="btn btn-primary ms-2" onClick={()=>{setVisible(true); 
                      setUpdatedName(c.name);
                      setSelected(c);
                      }}>Edit</button>
                    </td>
                    <td>
                      <button className="btn btn-danger ms-2" onClick={()=>{handleDelete(c._id)}}>Delete</button>
                    </td>
                  </tr> 
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
        <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
      </Modal>
    </div>
  );
};

export default AddCategory;