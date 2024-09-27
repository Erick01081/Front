// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './components/theme-provider';
import App from './App';
import { renderPage } from './router';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Inicializa la página al cargar
renderPage(window.location.pathname);
