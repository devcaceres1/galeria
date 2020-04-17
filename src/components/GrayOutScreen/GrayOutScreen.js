import React from 'react';
import './GrayOutScreen.css'


function GrayOutScreen (props) {
        return (
            <div className = 'gray-out' onClick = {props.click}> </div> 
        )
    } 

export default GrayOutScreen;