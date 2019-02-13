import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import logo from './images/logo-1600x900.png';
import example1 from './images/WechatIMG89.png';

const App = () => {

  return (
    <div className="App">
      <div className="banner"><div className="banner-inner"></div></div>
      <div className="header-bg"></div>
      <div className="top"></div>
      <header className="header">
        <div className="logo">
          <img src={logo} alt=""/>
        </div>
        {/* <div className="nav-box">
          <ul className="nav">
            <li className="nav-item">Company's Introduction</li>
            <li className="nav-item">Team Member</li>
            <li className="nav-item">Example</li>
          </ul>
        </div> */}
      </header>
      <div className="description">
        <div className="inner">
          Montage Trip will convert vacation itinerary into a short personalized preview video featuring what travelers can expect from the real trip before booking.
        </div>
      </div>
      <ul className="main">
        <li className="main-item">
          Example
          <div className="example-box">
            <div className="example">
              <img src={example1} alt=""/>
            </div>
          </div>
        </li>
        <li className="main-item">Company's Introduction</li>
        <li className="main-item">Team Member</li>
      </ul>
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
