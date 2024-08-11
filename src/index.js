import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 루트 DOM 노드를 생성합니다.
const root = ReactDOM.createRoot(document.getElementById('root'));

// React.StrictMode를 사용하여 앱을 렌더링합니다.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 앱 성능 측정 (옵션)
reportWebVitals();
