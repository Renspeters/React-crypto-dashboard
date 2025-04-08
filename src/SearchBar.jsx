import React, { useState, useEffect } from 'react'; // Import React, useState en useEffect
import './App.css'; // Importeer de CSS voor styling
import axios from 'axios'; // Gebruik axios voor API-aanroepen

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State om de zoekterm bij te houden
  const [results, setResults] = useState([]); // State om de zoekresultaten op te slaan
  const [allCoins, setAllCoins] = useState([]); // State om alle coins op te slaan

  // Haal alle cryptocurrencies op bij het laden van de component
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'eur',
              order: 'market_cap_desc',
              per_page: 100, // Haal de top 100 coins op
              page: 1,
              sparkline: false,
            },
          }
        );
        setAllCoins(response.data); // Sla alle coins op in de state
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    };

    fetchCoins();
  }, []);

  // Filter de resultaten op basis van de zoekterm
  useEffect(() => {
    if (searchTerm === '') {
      setResults([]); // Leeg de resultaten als er geen zoekterm is
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

  return (
    <div className="market-container search-bar-container">
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
            <div key={coin.id} className="search-result-item">
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