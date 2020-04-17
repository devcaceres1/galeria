import React, {Component} from 'react';
import './Toggle.css'


class HamburgerMenu extends Component {
    render (){
        return (
        <nav className = 'hamburger-menu'>
            <div className = 'gray-out'> </div> 
        <ul>
            <li> <a href = '/'> Products </a> </li>
            <li> <a href = '/'> Profile </a> </li>
        </ul>
    </nav>
        )
    } 
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