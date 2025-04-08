import './App.css';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';

export default function Homepage() {
  const chartRef = useRef(null); // Ref voor de Chart.js-instantie
  const canvasRef = useRef(null); // Ref voor het canvas-element
  const [chartData, setChartData] = useState(null); // State om API-data op te slaan
  
  

  useEffect(() => {
    // Functie om data van de API op te halen
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=7'
        );
        const data = await response.json();

        // Verwerk de data voor de grafiek
        const labels = data.prices.map((price) =>
          new Date(price[0]).toLocaleDateString()
        );
        const prices = data.prices.map((price) => price[1]);

        // Sla de verwerkte data op in de state
        setChartData({ labels, prices });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
  }, [chartData]); // Voer deze useEffect alleen uit als chartData verandert

  return (
    <Container fluid className="main-container">
      {/* Eerste sectie */}
      <Container className="homepage-section">
        <Row className="align-items-center homepage-header">
          <Col md={8} className="text-center text-md-start">
            <h2 className="homepage-title">Welcome to CryptoPulse</h2>
          </Col>
          <Col md={4} className="text-center">
            <img
              id="logo"
              src="/cryptoLogoFull.webp"
              alt="logo"
              height="150"
            />
          </Col>
        </Row>
      </Container>

      {/* Tweede sectie */}
      <Container className="homepage-section">
        <Row className="homepage-chart">
          <Col>
            <h2 className="homepage-title">Market Data</h2>
            <canvas id="myChart" ref={canvasRef}></canvas>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}