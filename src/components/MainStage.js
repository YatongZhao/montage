import React, { useState, useEffect, useRef } from 'react';
import MainStageStyle from '../styles/MainStage.module.css';

const MainStage = ({project}) => {
  const [status, setStatus] = useState('playing');

  return (
    <div className={MainStageStyle.MainStage}>
      <div className={MainStageStyle.MainLayer}>
        {project.projectName}
      </div>
      <ul className={MainStageStyle.Functions}>
        <li className={MainStageStyle.play}>
          <i className={`icon ${status === 'playing' ? 'icon-pause_circle_filled' : 'icon-play_circle_filled'}`}
            onClick={() => setStatus(status === 'playing' ? 'pause' : 'playing')} />
        </li>
      </ul>
    </div>
  )
}

export default MainStage;