import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import StockOverview from '../components/StockOverview';
import ChartSection from '../components/ChartSection';
import PortfolioOverview from '../components/PortfolioOverview';
import KeyStats from '../components/KeyStats';
import PredictionSection from '../components/PredictionSection';
import NewsSection from '../components/NewsSection';
import '../styles/dashboard.css';

export default function Dashboard() {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('tradebro_auth');
    navigate('/login');
  };

  const handleProfileClick = () => {
    handleLogout();
  };

  return (
    <div className="dashboard-layout">
      <Sidebar selectedStock={selectedStock} />
      <main className="main-content">
        <input type="checkbox" id="menu-toggle" checked={menuOpen} onChange={(e) => setMenuOpen(e.target.checked)} />
        <div className="container">
          <header className="header">
            <div className="header-left">
              <label htmlFor="menu-toggle" className="menu-button">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </label>
            </div>
            <div className="search-bar">
              <StockSearch setSelectedStock={setSelectedStock} setStockData={setStockData} setLoading={setLoading} />
            </div>
            <div className="header-right">
              <button className="profile-icon" onClick={handleProfileClick} title="Logout">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
            </div>
          </header>

          <div className="dashboard-grid">
            <StockOverview stockData={stockData} selectedStock={selectedStock} />
            <ChartSection selectedStock={selectedStock} />
            <PortfolioOverview />
            <KeyStats stockData={stockData} />
            <PredictionSection selectedStock={selectedStock} stockData={stockData} />
            <NewsSection selectedStock={selectedStock} />
          </div>
        </div>
      </main>
    </div>
  );
}

function StockSearch({ setSelectedStock, setStockData, setLoading }) {
  const [searchValue, setSearchValue] = useState('');
  const API_KEY = 'DVLFPS95X0JOJZML';

  const handleSearch = async (e) => {
    if (e.key !== 'Enter') return;

    const symbol = searchValue.trim().toUpperCase();
    if (!symbol) {
      alert('Please enter a stock symbol');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
      );
      const data = await response.json();
      const quote = data['Global Quote'];

      if (!quote || Object.keys(quote).length === 0) {
        alert('No data found for symbol: ' + symbol);
        setLoading(false);
        return;
      }

      setSelectedStock(symbol);
      setStockData(quote);
      setSearchValue('');
    } catch (error) {
      console.error('Error fetching stock data:', error);
      alert('Error fetching stock data. Please try again.');
    }
    setLoading(false);
  };

  return (
    <input
      type="text"
      placeholder="Search Stock Symbol…"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onKeyPress={handleSearch}
    />
  );
}