import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Trends from '../components/Trends';
import Market from '../components/Market';
import Instructions from '../components/Instructions';
import About from '../components/About';
import Footer from '../components/Footer';
import '../styles/landing.css';

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll reveal animations
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      sections.forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight / 1.5) {
          section.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">
      <Header onDashboardClick={() => navigate('/dashboard')} />
      <main>
        <Hero onExplore={() => navigate('/dashboard')} />
        <Trends />
        <Market />
        <Instructions />
        <About />
      </main>
      <Footer />
    </div>
  );
}
