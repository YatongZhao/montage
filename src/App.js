import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import logo from './images/logo-1600x900.png';

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
          <div className="example-box">
            <div className="example">
              <img src="https://raw.githubusercontent.com/YatongZhao/montage/master/src/images/WechatIMG89.png" alt=""/>
            </div>
          </div>
        </li>
        <li className="main-item">
          <div>
            Company's Introduction
          </div>
          <div>
            Montage Trip will convert vacation itinerary into a short personalized preview video featuring what travelers can expect during the real trip before booking. Montage Trip will filter the best travel videos people shared, and compile to a unique short preview video for users based on planned itinerary, personal preference, and previous experience. The generated video will allow users to experience the adventure before booking and provide users with the excitement of being a prepared traveler.
          </div>
        </li>
        <li className="main-item">Team Member</li>
      </ul>
      <footer className="footer">
        <div className="form">
          <div className="title">CONTACT US</div>
          <div className="item">
            <span>first name:</span>
            <input className="first-name" type="text"/>
          </div>
          <div className="item">
            <span>last name:</span>
            <input className="last-name" type="text"/>
          </div>
          <div className="item">
            <span>email:</span>
            <input className="email" type="email"/>
          </div>
          <div>
            Wanna join our team?
          </div>
          <select>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option selected value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </div>
      </footer>
    </div>
  );
}

export default App;
