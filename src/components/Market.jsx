import React, { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function Market() {
  const [activeTab, setActiveTab] = useState('View All');
  const [marketData, setMarketData] = useState([]);
  const [chartDataMap, setChartDataMap] = useState({});

  const stocksByCategory = {
    'View All': [
      { rank: 1, name: 'Apple', symbol: 'AAPL', price: 232.14, change: -0.19, market: '$3.01T', sector: 'Tech' },
      { rank: 2, name: 'Microsoft', symbol: 'MSFT', price: 431.75, change: 0.62, market: '$3.40T', sector: 'Tech' },
      { rank: 3, name: 'Tesla', symbol: 'TSLA', price: 245.50, change: 1.12, market: '$780.2B', sector: 'Auto' },
      { rank: 4, name: 'Reliance', symbol: 'RELIANCE', price: 2755.00, change: -0.85, market: '₹18.7T', sector: 'Energy' },
      { rank: 5, name: 'Infosys', symbol: 'INFY', price: 1718.40, change: 0.67, market: '₹7.1T', sector: 'Tech' },
      { rank: 6, name: 'HDFC Bank', symbol: 'HDFCBANK', price: 1588.20, change: -0.44, market: '₹11.9T', sector: 'Banking' },
      { rank: 7, name: 'ICICI Bank', symbol: 'ICICIBANK', price: 1185.60, change: 0.38, market: '₹8.3T', sector: 'Banking' },
      { rank: 8, name: 'TCS', symbol: 'TCS', price: 3835.25, change: 0.54, market: '₹14.1T', sector: 'Tech' },
    ],
    'Tech': [
      { rank: 1, name: 'Apple', symbol: 'AAPL', price: 232.14, change: -0.19, market: '$3.01T', sector: 'Tech' },
      { rank: 2, name: 'Microsoft', symbol: 'MSFT', price: 431.75, change: 0.62, market: '$3.40T', sector: 'Tech' },
      { rank: 3, name: 'Infosys', symbol: 'INFY', price: 1718.40, change: 0.67, market: '₹7.1T', sector: 'Tech' },
      { rank: 4, name: 'TCS', symbol: 'TCS', price: 3835.25, change: 0.54, market: '₹14.1T', sector: 'Tech' },
    ],
    'Banking': [
      { rank: 1, name: 'HDFC Bank', symbol: 'HDFCBANK', price: 1588.20, change: -0.44, market: '₹11.9T', sector: 'Banking' },
      { rank: 2, name: 'ICICI Bank', symbol: 'ICICIBANK', price: 1185.60, change: 0.38, market: '₹8.3T', sector: 'Banking' },
      { rank: 3, name: 'Axis Bank', symbol: 'AXISBANK', price: 1042.30, change: 0.25, market: '₹3.2T', sector: 'Banking' },
      { rank: 4, name: 'Kotak Bank', symbol: 'KOTAKBANK', price: 1856.75, change: -0.12, market: '₹4.8T', sector: 'Banking' },
    ],
    'Energy': [
      { rank: 1, name: 'Reliance', symbol: 'RELIANCE', price: 2755.00, change: -0.85, market: '₹18.7T', sector: 'Energy' },
      { rank: 2, name: 'NTPC', symbol: 'NTPC', price: 298.45, change: 0.45, market: '₹2.3T', sector: 'Energy' },
      { rank: 3, name: 'Power Grid', symbol: 'POWERGRID', price: 312.50, change: 0.33, market: '₹5.1T', sector: 'Energy' },
      { rank: 4, name: 'Oil India', symbol: 'OILINDIA', price: 145.20, change: -0.27, market: '₹0.8T', sector: 'Energy' },
    ],
    'Pharma': [
      { rank: 1, name: 'Cipla', symbol: 'CIPLA', price: 1485.60, change: 0.78, market: '₹2.1T', sector: 'Pharma' },
      { rank: 2, name: 'Dr Reddy\'s', symbol: 'DRREDDY', price: 4285.75, change: 0.45, market: '₹5.2T', sector: 'Pharma' },
      { rank: 3, name: 'Sun Pharma', symbol: 'SUNPHARMA', price: 685.40, change: -0.33, market: '₹2.8T', sector: 'Pharma' },
      { rank: 4, name: 'Lupin', symbol: 'LUPIN', price: 728.90, change: 0.22, market: '₹1.9T', sector: 'Pharma' },
    ],
    'Auto': [
      { rank: 1, name: 'Tesla', symbol: 'TSLA', price: 245.50, change: 1.12, market: '$780.2B', sector: 'Auto' },
      { rank: 2, name: 'Maruti', symbol: 'MARUTI', price: 9182.50, change: 0.56, market: '₹1.4T', sector: 'Auto' },
      { rank: 3, name: 'Bajaj Auto', symbol: 'BAJAJAUT', price: 6758.40, change: -0.21, market: '₹0.9T', sector: 'Auto' },
      { rank: 4, name: 'Hero Moto', symbol: 'HEROMOTOCO', price: 4128.75, change: 0.34, market: '₹0.7T', sector: 'Auto' },
    ],
    'FMCG': [
      { rank: 1, name: 'ITC Limited', symbol: 'ITC', price: 485.30, change: 0.42, market: '₹5.2T', sector: 'FMCG' },
      { rank: 2, name: 'Hindustan Unilever', symbol: 'HCLTECH', price: 2750.60, change: -0.15, market: '₹3.1T', sector: 'FMCG' },
      { rank: 3, name: 'Nestlé India', symbol: 'NESTLEIND', price: 2685.45, change: 0.28, market: '₹2.8T', sector: 'FMCG' },
      { rank: 4, name: 'Britannia', symbol: 'BRITANNIA', price: 4582.75, change: 0.55, market: '₹1.6T', sector: 'FMCG' },
    ],
  };

  useEffect(() => {
    const generateChartData = () => {
      const stocks = stocksByCategory[activeTab];
      const newChartData = {};
      stocks.forEach(stock => {
        const data = [];
        let price = parseFloat(stock.price);
        for (let i = 0; i < 15; i++) {
          const change = (Math.random() - 0.5) * 0.5;
          price = Math.max(price * 0.95, price + change);
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
      const stocks = stocksByCategory[activeTab];
      setMarketData(stocks.map(stock => ({
        ...stock,
        price: (parseFloat(stock.price) * (1 + (Math.random() - 0.5) * 0.01)).toFixed(2),
        change: (parseFloat(stock.change) + (Math.random() - 0.5) * 0.1).toFixed(2)
      })));
    };

    generateChartData();
    updatePrices();
    const interval = setInterval(updatePrices, 5000);
    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <section className="section market" aria-label="market update" data-section>
      <div className="container">
        <div className="title-wrapper">
          <h2 className="h2 section-title">Market Overview</h2>
          <a href="#" className="btn-link">See All Stocks</a>
        </div>

        <div className="market-tab">
          <ul className="tab-nav">
            {['View All', 'Tech', 'Banking', 'Energy', 'Pharma', 'Auto', 'FMCG'].map((tab) => (
              <li key={tab}>
                <button 
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>

          <table className="market-table">
            <thead className="table-head">
              <tr className="table-row table-title">
                <th className="table-heading"></th>
                <th className="table-heading">#</th>
                <th className="table-heading">Name</th>
                <th className="table-heading">Last Price</th>
                <th className="table-heading">24h %</th>
                <th className="table-heading">Chart</th>
                <th className="table-heading">Market Cap</th>
                <th className="table-heading"></th>
              </tr>
            </thead>
            <tbody className="table-body">
              {marketData.map((stock) => (
                <tr className="table-row" key={stock.symbol}>
                  <td className="table-data">
                    <button className="add-to-fav" aria-label="Add to favourite">♡</button>
                  </td>
                  <th className="table-data rank">{stock.rank}</th>
                  <td className="table-data">
                    <div className="wrapper">
                      <h3>
                        <a href="#" className="coin-name">
                          {stock.name} <span className="span">{stock.symbol}</span>
                        </a>
                      </h3>
                    </div>
                  </td>
                  <td className="table-data last-price">${stock.price}</td>
                  <td className={`table-data last-update ${stock.change >= 0 ? 'green' : 'red'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change}%
                  </td>
                  <td className="table-data market-chart">
                    {chartDataMap[stock.symbol] && (
                      <ResponsiveContainer width={80} height={40}>
                        <LineChart data={chartDataMap[stock.symbol]}>
                          <Line type="monotone" dataKey="price" stroke={stock.change >= 0 ? '#16a34a' : '#dc2626'} dot={false} isAnimationActive={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </td>
                  <td className="table-data market-cap">{stock.market}</td>
                  <td className="table-data">
                    <button className="btn btn-outline">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
