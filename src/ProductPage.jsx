import { useParams } from 'react-router-dom';
import { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
const ProductPage = () => {
  const { id } = useParams(); // Haal de ID op uit de URL
  const [coin, setCoin] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Haal de favorieten op uit localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.includes(id));

    // Haal de coin-details op
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

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const toggleFavorite = () => {
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
  };

  if (!coin) {
    return <p>Loading...</p>;
  }

  return (
    <Container className='product-page mt-5'>
      <Row className='align-items-center mb-4'>
        <Col md={4} className='text-center'>
          <img src={coin.image.large} alt={coin.name} className='coin-image' />
        </Col>
        <Col md={8}>
          <h1 className='coin-name'>{coin.name}</h1>
          <p className='coin-symbol'>Symbol: {coin.symbol.toUpperCase()}</p>
          <p className='coin-price'>Current Price: €{coin.market_data.current_price.eur.toLocaleString()}</p>
          <p className='coin-market-cap'>Market Cap: €{coin.market_data.market_cap.eur.toLocaleString()}</p>
          <p className='coin-change'>24h Change: {coin.market_data.price_change_percentage_24h.toFixed(2)}%</p>
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
        <h3>Description</h3>
        <p className='coin-description'>
          {coin.description.en ? coin.description.en : "Geen beschrijving"}</p></Col>
      </Row>
    </Container>
    // <div className="product-page">
    //   <Container>
    //       <Col style={{ backgroundColor: 'white'}}>
    //         <h1>{coin.name}</h1>
    //         <img src={coin.image.large} alt={coin.name} />
    //         <p>Symbol: {coin.symbol.toUpperCase()}</p>
    //       </Col>
    //       <Col style={{ backgroundColor: 'red'}}>
    //         <p>Current Price: €{coin.market_data.current_price.eur.toLocaleString()}</p>
    //         <p>Market Cap: €{coin.market_data.market_cap.eur.toLocaleString()}</p>
    //         <p>24h Change: {coin.market_data.price_change_percentage_24h.toFixed(2)}%</p>
    //         <p>Description: {coin.description.en || 'No description available.'}</p>
    //         <button onClick={handleLike}>Likes: {likes} </button>
    //         <button onClick={toggleFavorite} className="favorite-button">
    //           {isFavorite ? 'Unfavorite' : 'Add to Favorites'}
    //         </button>
    //       </Col>

    //   </Container>
    //   <Container>
    //     <Row>
    //       <Col>
    //       <h2 className="homepage-title">Current Coin Data</h2>
    //       <canvas id="myChart" ref={canvasRef}></canvas>
    //       </Col>
    //     </Row>
    //   </Container>

    // </div>
  );
};

export default ProductPage;