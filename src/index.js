import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

const kakaoKey = process.env.REACT_APP_KAKAO_KEY;

// Kakao SDK 초기화
if (window.Kakao && !window.Kakao.isInitialized()) {
  window.Kakao.init(kakaoKey);
  console.log('Kakao SDK 초기화 완료');
}

// 루트 DOM 노드를 생성
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
