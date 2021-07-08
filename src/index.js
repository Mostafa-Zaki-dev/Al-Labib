import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/Routes';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

// Register Service Worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .catch((err) => console.log('service worker not registered', err));
}

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
