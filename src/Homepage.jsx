// Importeer de benodigde bestanden en bibliotheken
import './App.css'; // Dit is de styling van de app
import Container from 'react-bootstrap/Container'; // Bootstrap-container voor nette opmaak
import { Row, Col } from 'react-bootstrap'; // Bootstrap-rijen en kolommen voor layout
import { useEffect, useRef, useState } from 'react'; // React-hooks voor state en effecten
import { Chart } from 'chart.js/auto'; // Chart.js voor het maken van grafieken

// Dit is de hoofdfunctie van de homepage
export default function Homepage() {
  const chartRef = useRef(null); // Dit houdt de grafiek bij
  const canvasRef = useRef(null); // Dit is voor het canvas-element waar de grafiek op komt
  const [chartData, setChartData] = useState(null); // Hier slaan we de data van de API op

  // Deze useEffect haalt data op van de API als de pagina wordt geladen
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Haal de data op van de CoinGecko API
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=7'
        );
        const data = await response.json();

        // Verwerk de data voor de grafiek
        const labels = data.prices.map((price) =>
          new Date(price[0]).toLocaleDateString() // Zet de datum om in een leesbaar formaat
        );
        const prices = data.prices.map((price) => price[1]); // Haal de prijzen op

        // Sla de verwerkte data op in de state
        setChartData({ labels, prices });
      } catch (error) {
        console.error('Error fetching data:', error); // Laat een foutmelding zien als er iets misgaat
      }
    };

    fetchData(); // Roep de functie aan om de data op te halen
  }, []); // Deze useEffect wordt alleen uitgevoerd als de pagina wordt geladen

  // Deze useEffect maakt de grafiek als er data beschikbaar is
  useEffect(() => {
    if (!canvasRef.current || !chartData) return; // Stop als er geen canvas of data is

    const ctx = canvasRef.current.getContext('2d'); // Haal de context van het canvas op

    // Als er al een grafiek is, verwijder deze
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Maak een nieuwe grafiek met de opgehaalde data
    chartRef.current = new Chart(ctx, {
      type: 'line', // Dit is een lijngrafiek
      data: {
        labels: chartData.labels, // De datums van de API
        datasets: [
          {
            label: 'Bitcoin Price (EUR)', // Titel van de grafiek
            data: chartData.prices, // De prijzen van de API
            borderColor: '#F7931A', // Oranje lijnkleur
            borderWidth: 2, // Dikte van de lijn
          },
        ],
      },
      options: {
        responsive: true, // Zorg dat de grafiek zich aanpast aan het scherm
        plugins: {
          legend: {
            position: 'top', // Zet de legenda bovenaan
          },
        },
      },
    });

    // Verwijder de grafiek als de component wordt verwijderd
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData]); // Deze useEffect wordt uitgevoerd als de data verandert

  // Dit is wat er op de pagina wordt weergegeven
  return (
    <Container fluid className="main-container">
      {/* Eerste sectie: Welkom en logo */}
      <Container className="homepage-section">
        <Row className="align-items-center homepage-header">
          <Col md={8} className="text-center text-md-start">
            <h2 className="homepage-title">Welcome to CryptoPulse</h2> {/* Welkomsttekst */}
          </Col>
          <Col md={4} className="text-center">
            <img
              id="logo"
              src="/cryptoLogoFull.webp" // Logo van de app
              alt="logo"
              height="150"
            />
          </Col>
        </Row>
      </Container>

      {/* Tweede sectie: Grafiek met marktdata */}
      <Container className="homepage-section">
        <Row className="homepage-chart">
          <Col>
            <h2 className="homepage-title">Market Data</h2> {/* Titel van de grafiek */}
            <canvas id="myChart" ref={canvasRef}></canvas> {/* Hier komt de grafiek */}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}