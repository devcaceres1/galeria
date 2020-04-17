import React, {Component} from 'react';
import './HamburgerMenu.css'


function HamburgerMenu (props) {
    let drawer = 'side-drawer'
        if (props.show) {
        drawer = 'side-drawer open'
    }
        return (
        <nav className = 'hamburger-menu'>
            <div className = 'gray-out'> </div> 
        <ul className = 'ham-links'>
            <li> <a href = '/'> Photos </a> </li>
            <li> <a href = '/'> Comments </a> </li>
            <li> <a href = '/'> Users </a> </li>
        </ul>
    </nav>
        )
    } 

// const HamburgerMenu = props => (
//     <nav className = 'hamburger-menu'> 
//         <ul>
//             <li> <a href = '/'> Products </a> </li>
//             <li> <a href = '/'> Profile </a> </li>
//         </ul>
//         <div className = 'gray-out'> </div>
//     </nav>
// );

export default HamburgerMenu;