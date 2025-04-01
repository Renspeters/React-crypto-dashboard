import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams(); // Haal de ID op uit de URL
  const [coin, setCoin] = useState(null);

  useEffect(() => {
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

  if (!coin) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-page">
      <h1>{coin.name}</h1>
      <img src={coin.image.large} alt={coin.name} />
      <p>Symbol: {coin.symbol.toUpperCase()}</p>
      <p>Current Price: €{coin.market_data.current_price.eur.toLocaleString()}</p>
      <p>Market Cap: €{coin.market_data.market_cap.eur.toLocaleString()}</p>
      <p>24h Change: {coin.market_data.price_change_percentage_24h.toFixed(2)}%</p>
      <p>Description: {coin.description.en || 'No description available.'}</p>
    </div>
  );
};

export default ProductPage;