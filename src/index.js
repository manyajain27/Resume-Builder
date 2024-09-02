// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the use of 'react-dom/client'
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
