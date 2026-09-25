import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';

// Entry point de la aplicación React
// Configura el modo estricto y monta la aplicación en el DOM
// Maneja errores durante el renderizado para evitar quiebre de la UI

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se encontró el elemento root en el DOM');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Configuración global de manejo de errores
window.addEventListener('error', (event) => {
  console.error('Error global:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason);
});

// Registra servicio de logging para errores no capturados
if (import.meta.env.MODE === 'development') {
  import('@shared/utils/logger').then(({ logger }) => {
    logger.init();
  });
}