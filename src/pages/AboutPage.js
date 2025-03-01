import React from 'react';
import { useTitle } from '../hooks/useTitle';

const AboutPage = () => {
  useTitle('About | Vincius AI GUI');
  
  return (
    <div className="about-page">
      <h1>About Vincius AI GUI</h1>
      <p>This is a large-scale React application for AI-powered interfaces.</p>
      <section className="about-content">
        <h2>Our Mission</h2>
        <p>To provide an intuitive interface for AI interactions.</p>
      </section>
    </div>
  );
};

export default AboutPage;
