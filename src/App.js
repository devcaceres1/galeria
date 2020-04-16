import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';

class App extends Component {
  render () {
  return (
    <div className = "App">
    <Navbar/>
    <p> This is a test </p>
    </div>
    );
  }
}

export default App;
