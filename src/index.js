import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@xyflow/react/dist/style.css';

// Adicionar estilos globais
const style = document.createElement('style');
style.textContent = `
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
`;
document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
