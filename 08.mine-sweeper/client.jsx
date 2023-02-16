import React from 'react';
import ReactDOM from 'react-dom/client';
import MineSweeper from './MineSweeper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MineSweeper />
  </React.StrictMode>,
);
