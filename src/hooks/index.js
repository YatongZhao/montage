import { useState, useEffect } from 'react';
import axios from '../axios';
import moment from 'moment';

function useProjects(initial = [], addStamp, nextProjectId, currentProjectId) {
    const [projects, setProjects] = useState(initial);
    const {doneProjects} = useDoneProjects(projects);
    const {undoneProjects} = useUndoneProjects(projects);
    const {objProjects} = useObjProjects(projects);
    useEffect(() => {
        axios({ method: 'get', url: '/project/list' })
            .then(({ data }) => {
                setProjects(data.data);
            });
    }, []);

    function addProject(newProject) {
        setProjects([...projects, newProject]);
    }

    async function setDone (id) {
        // setDone有一点特殊：
        // 如果需要done的project是current的话，需要先将currentProject处理掉，再setDone
        if (id === currentProjectId) {
            let { code, msg } = await addStamp(nextProjectId);
            if (code !== 0) {
                return { code: -1, msg }
            }
        }
        axios({ method: 'post', url: '/project/done', data: { id } })
            .then(({ data }) => {
                if (data.code === 0) {
                    setProjects(projects.map(item => {
                        if (item.id === id) item.done = true;
                        return item;
                    }));
                }
            })
    }

    function setUndone (id) {
        axios({ method: 'post', url: '/project/undone', data: { id } })
            .then(({ data }) => {
                if (data.code === 0) {
                    setProjects(projects.map(item => {
                        if (item.id === id) item.done = false;
                        return item;
                    }));
                }
            })
    }

    return {
        projects,
        objProjects,
        setProjects,
        addProject,
        doneProjects,
        undoneProjects,
        setDone,
        setUndone
    };
}

function useDoneProjects (projects) {
    const [doneProjects, setDoneProjects] = useState([]);
    useEffect(() => {
        setDoneProjects(projects.filter(item => item.done));
    }, [projects]);

    return {doneProjects}
}

function useUndoneProjects (projects) {
    const [undoneProjects, setUndoneProjects] = useState([]);
    useEffect(() => {
        setUndoneProjects(projects.filter(item => !item.done));
    }, [projects]);

    return {undoneProjects}
}

function useObjProjects (projects) {
    const [objProjects, setObjProjects] = useState({});
    useEffect(() => {
        let _obj = {}
        projects.forEach((item, i) => {
            _obj[item.id] = {
                ...item,
                color: `rgba(${(i / projects.length * 0.6 + 0.2) * 153 + 51}, ${(i / projects.length * 0.6 + 0.2) * 153 + 51}, ${(i / projects.length * 0.6 + 0.2) * 153 + 51}, 1)`
            }
        })
        setObjProjects(_obj);
    }, [projects]);

    return {objProjects}
}

function useSelected(initial = 0, initialLength = 1) {
    let unit = 30;
    let initOffsetTop = initial * unit + unit / 2;
    const [offsetTop, setOffsetTop] = useState(initOffsetTop);
    const [length, setLength] = useState(initialLength);
    const [current, setCurrent] = useState(-1);
    useEffect(() => {
        document.addEventListener('wheel', handleWheel);
        return () => {
            document.removeEventListener('wheel', handleWheel);
        }
    }, [offsetTop]);

    function handleWheel(e) {
        let _offsetTop = offsetTop + e.deltaY < 1
            ? 1
            : offsetTop + e.deltaY > unit * (length - 1) - 1
                ? unit * (length - 1) - 1
                : offsetTop + e.deltaY;
        setOffsetTop(_offsetTop);
        e.preventDefault();
    }

    function setSelected(index) {
        setOffsetTop(index * unit + unit / 2);
    }

    return {
        selected: Math.floor(offsetTop / unit) < current ? Math.floor(offsetTop / unit) : Math.floor(offsetTop / unit) + 1,
        setSelected,
        setLength,
        setCurrent
    };
}

function useStamps(initial) {
    const [stamps, setStamps] = useState(initial);
    useEffect(() => {
        axios({ method: 'get', url: '/stamp/get' })
            .then(({ data }) => {
                setStamps(data.data);
            })
    }, []);

    async function addStamp(nextProjectId) {
        let { data } = await axios({
          method: 'post',
          url: '/stamp/add',
          data: {
            nextId: nextProjectId
          }
        });
        if (data.code === 0) {
            setStamps({
                sub: stamps.sub,
                sup: stamps.sup,
                main: [...stamps.main, data.result],
                latest: data.result
            });
            return { code: 0, msg: 'success' }
        } else {
            return { code: data.code, msg: data.msg }
        }
    }
    return {
        stamps,
        setStamps,
        addStamp,
        currentProjectId: stamps.latest.nextId
    };
}

function useBlocks(stamps) {
    const [blocks, setBlocks] = useState([]);
    let _blocks = [];
    useEffect(() => {
        if (stamps.main.length === 0) {
            _blocks.push({
                id: stamps.sub.id,
                start: 0,
                end: 24 * 60 * 60 * 1000,
            });
        } else {
            let lastStamp = 0;
            _blocks = stamps.main.map((item, i) => {
                let result = {
                    id: item.lastId,
                    start: lastStamp,
                    end: item.timeStamp - moment().startOf('day').valueOf(),
                }
                lastStamp = item.timeStamp - moment().startOf('day').valueOf();
                return result;
            });
            _blocks.push({
                id: stamps.main[stamps.main.length - 1].nextId,
                start: stamps.main[stamps.main.length - 1].timeStamp - moment().startOf('day').valueOf(),
                end: 24 * 60 * 60 * 1000
            });
        }

        setBlocks(_blocks);
    }, [stamps]);

    return blocks;
}

function useWindowWidth (initial = window.innerWidth) {
    const [width, setWidth] = useState(initial);
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      }
    }, []);
  
    function handleResize (e) {
      setWidth(e.target.innerWidth);
    }

    return { width }
}

export {
    useProjects,
    useSelected,
    useStamps,
    useBlocks,
    useWindowWidth
}
