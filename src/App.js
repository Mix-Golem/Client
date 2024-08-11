import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../src/styles/GlobalStyle.js';
import { Theme } from '../src/styles/Theme.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import Create from './pages/Create';
import FindId from './pages/FindId';
import FindPassword from './pages/FindPassword';
import Home from './pages/Home';
import Library from './pages/Library';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Social from './pages/Social';

// 로그인 상태를 관리하기 위한 예시 상태
const isAuthenticated = false; // 실제 로그인 상태에 따라 변경

// 로그인된 사용자를 위한 경로 보호
const PrivateRoute = ({ children }) => {
  return isAuthenticated ? children : <Navigate to='/login' />;
};

const App = () => {
  useEffect(() => {
    const kakaoKey = process.env.REACT_APP_KAKAO_KEY;

    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey); // 환경 변수에서 Kakao 키 가져오기
      console.log('Kakao SDK 초기화 완료');
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/findid' element={<FindId />} />
            <Route path='/findpassword' element={<FindPassword />} />
            <Route
              path='/home'
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path='/create'
              element={
                <PrivateRoute>
                  <Create />
                </PrivateRoute>
              }
            />
            <Route
              path='/library'
              element={
                <PrivateRoute>
                  <Library />
                </PrivateRoute>
              }
            />
            <Route
              path='/social'
              element={
                <PrivateRoute>
                  <Social />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
