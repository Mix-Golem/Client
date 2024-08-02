import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../src/styles/GlobalStyle.js';
import { Theme } from '../src/styles/Theme.js';
import './App.css';
import FindId from './pages/FindId';
import FindPassword from './pages/FindPassword';
import Join from './pages/Join';
import Login from './pages/Login';

const App = () => {
    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyle />
            <Router>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/join' element={<Join />} />
                    <Route path='/findid' element={<FindId />} />
                    <Route path='/findpassword' element={<FindPassword />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
