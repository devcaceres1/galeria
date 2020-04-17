import React from 'react';
import './Toggle.css';


const ToggleButton = props => (
    <button className = 'toggle-butt' onClick ={props.click} >
        <div className = 'toggle-butt-row'> </div>
        <div className = 'toggle-butt-row'> </div>
        <div className = 'toggle-butt-row'> </div>
    </button>
)

export default ToggleButton;