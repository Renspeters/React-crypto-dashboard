import './App.css';
import { Routes, Route } from 'react-router-dom';
import Market from './Market';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';

export default function App(){
  return (
    <>
    <header className='header'>
      <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/market">Market</a></li>
        </ul>
      </nav>
    </header>
    <Routes>
      <Route path="/market" element={<Market />} />
    </Routes>

    </>
  );
}

