import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import HomePage from './Components/HomePage'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route exact path="/" component={HomePage} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
