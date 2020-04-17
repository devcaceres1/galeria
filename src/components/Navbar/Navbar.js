import React from 'react';
import './Navbar.css';
import '../HamburgerMenu/Toggle.js'
import ToggleButton from '../HamburgerMenu/Toggle.js';

function Navbar (props) {
    return (
        <header className = 'toolbar'>
        <nav className = 'navigator'> 
            <div>
                <ToggleButton click = {props.togClickHandler}/>
            </div>
            <div className = 'home-link'> <a href="./"> Galeria  </a> </div>
            <div className = 'wrapper'> </div>
            <div className = 'multi-link'>
                <ul className = 'actions'>
                    <li> <a href="./"> Photos </a></li>
                    <li> <a href="./"> Comments </a></li>
                    <li> <a href="./"> User Profile </a></li>
                </ul>
            </div>
        </nav>
        </header>
    )
}
export default Navbar; 