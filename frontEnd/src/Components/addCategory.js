import React from 'react'
import Sidebar from './SideBar'
import { Modal } from 'react-bootstrap'

const AddCategory = () => {
  return (
        <div style={{ display: "flex" }}>
      <Sidebar/>
      <div style={{ flex: "1",  backgroundColor: "#3c0747" }}>
        <h1 style={{color:'white'}} className="p-3 mt-5">Manage Category</h1>
        <div className="p-3 w-75">
          <CategoryForm />
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
                <>
                  <tr>
                    <td></td>
                    <td>
                      <button className="btn btn-primary ms-2" >Edit</button>
                    </td>
                    <td>
                      <button className="btn btn-danger ms-2" >Delete</button>
                    </td>
                  </tr> 
                </>
            </tbody>
          </table>
        </div>
      </div>
      <Modal>
        <CategoryForm />
      </Modal>
    </div>
  )
}

export default AddCategory