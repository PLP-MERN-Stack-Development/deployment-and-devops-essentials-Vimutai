// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // if you have Tailwind or global styles

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found — make sure index.html has <div id="root"></div>');
}
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
