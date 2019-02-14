const express = require('express');
const route = express.Router();
const { addProject, listProject, doneProject, undoneProject } = require('../service/project');
const { addStamp, getStamps } = require('../service/stamp');

const { addContact, listContact } = require('../service/contact');

/**
 * 
 * @param {String} type - post|get
 * @param {Array} params 
 */
function genParamChecker (type, params) {
    let _type = type.toLocaleLowerCase();
    let paramsHolder;
    switch (_type) {
        case 'post':
            paramsHolder = 'body';
            break;
        case 'get':
            paramsHolder = 'params';
            break;
        default:
            return (req, res, next) => next();
    }
    return (req, res, next) => {
        for (let index in params) {
            let paramater = params[index];
            if (!req[paramsHolder][paramater]) {
                return res.json({ code: -100, msg: `缺少 ${paramater} 参数.` });
            }
        }
        next();
    }
}

route.post('/project/add',
    genParamChecker('post', ['projectName']), addProject);
route.get('/project/list', listProject);
route.post('/project/done',
    genParamChecker('post', ['id']), doneProject);
route.post('/project/undone',
    genParamChecker('post', ['id']), undoneProject);

route.post('/stamp/add',
    genParamChecker('post', ['nextId']), addStamp);
route.get('/stamp/get', getStamps);

route.post('/contact/add',
    genParamChecker('post', ['firstName', 'lastName', 'email', 'join']), addContact);
route.get('/contact/list', listContact);

module.exports = route;
