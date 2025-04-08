import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const [favoriteCoins, setFavoriteCoins] = useState([]); // State voor de favorieten
  const navigate = useNavigate(); // Gebruik de useNavigate-hook

  useEffect(() => {
    // Haal de favorieten op uit localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Als er favorieten zijn, haal de gegevens van deze coins op
    if (favorites.length > 0) {
      const fetchFavoriteCoins = async () => {
        try {
          const response = await axios.get(
            'https://api.coingecko.com/api/v3/coins/markets',
            {
              params: {
                vs_currency: 'eur',
                ids: favorites.join(','), // Voeg de favorieten toe als een komma-gescheiden string
                order: 'market_cap_desc',
                sparkline: false,
              },
            }
          );
          setFavoriteCoins(response.data); // Sla de gegevens van de favorieten op
        } catch (error) {
          console.error('Error fetching favorite coins:', error);
        }
      };

      fetchFavoriteCoins();
    }
  }, []);

  const goToProductPage = (productId) => {
    navigate(`/product/${productId}`); // Navigeer naar de ProductPage met de ID
  };

  return (
    <Container fluid className="market-container">
      <Row>
        <h2 color='#f7931a'>Favorites</h2>
      </Row>
      <Row className='favo-container'>
        {favoriteCoins.length > 0 ? (
          favoriteCoins.map((coin) => (
            <Col key={coin.id} xs={12} md={6} lg={4} className="mb-4">
              <div className="price-card">
                <img src={coin.image} alt={coin.name} className="coin-image" />
                <h3 className="coin-name">{coin.name}</h3>
                <p className="coin-symbol">{coin.symbol.toUpperCase()}</p>
                <p className="coin-price">
                  €{coin.current_price.toLocaleString()}
                </p>
                <button
                  onClick={() => goToProductPage(coin.id)}
                  className="product-button"
                >
                  Bekijk product
                </button>
              </div>
            </Col>
          ))
        ) : (
          <p>Je hebt nog geen favorieten toegevoegd.</p>
        )}
      </Row>
    </Container>
  );
};

export default Favorites;