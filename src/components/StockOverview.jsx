import React from 'react';

export default function StockOverview({ stockData, selectedStock }) {
  const price = stockData ? parseFloat(stockData['05. price']).toFixed(2) : '245.50';
  const change = stockData ? parseFloat(stockData['10. change percent']).toFixed(2) : '1.25';
  const changeClass = change >= 0 ? 'positive' : 'negative';

  return (
    <section className="card stock-overview">
      <div className="stock-overview-content">
        <div className="stock-info">
          <h1>{selectedStock} <span>– {selectedStock}</span></h1>
          <div className="market-status">Market Open</div>
        </div>
        <div className="stock-price">
          <div className="current-price">${price}</div>
          <div className={`daily-change ${changeClass}`}>{change >= 0 ? '+' : ''}{change}%</div>
        </div>
      </div>
    </section>
  );
}
