import './App.css';
import { Routes, Route } from 'react-router-dom';
import Market from './Market';

export default function App(){
  return (
    <>
    <header>
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

