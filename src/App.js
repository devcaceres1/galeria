import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';
import GrayOutScreen from './components/GrayOutScreen/GrayOutScreen';
import './App.css';

class App extends Component {
  state = {
    hamburgerMenuOpen : false,
  }

//   //Passing prevState as an argument within the function . If the hamburger draw was open the return objecvt which will update the state with a boolean (to the opposite of prevState hamburger - from false to true, or true to false)

  togClickHandler = () => {
    this.setState(prevState => {
      return { hamburgerMenuOpen : !prevState.hamburgerMenuOpen }
    })
  }

  grayOutClickHandler = () => {
    this.setState({ hamburgerMenuOpen :  false })
  }

  render () {
    let hamOpen;
    let grayScreen;
    
    if (this.state.hamburgerMenuOpen) {
      hamOpen = <HamburgerMenu/>
      grayScreen = <GrayOutScreen click={this.grayOutClickHandler} />
    }

    //Passing togClickHandler into Navbar since it holds the button that will trigger it.  
    return (
      <div>
        <Navbar togClickHandler={this.togClickHandler} />
        {grayScreen}
        {hamOpen}
        {/* <HamburgerMenu show={this.state.hamburgerMenuOpen} /> */}
      </div>
    )
  }
}

export default App
