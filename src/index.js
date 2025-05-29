import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the /client
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> {/* Optional but recommended */}
    <App />
  </React.StrictMode>
);