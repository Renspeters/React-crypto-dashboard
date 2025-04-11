// Importeer de benodigde bestanden en bibliotheken
import { useParams } from 'react-router-dom'; // Hiermee haal je de ID uit de URL
import { useState, useEffect } from 'react'; // React-hooks voor state en effecten
import axios from 'axios'; // Voor API-aanroepen
import { Container, Row, Col, Button } from 'react-bootstrap'; // Bootstrap-componenten voor layout en knoppen

// Dit is de hoofdfunctie van de ProductPage
const ProductPage = () => {
  const { id } = useParams(); // Haal de ID van de coin op uit de URL
  const [coin, setCoin] = useState(null); // Hier slaan we de coin-data op
  const [likes, setLikes] = useState(0); // Hier houden we het aantal likes bij
  const [isFavorite, setIsFavorite] = useState(false); // Hier houden we bij of de coin een favoriet is

  // Haal de coin-data en favorieten op als de pagina wordt geladen
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Haal favorieten uit localStorage
    setIsFavorite(favorites.includes(id)); // Controleer of deze coin een favoriet is

    const fetchCoinDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}` // Haal de coin-data op van de API
        );
        setCoin(response.data); // Sla de coin-data op
      } catch (error) {
        console.error('Error fetching coin details:', error); // Laat een foutmelding zien als er iets misgaat
      }
    };

    fetchCoinDetails(); // Roep de functie aan om de coin-data op te halen
  }, [id]);

  // Voeg een like toe
  const handleLike = () => {
    setLikes(likes + 1); // Verhoog het aantal likes
  };

  // Voeg de coin toe aan favorieten of verwijder deze
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(id)) {
      const updatedFavorites = favorites.filter((favId) => favId !== id); // Verwijder de coin uit favorieten
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(id); // Voeg de coin toe aan favorieten
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  // Laat een laadscherm zien als de data nog niet is opgehaald
  if (!coin) {
    return <p>Loading...</p>;
  }

  // Dit is wat er op de pagina wordt weergegeven
  return (
    <Container fluid className="product-page">
      <Row className="align-items-center mb-4">
        <Col md={4} className="text-center">
          <img src={coin.image.large} alt={coin.name} className="coin-image" /> {/* Afbeelding van de coin */}
        </Col>
        <Col>
          <h1 className="coin-name">{coin.name}</h1> {/* Naam van de coin */}
          <p className="coin-symbol">Symbol: {coin.symbol.toUpperCase()}</p> {/* Symbool van de coin */}
          <p className="coin-price">Current Price: €{coin.market_data.current_price.eur.toLocaleString()}</p> {/* Huidige prijs */}
          <p className="coin-market-cap">Market Cap: €{coin.market_data.market_cap.eur.toLocaleString()}</p> {/* Marktwaarde */}
          <p className="coin-change">24h Change: {coin.market_data.price_change_percentage_24h.toFixed(2)}%</p> {/* Verandering in 24 uur */}
          <Button
            variant={isFavorite ? 'danger' : 'success'}
            onClick={toggleFavorite}
            className="me-2"
          >
            {isFavorite ? 'Verwijderen uit favorieten' : 'Toevoegen aan favorieten'}
          </Button>
          <Button
            variant="primary"
            onClick={handleLike}>
            Likes: {likes}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 id="coin-description-title">Description</h3>
          <p className="coin-description">
            {coin.description.en ? coin.description.en : 'Geen beschrijving'}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;