import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../src/styles/GlobalStyle.js';
import { Theme } from '../src/styles/Theme.js';
import './App.css';
import Create from './pages/Create';
import FindId from './pages/FindId';
import FindPassword from './pages/FindPassword';
import Home from './pages/Home';
import Library from './pages/Library';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Social from './pages/Social';

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/findid' element={<FindId />} />
          <Route path='/findpassword' element={<FindPassword />} />
          <Route exact path='/home' component={<Home />} />
          <Route exact path='/create' component={<Create />} />
          <Route exact path='/library' element={<Library />} />
          <Route exact path='/social' composnent={<Social />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
