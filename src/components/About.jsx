import React from 'react';

export default function About() {
  return (
    <section className="section about" aria-label="about" data-section>
      <div className="container">
        <figure className="about-banner">
          <img src='favicon.svg'  height="600" loading="lazy" alt="about banner" className="w-100" />
        </figure>

        <div className="about-content">
          <h2 className="h2 section-title">What Is TradeBro</h2>
          <p className="section-text">
            Experience comprehensive stock analysis: real-time quotes, sectors, heatmaps, predictions, and backtesting.
          </p>

          <ul className="section-list">
            <li className="section-item">
              <div className="title-wrapper">
                <span>✓</span>
                <h3 className="h3 list-title">Real-time stock & index prices</h3>
              </div>
              <p className="item-text">
                Track equities, ETFs, and indices with latency-optimized data updates.
              </p>
            </li>

            <li className="section-item">
              <div className="title-wrapper">
                <span>✓</span>
                <h3 className="h3 list-title">AI insights & predictions</h3>
              </div>
              <p className="item-text">
                Get probability-based up/down signals and confidence intervals.
              </p>
            </li>
          </ul>

          <a href="#" className="btn btn-primary">Explore More</a>
        </div>
      </div>
    </section>
  );
}
