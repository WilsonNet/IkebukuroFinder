import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import MainScreen from './MainScreen';
//Oi

class App extends Component {
  state = {
    markers: []
  }
  updateMarkers = (markers) => {

  }
  render() {
    return (
      <div className="app">
        <Sidebar/>
        <MainScreen
          onUpdateMarkers = { (markers) => this.updateMarkers }
        />
      </div>
    );
  }
}

export default App;
