import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../src/styles/GlobalStyle.js";
import { Theme } from "../src/styles/Theme.js";
import "./App.css";
import Login from "./pages/Login";

const App = () => {
    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyle />
            <Login />
        </ThemeProvider>
    );
};

export default App;
