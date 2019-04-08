import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import MainScreen from './MainScreen';
//Oi

class App extends Component {
  render() {
    return (
      <div className="app">
        <Sidebar/>
        <MainScreen/>
      </div>
    );
  }
}

export default App;
