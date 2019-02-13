import React, { useState, useEffect, useRef } from 'react';
import AddProjectStyle from '../styles/AddProject.module.css';
import axios from '../axios';

const AddProject = ({onAdd, active, setActive}) => {
  const [projectName, setProjectName] = useState('');
  const inputEl = useRef(null);
  function projectNameHandler (event) {
    if (active) {
      setProjectName(event.target.value);
    }
  }
  function addProjectHandler () {
    axios({
      method: 'post',
      url: '/project/add',
      data: { projectName }
    }).then(({data}) => {
      if (data.code === 0) {
        onAdd(data.data);
      }
    });
  }
  function handleKeyPress (e) {
    if (active) {
      e.nativeEvent.stopPropagation();
      if (e.nativeEvent.keyCode === 13) {
        console.log(active);
        setActive(false);
        setProjectName('');
        inputEl && inputEl.current && inputEl.current.blur();
        projectName && addProjectHandler();
      }
    }
  }
  active && inputEl && inputEl.current && inputEl.current.focus();
  return (
    <div className={`${AddProjectStyle.AddProject} ${active ? AddProjectStyle.active : ''}`}>
      <div>
        <input ref={inputEl} type="text"
          onKeyPress={handleKeyPress}
          value={projectName} onChange={projectNameHandler} placeholder={active ? '项目名称' : ''}/>
      </div>
      {/* <button onClick={addProjectHandler}>add project</button> */}
    </div>
  );
}

export default AddProject;
