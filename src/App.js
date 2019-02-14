import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import logo from './images/logo-1600x900.png';

const members = [
  {
    avatar: 'https://raw.githubusercontent.com/YatongZhao/montage/master/src/images/WechatIMG144.png',
    name: 'Rachael Huff',
    desc: `Rachael's background includes a degree in marketing. She has extensive experience running marketing.`
  },
  {
    avatar: 'https://raw.githubusercontent.com/YatongZhao/montage/master/src/images/WechatIMG143.png',
    name: 'Ruoyu Li',
    desc: `Ruoyu Li  is a senior at the University of Arizona, his majors are Mathematics with emphasis Economics and Business, and Information Science and Technology`
  },
  {
    avatar: 'https://raw.githubusercontent.com/YatongZhao/montage/master/src/images/WechatIMG145.png',
    name: 'Ye Zhang',
    desc: `U of A Ph.D. student With a strong engineering technology background and interest in traveling, he is mainly contributing to the technology support and corporation strategy`
  },
  {
    avatar: 'https://raw.githubusercontent.com/YatongZhao/montage/master/src/images/WechatIMG146.png',
    name: 'Chuhan (Kevin) Zhou',
    desc: `Kevin is a multilingual international student major in Management and Entrepreneurship; also minor in Japanese and Psychology. He has abundant work and volunteer experiences`
  }
]

const App = () => {

  return (
    <div className="App">
      <div className="banner-outer">
        <div className="banner"><div className="banner-inner"></div></div>
      </div>
      <div className="header-bg"></div>
      <div className="top"></div>
      <header className="header">
        <div className="logo">
          <img src='https://raw.githubusercontent.com/YatongZhao/montage/master/src/images/logo-1600x900.png' alt=""/>
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
            <div className="example">
              <img src='https://raw.githubusercontent.com/YatongZhao/montage/master/src/images/WechatIMG112.png' alt=""/>
            </div>
            <div className="example">
              <img src='https://raw.githubusercontent.com/YatongZhao/montage/master/src/images/WechatIMG113.png' alt=""/>
            </div>
          </div>
        </li>
        <li className="main-item">
          <div className="title">
            Company's Introduction
          </div>
          <div className="company-introduction">
            Montage Trip will convert vacation itinerary into a short personalized preview video featuring what travelers can expect during the real trip before booking. Montage Trip will filter the best travel videos people shared, and compile to a unique short preview video for users based on planned itinerary, personal preference, and previous experience. The generated video will allow users to experience the adventure before booking and provide users with the excitement of being a prepared traveler.
          </div>
        </li>
        <li className="main-item member">
          <div className="title">
            Team Member
          </div>
          <div className="member-box">
            <ul className="member-list">
              {members.map(item => (
                <li className="member-item">
                  <div className="avatar"><img src={item.avatar} alt=""/></div>
                  <span>{item.name}</span>
                  <div className="desc">
                    {item.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </li>
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
          <div className="item-radio">
            <span>
              Wanna join our team?
            </span>
            <span>
              yes<input type="radio" name="join" value="yes" />
              no<input type="radio" name="join" value="no" />
            </span>
          </div>
          <button className="submit">submit</button>
        </div>
      </footer>
      <div style={{height: '11.5rem'}}></div>
    </div>
  );
}

export default App;
