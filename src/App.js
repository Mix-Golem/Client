import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../src/styles/GlobalStyle.js';
import { Theme } from '../src/styles/Theme.js';
import './App.css';
import FindId from './pages/FindId';
import FindPassword from './pages/FindPassword';
import Library from './pages/Library';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

const App = () => {
  // useEffect(() => {
  //   const kakaoKey = process.env.REACT_APP_KAKAO_KEY;

  //   if (window.Kakao && !window.Kakao.isInitialized()) {
  //     window.Kakao.init(kakaoKey);
  //     console.log('Kakao SDK 초기화 완료');
  //   }
  // }, []);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/users/login' element={<Login />} />
          <Route path='/users/signup' element={<Signup />} />
          <Route path='/users/findid' element={<FindId />} />
          <Route path='/users/findpassword' element={<FindPassword />} />
          {/* <Route path='/home' element={<Home />} /> */}
          {/* <Route path='/create' element={<Create />} /> */}
          <Route path='/library' element={<Library />} />
          {/* <Route path='/social' element={<Social />} /> */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
