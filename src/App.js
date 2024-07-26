import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../src/styles/GlobalStyle.js';
import { Theme } from '../src/styles/Theme.js';
import './App.css';
import Join from './pages/Join';
import Login from './pages/Login';

const App = () => {
    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyle />
            <Router>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/join' element={<Join />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
