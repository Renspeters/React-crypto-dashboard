import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';

const PriceCards = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
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
    <Container fluid>
      <Row>
      <h2 className="market-title">CryptoPulse current market</h2>
      <div className="price-cards-container">
        {coins.map((coin) => (
          <div key={coin.id} className="price-card">
            <img src={coin.image} alt={coin.name} className="coin-image" />
            <h3 className="coin-name">{coin.name}</h3>
            <p className="coin-symbol">{coin.symbol.toUpperCase()}</p>
            <div
              className={
                coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'
              }
            >
              <p className="coin-price">
                ${coin.current_price.toLocaleString()}
              </p>
              <p className="price-change">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
      </Row>
    </Container>
  );
};

export default PriceCards;