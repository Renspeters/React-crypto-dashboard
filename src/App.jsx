import './App.css';
import { Routes, Route } from 'react-router-dom';
import Market from './Market';

export default function App(){
  return (
    <Routes>
      <Route path="/market" element={<Market />} />
    </Routes>
  );
}

