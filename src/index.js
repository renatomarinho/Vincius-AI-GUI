import React from 'react';
import ReactDOM from 'react-dom/client';
// Remover a importação que não existe
// import './index.css';
import App from './App';
import '@xyflow/react/dist/style.css';

// Adiciona um log para confirmar o início da aplicação
console.log('Iniciando a aplicação...');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Remover a chamada para reportWebVitals que não foi importada
// reportWebVitals();
