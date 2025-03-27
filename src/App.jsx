import './App.css';
import { Routes, Route } from 'react-router-dom';
import Market from './Market';
import Homepage from './Homepage';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Row } from 'react-bootstrap';

export default function App(){
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary" fixed='top'>
      <Container>
      <img
              src="/cryptoLogo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="CryptoPulse logo"
            />
        <Navbar.Brand href="#home">CryptoPulse
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/market">Market</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/market" element={<Market />} />
    </Routes>

    </>
  );
}

