import React from 'react';
import Sidebar from '../Components/SideBar';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminHome = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
      <Sidebar />
      <div style={{ flex: '1' }}>
        <Container fluid className="d-flex align-items-center justify-content-center min-vh-100">
          <Row className="justify-content-center">
            <Col md={8} lg={6} className="text-center">
                <Card.Body>
                  <Card.Title
                    className="display-2"
                    style={{ fontFamily: 'Lora, serif', fontWeight: '700' }}
                  >
                    Welcome to the Admin Panel
                  </Card.Title>
                </Card.Body>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default AdminHome;
