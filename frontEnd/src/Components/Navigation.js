import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsFillCartFill } from 'react-icons/bs';
import { CgLogOut } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import logo from '../Components/Assets/Babyshh.png';
import { Dropdown, NavLink } from 'react-bootstrap';
import { TbLogout } from 'react-icons/tb';
import { FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useAuthContext } from '../Context/AuthContext';

const Navigation = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    setAuthUser(null);
    toast.success('Logout Success');
    navigate('/login');
  };

  return (
    <Navbar
      style={{
        backgroundColor: 'white',
        height: '70px',
        width: '100%',
        padding: '0 20px',
        fontFamily: 'Arial, sans-serif',
      }}
      expand="lg"
      sticky='top'
    >
      <Container fluid>
        <Navbar.Brand
          style={{
            cursor: 'pointer',
            padding: '0',
          }}
          onClick={() => navigate('/')}
        >
          <img
            src={logo}
            alt='logo'
            style={{
              height: '40px',
              width: 'auto',
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '16px',
                padding: '0 20px',
              }}
              onClick={() => navigate('/all')}
            >
              <h3 style={{ margin: '0', fontSize: '24px' }}>Collections</h3>
            </Nav.Link>
            <Dropdown>
              <Dropdown.Toggle
                variant=""
                id="dropdown-basic"
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '16px',
                  fontWeight: 'normal',
                  padding: '0 10px',
                }}
              >
                Shop Now
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => navigate('/cloths')}
                  style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}
                >
                  Baby Cloths
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate('/Prdcts')}
                  style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}
                >
                  Baby Products
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse style={{ justifyContent: 'end' }}>
          <Nav style={{ gap: '0.6rem', alignItems: 'center' }}>
            {authUser && (
              <p
                style={{
                  fontSize: '16px',
                  margin: '0',
                  color: 'gray',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  backgroundColor: '#f0f8ff',
                  padding: '5px',
                  borderRadius: '4px',
                }}
              >
                Hi, {authUser.username}
              </p>
            )}
            <Nav.Link
              onClick={() => navigate("/wishlist")}
              style={{
                fontSize: "20px",
              }}
              title="Wishlist"
            >
              <FaHeart style={{ color: 'red' }} />
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate('/cart')}
              style={{
                fontSize: '20px',
              }}
              title='Cart'
            >
              <BsFillCartFill />
            </Nav.Link>
            {authUser ? (
              <button
                onClick={logout}
                className="text-2xl text-gray-800 hover:text-gray-600 transition-colors duration-300"
                title="Logout"
              >
                <TbLogout />
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="text-2xl text-gray-800 hover:text-gray-600 transition-colors duration-300"
                title="Login"
              >
                <CgLogOut />
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
