const { Project } = require('../model');
const { getNextSequenceValue } = require('./counter');

const addProject = async (req, res) => {
    let { projectName } = req.body;
    let startTime = Date.now();

    let { sequenceValue } = await getNextSequenceValue('project');
    Project.create({
        startTime,
        projectName,
        id: sequenceValue,
        done: false
    })
    .then(result => res.json({ code: 0, msg: 'success', data: result }))
    .catch(error => res.json({ code: -2, msg: 'error', error }));
}

const listProject = (req, res) => {
    Project.find({}, {_id: 0, __v: 0}).sort({ timeStamp: -1 })
        .then(result => res.json({ code: 0, msg: 'success', data: result }))
        .catch(error => res.json({ code: -2, msg: 'error', error }));
}

const doneProject = (req, res) => {
    let { id } = req.body;
    Project.findOneAndUpdate({ id }, { done: true })
        .then(result => res.json({ code: 0, msg: 'success', data: result }))
        .catch(error => res.json({ code: -1, msg: 'error', error}))
}

const undoneProject = (req, res) => {
    let { id } = req.body;
    Project.findOneAndUpdate({ id }, { done: false })
        .then(result => res.json({ code: 0, msg: 'success', data: result }))
        .catch(error => res.json({ code: -1, msg: 'error', error}))
}

module.exports = {
    addProject,
    listProject,
    doneProject,
    undoneProject
}
