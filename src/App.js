import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { useBlocks, useProjects, useStamps, useWindowWidth } from './hooks';
import Konva from 'konva';

import ProjectList from './components/ProjectList';
import MainStage from './components/MainStage';
import Progress from './components/Progress';
import AddProject from './components/AddProject';
import Scratch from './components/Scratch';

const App = () => {
  const {stamps, addStamp, currentProjectId} = useStamps({sub: {id: 1, timeStamp: 0}, main: [], sup: null, latest: {id: 1}});
  
  const [ nextProject, setNextProject ] = useState({});
  const [ currentProject, setCurrentProject ] = useState({});
  
  const { projects, objProjects, addProject, undoneProjects, doneProjects, setDone, setUndone } = useProjects([], addStamp, nextProject.id, currentProjectId);

  const {width} = useWindowWidth(window.innerWidth);
  const blocks = useBlocks(stamps);

  const [isActive, setIsActive] = useState(false); // 添加项目输入框的激活状态

  const [showProcess, setShowProcess] = useState(true);
  const [processPercent, setProcessPercent] = useState('0%');
  const [processColor, setProcessColor] = useState('black');
  function keyHandler (e) {
    console.log(e);
    if (isActive) {
      setIsActive(false);
    } else {
      if (processPercent !== '80%' && processPercent !== '100%') {
        if (e.keyCode === 14) {
          setProcessPercent('80%');
        } else if (e.keyCode === 13) {
          setIsActive(true);
        }
      }
    }
  }
  async function handleProgress (e) {
    console.log(e.target.style.width);
    switch (e.target.style.width) {
      case '0%':
        
        break;
      case '80%':
        let {code} = await addStamp(nextProject.id);
        if (code === 0) {
          setProcessPercent('100%');
          setProcessColor('white');
        } else {
          setProcessPercent('100%');
          setProcessColor('red');
        }
        break;
      case '100%':
        setShowProcess(!showProcess);
        setProcessPercent('0%');
        setProcessColor('black');
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    window.addEventListener('keypress', keyHandler);
    return () => {
      window.removeEventListener('keypress', keyHandler)
    }
  }, [nextProject, isActive]);
  
  useEffect(() => {
    let _currentProject = undoneProjects.find(item => {
      return item.id === currentProjectId
    });
    _currentProject && setCurrentProject(_currentProject);
  }, [currentProjectId, undoneProjects]);


  return (
    <div className="App">
      <Bar blocks={blocks} objProjects={objProjects} width={width} />
      <Progress show={showProcess} color={processColor} width={processPercent} onTransitionEnd={handleProgress} />
      <ProjectList
        doneProjects={doneProjects} undoneProjects={undoneProjects}
        onActive={setNextProject} currentProjectId={currentProjectId}
        setDone={setDone} setUndone={setUndone} />
      <NextProject project={nextProject} />
      <MainStage project={currentProject} />
      <div className='main'>
        <AddProject onAdd={addProject} active={isActive} setActive={setIsActive} />
        {/* <Stamp nextProject={nextProject} onAdd={addStamp} stamps={stamps} />
        <BarData blocks={blocks} projects={projects}/> */}
      </div>
      <Scratch />
    </div>
  );
}


const BarData = ({blocks}) => {
  return (
    <ul>
      {blocks.map((item) => (
        <li key={item.start}>
          {item.id} \ {item.start} \ {item.end}
        </li>
      ))}
    </ul>
  )
}

let flag = true;
let unitFlag = true;
let sum = 0;
let unitDiff = 0;
const Bar = ({blocks, objProjects, width}) => {
  const [offsetLeft, setOffsetLeft] = useState(18 * 60 * 1000 * 60);
  const [drawedBlocks, setDrawedBlocks] = useState([]);

  const canvasEl = useRef(null);
  const [stage, setStage] = useState(null);
  const [layer, setLayer] = useState(null);
  useEffect(() => {// 初始化
    let canvasDom = canvasEl.current;
    let _stage = new Konva.Stage({
      container: canvasDom,
      width,
      height: 100,
      clearBeforeDraw: false
    });
    let _layer = new Konva.Layer();
    _stage.add(_layer);
    setStage(_stage);
    setLayer(_layer);
    console.log('-----------')
  }, [width, canvasEl]);

  const [unit, setUnit] = useState(width / (60 * 24) / 1000 / 60); //5s/px

  useEffect(() => {
    flag = true;
  }, [offsetLeft]);

  useEffect(() => {
    canvasEl.current.addEventListener('wheel', handleWheel);
    return () => {
      canvasEl.current.removeEventListener('wheel', handleWheel);
    }
  }, [canvasEl, offsetLeft, unit, width]);


  useEffect(() => { unitFlag = true; }, [unit]);

  useEffect(() => {
    if (unit < width / (60 * 24) / 1000 / 60) {
      setUnit(width / (60 * 24) / 1000 / 60);
    }
  }, [width]);

  useEffect(() => {
    if (offsetLeft > (60 * 24 - width / (unit * 1000 * 60)) * 1000 * 60) {
      setOffsetLeft((60 * 24 - width / (unit * 1000 * 60)) * 1000 * 60);
    } else if (offsetLeft < 0) {
      setOffsetLeft(0);
    }
  }, [unit, width]);

  function handleWheel (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.ctrlKey) { // 缩放
      unitDiff -= e.deltaX / 500 / 1000 / 60;
      if (!unitFlag) return
      if (unitDiff) {
        setUnit(
          unit + unitDiff <= 0.1 / 1000 / 60
          ? 0.1 / 1000 / 60
          : unit + unitDiff > width / (60 * 24) / 1000 / 60
            ? unit + unitDiff
            : width / (60 * 24) / 1000 / 60
        );
        unitDiff = 0;
        unitFlag = unit === 0.1 / 1000 / 60 || unit === width / (60 * 24) / 1000 / 60;
      }
    } else { // 移动
      // if (!flag) return console.log('oooo')
      sum += e.deltaX / 500 * 60 * 1000 * 60;
      if (sum) {
        setOffsetLeft(
          offsetLeft + sum <= 0
            ? 0
            : offsetLeft + sum < (60 * 24 - width / (unit * 1000 * 60)) * 1000 * 60
              ? offsetLeft + sum
              : (60 * 24 - width / (unit * 1000 * 60)) * 1000 * 60
        );
        sum = 0;
        // flag = offsetLeft === 0 || offsetLeft === (60 * 24 - width / (unit * 1000 * 60)) * 1000 * 60;
      }
    }
  }

  const [diffBlocks, setDiffBlocks] = useState([]);
  useEffect(() => {
    // [0, width / unit], 渲染此区间
    // 由blocks生成drawedBlocks
    let _drawedBlocks = [];
    let temp = blocks.filter(item => {
      return item.start < width / unit + offsetLeft && item.end > offsetLeft
    });
    _drawedBlocks = temp.map((item, i) => {
      let result = {
        ...item
      }
      if (i === 0 && i === temp.length - 1) {
        result.start = 0;
        result.end = width / unit;
      } else if(i === 0) {
        result.start = 0;
        result.end = item.end - offsetLeft
      } else if (i === temp.length - 1) {
        result.start = item.start - offsetLeft;
        result.end = width / unit;
      } else {
        result.start = item.start - offsetLeft;
        result.end = item.end - offsetLeft
      }
      return result;
    });
    // diff
    let _diffBlocks = [];
    let _starts = new Set(drawedBlocks.concat(_drawedBlocks).map(item => item.start));
    let _startsArr = Array.from(_starts).sort()
    _startsArr.forEach((item, i) => {
      let dbId = 0;
      let _dbId = 0;
      for (let i = drawedBlocks.length - 1; i >= 0; i--) {
        if (drawedBlocks[i].start <= item) {
          dbId = drawedBlocks[i].id;
          break;
        }
      }
      for (let i = _drawedBlocks.length - 1; i >= 0; i--) {
        if (_drawedBlocks[i].start <= item) {
          _dbId = _drawedBlocks[i].id;
          break;
        }
      }
      if (dbId !== _dbId) {
        _diffBlocks.push({
          id: _dbId,
          start: item,
          end: _startsArr[i + 1] || width / unit
        })
      }
    });
    setDiffBlocks(_diffBlocks);
    setDrawedBlocks(_drawedBlocks);
  }, [blocks, offsetLeft, width, unit]);

  useEffect(() => {
    if (stage) {
      layer.removeChildren();
      let tweens = {};
      drawedBlocks.forEach(item => {
        let rect = new Konva.Rect({
          x: Math.floor((item.start) * unit),
          y: 5,
          width: Math.ceil((item.end - item.start) * unit),
          height: 30,
          fill: objProjects[item.id] ? objProjects[item.id].color : `rgba(0, 153, 255, 1)`,
          name: String(item.id)
        });
        rect.on('mouseover', function () {
          // let _stages = stage.find(`.${item.id}`);
          // _stages.forEach(stage => {
          //   // stage.setFill('rgba(0, 153, 255, 1)');
          //   stage.setAttrs({
          //     fill: 'rgba(0, 153, 255, 1)',
          //     shadowColor: 'black',
          //     shadowBlur: 5,
          //     shadowOffset: {x : 0, y : 0},
          //     shadowOpacity: 0.5
          //   })
          // })
          tweens[item.id].forEach(item => {
            item.play();
          })
          layer.draw();
        });
        rect.on('mouseleave', function () {
          // let _stages = stage.find(`.${item.id}`);
          // _stages.forEach(stage => {
          //   stage.setAttrs({
          //     fill: objProjects[item.id] ? objProjects[item.id].color : `rgba(0, 153, 255, 1)`,
          //     shadowOpacity: 0
          //   });
          // })
          tweens[item.id].forEach(item => {
            item.reverse();
          })
          layer.draw();
        })
        layer.add(rect);
        let tween = new Konva.Tween({
          node: rect,
          duration: .1,
          fill: 'rgba(0, 153, 255, 1)',
          shadowColor: 'black',
          shadowBlur: 5,
          shadowOffset: {x : 0, y : 0},
          shadowOpacity: 0.5
        });
        tweens[item.id] = tweens[item.id] ? [...tweens[item.id], tween] : [tween];
      });
      layer.draw();
    }
  }, [drawedBlocks, stage, objProjects]);

  return (
    <div ref={canvasEl} style={{margin: '0 auto'}}></div>
  )
}

const Stamp = ({nextProject, onAdd, stamps}) => {
  function addStampHandler () {
    onAdd(nextProject.id);
  }

  return (
    <div>
      <div>currentProjectId: {stamps.latest.nextId}</div>
      <div>nextProjectId: {nextProject.id}</div>
      <div>nextProject: {nextProject.projectName}</div>
      <button onClick={addStampHandler}>add stamp</button>
    </div>
  )
}

const NextProject = ({project}) => {
  return (
    <div className='next-project'>
      <div>nextProject: {project.projectName}</div>
    </div>
  )
}

export default App;
