import React from 'react';

export default function NewsSection({ selectedStock }) {
  const news = [
    {
      title: `${selectedStock} announces record delivery numbers for Q3.`,
      text: 'The company exceeded expectations with strong global sales...'
    },
    {
      title: `Analysts upgrade ${selectedStock} rating to 'Buy'.`,
      text: 'Multiple firms have raised their price targets on strong demand...'
    },
  ];

  return (
    <section className="card news-section">
      <h2>Latest News</h2>
      {news.map((item, idx) => (
        <div key={idx} className="news-item">
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </section>
  );
}
