import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/Sidebar';
import { useTheme } from '../context/ThemeContext';

const MainLayout = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`app-container ${theme}`}>
      <Header />
      <div className="main-content">
        <Sidebar />
        <main className="content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
