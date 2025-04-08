import './App.css';
import { Routes, Route } from 'react-router-dom';
import Market from './Market';
import Homepage from './Homepage';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Row } from 'react-bootstrap';
import ProductPage from './ProductPage';
import Favorites from './Favorites';
import SearchBar from './SearchBar';

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
        <Navbar.Brand href="/">CryptoPulse
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="custom-link" href="/">Home</Nav.Link>
            <Nav.Link className='custom-link' href="/market">Market</Nav.Link>
            <Nav.Link className='custom-link' href="/favorites">Favorites</Nav.Link>
            <Nav.Link className='custom-link' href="/searchbar">Search</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/market" element={<Market />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/searchbar" element={<SearchBar />} />
    </Routes>

    </>
  );
}

