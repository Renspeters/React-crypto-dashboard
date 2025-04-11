import React, { useState, useEffect } from 'react'; // Import React, useState en useEffect
import './App.css'; // Importeer de CSS voor styling
import axios from 'axios'; // Gebruik axios voor API-aanroepen
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State om de zoekterm bij te houden
  const [results, setResults] = useState([]); // State om de zoekresultaten op te slaan
  const [allCoins, setAllCoins] = useState([]); // State om alle coins op te slaan
  const navigate = useNavigate(); // Gebruik de navigate functie van react-router-dom

  // Haalt alle cryptocurrencies op bij het laden van de component
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'eur',
              order: 'market_cap_desc',
              per_page: 100, // Haalt de top 100 coins op
              page: 1,
              sparkline: false,
            },
          }
        );
        setAllCoins(response.data); // Slaat alle coins op in de state
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    };

    fetchCoins();
  }, []);

  // Filtert de resultaten op basis van de zoekterm
  useEffect(() => {
    if (searchTerm === '') {
      setResults([]); // Leegt de resultaten als er geen zoekterm is
    } else {
      const filteredResults = allCoins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filteredResults); // Update de resultaten
    }
  }, [searchTerm, allCoins]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value); // Update de zoekterm wanneer de gebruiker typt
  };

  const handleResultClick = (coinId) => {
    navigate(`/product/${coinId}`); // Navigeert naar de productpagina van de geselecteerde coin
  }

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for a cryptocurrency..."
        className="search-input"
      />
      <div className="search-results">
        {results.length > 0 ? (
          results.map((coin) => (
            <div 
              key={coin.id} 
              className="search-result-item"
              onClick={() => handleResultClick(coin.id)}
              style={{ cursor: 'pointer' }}
            >
              <img src={coin.image} alt={coin.name} className="coin-image" />
              <span>{coin.name}</span>
              <span>€{coin.current_price.toLocaleString()}</span>
            </div>
          ))
        ) : (
          searchTerm && <p className="no-results">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;