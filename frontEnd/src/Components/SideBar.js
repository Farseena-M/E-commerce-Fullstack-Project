import React from 'react';
import logo from '../Components/Assets/Babyshh.png'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, useNavigate} from 'react-router-dom';
import { Navbar } from 'react-bootstrap';


const Sidebar = () => {
  const Nvgtn=useNavigate()
  return (
    <div style={{ display: 'flex', height: '371vh', overflow: 'scroll initial',position:'fixed'}}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <Navbar.Brand  style={{cursor:'pointer'}} onClick={()=>Nvgtn('/')}><img style={{height:'50px'}} src={logo} alt='logo'/></Navbar.Brand>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to='/adminhome' activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/adminusers" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="users">Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/adminprdcts" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Products</CDBSidebarMenuItem>
            </NavLink>
            {/* <NavLink exact to="/addcategory" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="bookmark">Add Category</CDBSidebarMenuItem>
            </NavLink> */}
            <NavLink exact to="/add" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="plus">Add Products</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/buy" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Buy Products</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/"  activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
           
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;