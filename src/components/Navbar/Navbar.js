import React from 'react';
import './Navbar.css';

function Navbar (props) {
    return (
        <header className = 'toolbar'>
        <nav className = 'navigator'> 
            <div className = 'home-link'> <a href="./"> Navbar to be </a> </div>
            <div className = 'wrapper'> </div>
            <div className = 'multi-link'>
                <ul>
                    <li> <a href="./"> Home </a></li>
                    <li> <a href="./"> User Profile </a></li>
                </ul>
            </div>
        </nav>
        </header>
    )
}
export default Navbar; 