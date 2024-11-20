import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importamos el componente principal 'App'
import './index.css'; // Estilos globales

// Montamos la aplicación en el contenedor 'root'
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
