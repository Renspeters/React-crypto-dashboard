// Dit is de hoofdbestand van de app. Hier worden alle pagina's en onderdelen aan elkaar gekoppeld.
import './App.css'; // Hier wordt de styling van de app geladen
import { Routes, Route } from 'react-router-dom'; // Hiermee kun je tussen pagina's wisselen
import Market from './Market'; // Dit is de pagina waar je de markt kunt zien
import Homepage from './Homepage'; // Dit is de startpagina van de app
import Container from 'react-bootstrap/Container'; // Bootstrap-container voor nette opmaak
import Nav from 'react-bootstrap/Nav'; // Bootstrap-navigatiebalk
import Navbar from 'react-bootstrap/Navbar'; // Bootstrap-navbar voor de bovenkant van de app
import ProductPage from './ProductPage'; // Dit is de pagina waar je meer over een coin kunt zien
import Favorites from './Favorites'; // Dit is de pagina waar je je favoriete coins kunt zien
import SearchBar from './SearchBar'; // Dit is de zoekpagina waar je naar coins kunt zoeken
import Footer from './Footer'; // Dit is de footer onderaan de pagina

// Dit is de hoofdfunctie van de app
export default function App() {
  return (
    <>
      {/* Dit is de navigatiebalk bovenaan */}
      <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
        <Container>
          {/* Dit is het logo van de website */}
          <img
            src="/cryptoLogo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="CryptoPulse logo"
          />
          {/* Dit is de naam van de website */}
          <Navbar.Brand href="/">CryptoPulse</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Dit zijn de links naar de verschillende pagina's */}
            <Nav className="me-auto">
              <Nav.Link className="custom-link" href="/">Home</Nav.Link> {/* Link naar de startpagina */}
              <Nav.Link className="custom-link" href="/market">Market</Nav.Link> {/* Link naar de marktpagina */}
              <Nav.Link className="custom-link" href="/favorites">Favorites</Nav.Link> {/* Link naar je favorieten */}
              <Nav.Link className="custom-link" href="/searchbar">Search</Nav.Link> {/* Link naar de zoekpagina */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Dit zijn de routes naar de verschillende pagina's */}
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Startpagina */}
        <Route path="/market" element={<Market />} /> {/* Marktpagina */}
        <Route path="/product/:id" element={<ProductPage />} /> {/* Productpagina voor een specifieke coin */}
        <Route path="/favorites" element={<Favorites />} /> {/* Favorietenpagina */}
        <Route path="/searchbar" element={<SearchBar />} /> {/* Zoekpagina */}
      </Routes>

      {/* Dit is de footer onderaan de pagina */}
      <Footer />
    </>
  );
}

