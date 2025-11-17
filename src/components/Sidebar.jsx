import React from 'react';

export default function Sidebar({ selectedStock }) {
  const watchlist = [
    { symbol: 'AAPL', price: '$170.45', change: '+0.45', isPositive: true },
    { symbol: 'GOOGL', price: '$135.80', change: '-1.12', isPositive: false },
    { symbol: 'MSFT', price: '$330.10', change: '+0.88', isPositive: true },
    { symbol: 'AMZN', price: '$140.25', change: '-0.25', isPositive: false },
  ];

  return (
    <aside className="sidebar">
      <a href="/" className="sidebar-header">TradeBro</a>
      <div className="watchlist">
        <h3>Watchlist</h3>
        {watchlist.map((item) => (
          <div key={item.symbol} className="watchlist-item">
            <div>
              <div className="symbol">{item.symbol}</div>
              <div className="price">{item.price}</div>
            </div>
            <div className={`change ${item.isPositive ? 'positive' : 'negative'}`}>
              {item.change}%
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
