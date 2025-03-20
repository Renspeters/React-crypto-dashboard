import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
 
const PriceCards = () => {
  const [coins, setCoins] = useState([]);
 
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'z',
              order: 'market_cap_desc',
              per_page: 50,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    };
 
    fetchCoins();
  }, []);
 
  return (
    <div>
      {coins.map((coin) => (
        <div key={coin.id} className="price-card">
          <img src={coin.image} alt={coin.name} className="coin-image" />
          <h3>{coin.name}</h3>
          <p className="symbol">{coin.symbol.toUpperCase()}</p>
          <div className={coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'}>
            <p className="price">${coin.current_price.toLocaleString()}</p>
            <p className="price-change">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
 
export default PriceCards;