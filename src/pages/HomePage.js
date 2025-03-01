import React from 'react';
import Hero from '../components/home/Hero';
import FeatureSection from '../components/home/FeatureSection';
import { useTitle } from '../hooks/useTitle';

const HomePage = () => {
  useTitle('Home | Vincius AI GUI');
  
  return (
    <div className="home-page">
      <Hero />
      <FeatureSection />
    </div>
  );
};

export default HomePage;
