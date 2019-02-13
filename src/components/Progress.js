import React, { useState, useEffect, useRef } from 'react';
import ProgressStyle from '../styles/Progress.module.css';

const Progress = ({color, show, width, onTransitionEnd}) => {
  return (
    <div className={ProgressStyle.Progress}>
      <div className={ProgressStyle.innerBox}>
        <div className={ProgressStyle.bar} style={{width, display: show ? 'block' : 'none', backgroundColor: color}} onTransitionEnd={onTransitionEnd}></div>
        <div className={ProgressStyle.bar} style={{width, display: !show ? 'block' : 'none', backgroundColor: color}} onTransitionEnd={onTransitionEnd}></div>
      </div>
    </div>
  )
}

export default Progress;
