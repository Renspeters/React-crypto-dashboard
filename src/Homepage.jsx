import './App.css';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';

export default function Homepage(){
    return (
        <Container fluid className='homepage-container'>
        <Row>
            <h2 className="homepage-title">Welcome to CryptoPulse</h2>
            <p className="homepage-text">
            CryptoPulse is a simple web app that displays the current market data for the top 50 cryptocurrencies.
            </p>
        </Row>
        <Row>
            <img id='logo'
            src="/cryptoLogoFull.webp" alt="logo" 
            height="275"
            
            />
        </Row>
        </Container>
    );
    }