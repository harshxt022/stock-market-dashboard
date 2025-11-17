import React from 'react';
export default function Hero({ onExplore }) {
  return (
    <section className="section hero" aria-label="hero" data-section>
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span>AI-Powered Market Analysis</span>
          </div>
          <h1 className="h1 hero-title">Analyze & Predict Stock Market Trends</h1>
          <p className="hero-text">
            Real-time prices, AI-driven predictions, and actionable insights to guide smarter investment decisions.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onExplore}>
              Start Analyzing
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn btn-secondary" onClick={onExplore}>
              Learn More
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">50K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat">
              <span className="stat-value">1M+</span>
              <span className="stat-label">Predictions Daily</span>
            </div>
            <div className="stat">
              <span className="stat-value">98%</span>
              <span className="stat-label">Accuracy Rate</span>
            </div>
          </div>
        </div>
        <figure className="hero-banner">
          <img src="OIP.webp" width="570" height="448" alt="stock market analytics dashboard" className="w-100" />
        </figure>
      </div>
    </section>
  );
}
