import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BaseStyles, SSRProvider } from '@primer/react';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ComponentDemoPage from './pages/ComponentDemoPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <SSRProvider>
      <ThemeProvider>
        <BaseStyles>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/components" element={<ComponentDemoPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </MainLayout>
        </BaseStyles>
      </ThemeProvider>
    </SSRProvider>
  );
}

export default App;
