import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';
import GrayOutScreen from './components/GrayOutScreen/GrayOutScreen';

class App extends Component {
  render () {
  return (
    <div className = "App">
    <Navbar/>
    <HamburgerMenu/>
    <GrayOutScreen/>
    <p> This is a test </p>
    </div>
    );
  }
}

export default App;
