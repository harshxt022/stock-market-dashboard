import React from 'react';

export default function PortfolioOverview() {
  return (
    <section className="card portfolio-overview">
      <h2>Portfolio</h2>
      <div className="portfolio-summary">
        <div>
          <div className="label">Total Balance</div>
          <div className="balance">$25,000.00</div>
        </div>
        <div>
          <div className="label">Today's Gain</div>
          <div className="gain positive">+$250.00 (+1.5%)</div>
        </div>
      </div>
      <table className="holdings-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Shares</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>TSLA</td>
            <td>20</td>
            <td>$4,910.00</td>
          </tr>
          <tr>
            <td>AAPL</td>
            <td>30</td>
            <td>$5,113.50</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
