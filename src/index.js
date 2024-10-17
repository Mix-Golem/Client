import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // App 컴포넌트를 올바르게 import
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

const RootComponent = () => {
  useEffect(() => {
    const kakaoKey = process.env.REACT_APP_KAKAO_KEY;

    if (!kakaoKey) {
      console.error('Kakao key is missing!');
      return;
    }

    // Kakao SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey);
      console.log('Kakao SDK 초기화 완료');
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  );
};

// 루트 DOM 노드를 생성
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);

reportWebVitals();
