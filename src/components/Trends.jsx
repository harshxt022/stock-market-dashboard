import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

export default function Trends() {
  const [activeTab, setActiveTab] = useState(0);
  const [prices, setPrices] = useState({});
  const [chartDataMap, setChartDataMap] = useState({});
  const navigate = useNavigate();

  const trendStocks = [
    { name: 'Apple', symbol: 'AAPL', basePrice: 232.14, volatility: 0.5 },
    { name: 'Microsoft', symbol: 'MSFT', basePrice: 431.75, volatility: 0.4 },
    { name: 'Tesla', symbol: 'TSLA', basePrice: 245.50, volatility: 1.2 },
    { name: 'Reliance', symbol: 'RELIANCE', basePrice: 2755.00, volatility: 0.8 },
    { name: 'Infosys', symbol: 'INFY', basePrice: 1718.40, volatility: 0.6 }
  ];

  useEffect(() => {
    const generateChartData = () => {
      const newChartData = {};
      trendStocks.forEach(stock => {
        const data = [];
        let price = stock.basePrice;
        for (let i = 0; i < 20; i++) {
          const change = (Math.random() - 0.5) * stock.volatility;
          price = Math.max(stock.basePrice * 0.95, price + change);
          data.push({
            time: i,
            price: parseFloat(price.toFixed(2))
          });
        }
        newChartData[stock.symbol] = data;
      });
      setChartDataMap(newChartData);
    };

    const updatePrices = () => {
      const newPrices = {};
      trendStocks.forEach(stock => {
        const change = (Math.random() - 0.5) * stock.volatility;
        const newPrice = stock.basePrice + change;
        const percentChange = ((newPrice - stock.basePrice) / stock.basePrice) * 100;
        newPrices[stock.symbol] = { price: newPrice.toFixed(2), change: percentChange.toFixed(2) };
      });
      setPrices(newPrices);
    };

    generateChartData();
    updatePrices();
    const interval = setInterval(updatePrices, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStockClick = (symbol) => {
    localStorage.setItem('tradebro_auth', 'true');
    navigate('/dashboard');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('selectStock', { detail: symbol }));
    }, 100);
  };

  return (
    <section className="section trend" aria-label="stock trend" data-section>
      <div className="container">
        <div className="trend-tab">
          <ul className="tab-nav">
            {['Top Gainers', 'Top Losers', 'Tech', 'Banking', 'Pharma', 'Energy', 'Auto', 'Midcap', 'Smallcap'].map((tab, idx) => (
              <li key={idx}>
                <button className={`tab-btn ${idx === activeTab ? 'active' : ''}`} onClick={() => setActiveTab(idx)}>
                  {tab}
                </button>
              </li>
            ))}
          </ul>

          <ul className="tab-content trends-with-charts">
            {trendStocks.map((stock, idx) => (
              <li key={idx}>
                <div 
                  className={`trend-card-with-chart ${idx === 1 ? 'active' : ''}`}
                  onClick={() => handleStockClick(stock.symbol)}
                  style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                >
                  <div className="trend-card-left">
                    <div className="card-title-wrapper">
                      <a href="#" onClick={(e) => { e.preventDefault(); handleStockClick(stock.symbol); }} className="card-title">
                        {stock.name} <span className="span">{stock.symbol}</span>
                      </a>
                    </div>
                    <data className="card-value" value={stock.basePrice}>
                      {stock.symbol.includes('INR') || stock.basePrice > 1000 ? `INR ${stock.basePrice.toLocaleString()}` : `$${stock.basePrice}`}
                    </data>
                    <div className="card-analytics">
                      <data className="current-price" value={prices[stock.symbol]?.price || stock.basePrice}>
                        {prices[stock.symbol]?.price || stock.basePrice.toFixed(2)}
                      </data>
                      <div className={`badge ${parseFloat(prices[stock.symbol]?.change || 0) >= 0 ? 'green' : 'red'}`}>
                        {prices[stock.symbol]?.change ? `${prices[stock.symbol].change >= 0 ? '+' : ''}${prices[stock.symbol].change}%` : '0%'}
                      </div>
                    </div>
                  </div>
                  <div className="trend-card-chart">
                    {chartDataMap[stock.symbol] && (
                      <ResponsiveContainer width="100%" height={60}>
                        <LineChart data={chartDataMap[stock.symbol]}>
                          <Line type="monotone" dataKey="price" stroke={parseFloat(prices[stock.symbol]?.change || 0) >= 0 ? '#16a34a' : '#dc2626'} dot={false} isAnimationActive={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
