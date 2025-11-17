import React from 'react';

export default function KeyStats({ stockData }) {
  const stats = [
    { label: 'Open', value: stockData ? parseFloat(stockData['02. open']).toFixed(2) : '$240.00', key: '02. open' },
    { label: 'High', value: stockData ? parseFloat(stockData['03. high']).toFixed(2) : '$250.00', key: '03. high' },
    { label: 'Low', value: stockData ? parseFloat(stockData['04. low']).toFixed(2) : '$238.50', key: '04. low' },
    { label: 'Volume', value: stockData ? parseInt(stockData['06. volume']).toLocaleString() : '1.2M', key: '06. volume' },
    { label: 'Market Cap', value: stockData ? '$850B' : '$850B' },
    { label: 'P/E Ratio', value: stockData ? '35.4' : '35.4' },
  ];

  return (
    <section className="card key-stats">
      <h2>Key Statistics</h2>
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="label">{stat.label}</div>
            <div className="value">{stat.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
