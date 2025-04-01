import './App.css';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';

export default function Homepage() {
  const chartRef = useRef(null); 
  const canvasRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1'
        );
        const data = await response.json();

        const labels = data.map((coin) => coin.name); 
        const prices = data.map((coin) => coin.current_price); 

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
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(ctx, {
      type: 'doughnut', 
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Current Price (EUR)',
            data: chartData.prices, 
            backgroundColor: chartData.labels.map(
              (_, index) =>
                `hsl(${(index * 360) / chartData.labels.length}, 70%, 50%)`
            ), 
            borderColor: '#ffffff',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || '';
                const value = context.raw || 0;
                return `${label}: €${value.toLocaleString()}`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData]);

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