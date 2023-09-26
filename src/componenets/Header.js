import FindCardResult from "./FindCardResult";
import React, { useState } from 'react';

function Header(){ 
    const [text, setText] = useState('');


    return (
        <div className="header">
            <div className="header__nav">
                <hr align="left" ></hr>
                <img className="header__nav__icon" src="./image/Logo.svg"></img>
                <hr align="right"></hr>
            </div>
            <p className="header__name">Weather forecast</p>
            <p className="header__description">Simple but powerful weather forcasting service based on OpenWeatherMap API</p>
            <FindCardResult></FindCardResult>
        </div>
    );
}

export default Header;
