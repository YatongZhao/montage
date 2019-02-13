import React, { useState, useEffect, useRef } from 'react';
import ScratchStyle from '../styles/Scratch.module.css';

const Scratch = () => {
  const [innerHTML, setInnerHTML] = useState({__html: '<div>上善若水。</div>'});
  function handleKeyPress (e) {
    e.nativeEvent.stopPropagation();
  }
  return (
    <div onKeyPress={handleKeyPress} className={ScratchStyle.Box}>
      <div className={ScratchStyle.Scratch}
        contentEditable={true} dangerouslySetInnerHTML={innerHTML}
        onChange={e => setInnerHTML(e.target.value)}></div>
    </div>
  )
}

export default Scratch;
