import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import './App.css';
import SideMenu from "./components/SideMenu";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Library from "./pages/Library";
import Social from "./pages/Social";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Router>
      <div className="App">
        <SideMenu />
        <Routes>
          <Route exact path="/" component={Home} /> */
          <Route exact path="/create" component={Create} />
          <Route exact path="/library" element={Library} />
          <Route exact path="/social" component={Social} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
