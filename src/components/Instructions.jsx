import React from 'react';

export default function Instructions() {
  const steps = [
    {
      subtitle: 'Step 1',
      title: 'Explore Markets',
      text: 'Track real-time prices and index moves across global and Indian markets.'
    },
    {
      subtitle: 'Step 2',
      title: 'Use Indicators',
      text: 'Analyze with candlesticks, RSI, MACD, moving averages, and more tools.'
    },
    {
      subtitle: 'Step 3',
      title: 'See Predictions',
      text: 'Get AI-assisted trend signals and probability-based forecasts.'
    },
    {
      subtitle: 'Step 4',
      title: 'Decide Confidently',
      text: 'Build hypotheses, backtest ideas, and track outcomes over time.'
    }
  ];

  return (
    <section className="section instruction" aria-label="instruction" data-section>
      <div className="container">
        <h2 className="h2 section-title">How It Works</h2>
        <p className="section-text">
          TradeBro is an analytics platform: live prices, technical indicators, sector heatmaps, and AI predictions.
        </p>

        <ul className="instruction-list">
          {steps.map((step, idx) => (
            <li key={idx}>
              <div className="instruction-card">
                <p className="card-subtitle">{step.subtitle}</p>
                <h3 className="h3 card-title">{step.title}</h3>
                <p className="card-text">{step.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
