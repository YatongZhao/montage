import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from './axios';

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

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [join, setJoin] = useState(false);

  const [prompt, setPrompt] = useState('');

  const pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;

  function validate () {
    if (firstName.trim().length === 0) {
      return setPrompt(`First name can't be empty!`);
    } else if (lastName.trim().length === 0) {
      return setPrompt(`Last name cant't be empty!`);
    } else if (email.trim().length === 0) {
      return setPrompt(`Email can't be empty!`);
    } else if (!pattern.test(email.trim())) {
      return setPrompt(`Wrong email pattern!`);
    } else {
      setPrompt('');
      return true;
    }

  }
  function handleSubmit () {
    console.log('submit')
    if (!validate()) return;
    axios({
      method: 'post',
      url: '/contact/add',
      data: {
        firstName,
        lastName,
        email,
        join
      }
    })
    .then(({ data }) => {
      if (data.code === 0) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setJoin(true);
        setPrompt('');
        Toast();
      }
    })
    .catch(error => {
      setPrompt('Network Error!');
      console.log(error);
    })
  }

  const [toast, setToast] = useState(false);
  function Toast () {
    if (toast) return;
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2000);
  }

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
            <input className="first-name" type="text" value={firstName} onChange={e => {setFirstName(e.target.value); setPrompt('');}}/>
          </div>
          <div className="item">
            <span>last name:</span>
            <input className="last-name" type="text" value={lastName} onChange={e => {setLastName(e.target.value); setPrompt('');}}/>
          </div>
          <div className="item">
            <span>email:</span>
            <input className="email" type="email" value={email} onChange={e => {setEmail(e.target.value); setPrompt('');}}/>
          </div>
          <div className="item-radio">
            <span>
              Wanna join our team?
            </span>
            <span>
              yes<input type="radio" name="join" checked={join} onChange={e => setJoin(true)} />
              no<input type="radio" name="join" checked={!join} onChange={e => setJoin(false)} />
            </span>
          </div>
          <span className={["prompt", prompt === 'Success!' ? 'success': ''].join(' ')}>{prompt}</span>
          <button className="submit" onClick={handleSubmit}>submit</button>
        </div>
      </footer>
      <div style={{height: '11.5rem'}}></div>
      <div className="toast" style={{opacity: toast ? '1' : '0'}}>Added success!</div>
    </div>
  );
}

export default App;
