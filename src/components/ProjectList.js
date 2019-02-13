import React, { useState, useEffect, useRef } from 'react';
import ProjectListStyle from '../styles/ProjectList.module.css';
import moment from 'moment';
import { useSelected } from '../hooks';

const ProjectList = ({doneProjects, undoneProjects, onActive, currentProjectId, setDone, setUndone}) => {
  const {selected, setSelected, setLength, setCurrent} = useSelected(0, undoneProjects.length);

  useEffect(() => {
    setLength(undoneProjects.length);
  }, [undoneProjects]);

  useEffect(() => {
    undoneProjects.find((item, i) => {
      if (item.id === currentProjectId) {
        setCurrent(i);
        return true;
      }
    })
  }, [undoneProjects, currentProjectId]);

  useEffect(() => {
    undoneProjects[selected] && onActive(undoneProjects[selected]);
  }, [selected, undoneProjects]);

  function genClickHandler (i) {
    return () => {
      // setSelected(i);
    }
  }

  function genSetUndone (id) {
    return () => {
      setUndone(id);
    }
  }

  function genSetDone (id) {
    return () => {
      setDone(id);
    }
  }

  return (
    <div className={ProjectListStyle.ProjectList}>
      <ul className={ProjectListStyle.UndoneProjectList}>
        {undoneProjects.map((item, i) => (
          <li key={item.id} onClick={currentProjectId === item.id ? null : genClickHandler(i)}
            className={[
              selected === i ? ProjectListStyle.active : '', 
              currentProjectId === item.id ? ProjectListStyle.current : ''
            ].join(' ')}>
            {item.startTime ? moment(item.startTime).format('MM/DD/YY') : ''}···{item.projectName}
            {/* ...{item.id} */}
            <div className={ProjectListStyle.button} onClick={genSetDone(item.id)}>set done</div>
          </li>
        ))}
      </ul>
      <ul className={ProjectListStyle.DoneProjectList}>
        {doneProjects.map((item, i) => (
          <li key={item.id}>
            {item.startTime ? moment(item.startTime).format('MM/DD/YY') : ''}···{item.projectName}
            {/* ...{item.id} */}
            <div className={ProjectListStyle.button} onClick={genSetUndone(item.id)}>set undone</div>
          </li>
        ))}
      </ul>
      {/* <ul className={ProjectListStyle.DeleteProjectList}>
        {doneProjects.map((item, i) => (
          <li key={item.id}>
            {item.startTime ? moment(item.startTime).format('MM/DD/YY') : ''}···{item.projectName}
            <div className={ProjectListStyle.button} onClick={genSetUndone(item.id)}>set undone</div>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default ProjectList;
