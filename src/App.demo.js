import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [offsetTop, setOffsetTop] = useState(0);
  useEffect(() => {
    document.addEventListener('wheel', handleWheel);
    return () => {
      document.removeEventListener('wheel', handleWheel);
    }
  }, []);

  function handleWheel (e) {
    setOffsetTop(3);
    console.log(offsetTop);
    e.preventDefault();
  }

  return (
    <div className="App">
      <ul>
        <li>offsetTop:{offsetTop}</li>
      </ul>
    </div>
  );
}

export default App;
