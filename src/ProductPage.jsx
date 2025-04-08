import { useParams } from 'react-router-dom';
import { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Chart } from 'chart.js/auto';
import {Row, Col} from 'react-bootstrap';

const ProductPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const chartRef = useRef(null); // Ref voor de Chart.js-instantie
  const canvasRef = useRef(null); // Ref voor het canvas-element
  const [chartData, setChartData] = useState(null); // State om API-data op te slaan


  useEffect(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setIsFavorite(favorites.includes(id));
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error);
    }

    const fetchCoinDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setCoin(response.data);
      } catch (error) {
        console.error('Error fetching coin details:', error);
      }
    };

    fetchCoinDetails();
  }, [id]);

    useEffect(() => {
      if (!canvasRef.current || !chartData) return;
  
      const ctx = canvasRef.current.getContext('2d');
  
      // Controleer of er al een grafiek bestaat en vernietig deze
      if (chartRef.current) {
        chartRef.current.destroy();
      }
  
      // Maak een nieuwe Chart.js-instantie met de opgehaalde data
      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels, // Labels van de API
          datasets: [
            {
              label: 'Bitcoin Price (EUR)',
              data: chartData.prices, // Prijzen van de API
              borderColor: '#F7931A',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      });
  
      // Clean-up functie om de bestaande grafiek te vernietigen
      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
      };
    }, [chartData]);

  const toggleFavorite = () => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      if (favorites.includes(id)) {
        const updatedFavorites = favorites.filter((favId) => favId !== id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(false);
      } else {
        favorites.push(id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error updating favorites in localStorage:', error);
    }
  };

  if (!coin) {
    return <p>Loading...</p>;
  }
  const handleLike = () => {
    setLikes(likes + 1);
  }
  return (
    <div className="product-page">
      <Container>
        <h1>{coin.name}</h1>
        <img src={coin.image.large} alt={coin.name} />
        <p>Symbol: {coin.symbol.toUpperCase()}</p>
        <p>Current Price: €{coin.market_data.current_price.eur.toLocaleString()}</p>
        <p>Market Cap: €{coin.market_data.market_cap.eur.toLocaleString()}</p>
        <p>24h Change: {coin.market_data.price_change_percentage_24h.toFixed(2)}%</p>
        <p>Description: {coin.description.en || 'No description available.'}</p>
        <button onClick={handleLike}>Likes: {likes} </button>
        <button onClick={toggleFavorite} className="favorite-button">
          {isFavorite ? 'Unfavorite' : 'Add to Favorites'}
        </button>
      </Container>
      <Container>
        <Row>
          <Col>
          <h2 className="homepage-title">Current Coin Data</h2>
          <canvas id="myChart" ref={canvasRef}></canvas>
          </Col>
        </Row>
      </Container>

    </div>
  );
};

export default ProductPage;