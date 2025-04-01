import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PriceCards = () => {
  const [coins, setCoins] = useState([]);
  const navigate = useNavigate(); // Gebruik de useNavigate-hook

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'eur',
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

  const goToProductPage = (productId) => {
    navigate(`/product/${productId}`); // Navigeer naar de ProductPage met de ID
  };

  return (
    <Container fluid className="market-container">
      <Row>
        <h2 className="market-title">Current market</h2>
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
                  €{coin.current_price.toLocaleString()}
                </p>
                <p className="price-change">
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
              {/* Voeg een knop toe om naar de ProductPage te navigeren */}
              <button
                onClick={() => goToProductPage(coin.id)}
                className="product-button"
              >
                Bekijk product
              </button>
            </div>
          ))}
        </div>
      </Row>
    </Container>
  );
};

export default PriceCards;