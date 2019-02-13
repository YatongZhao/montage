const { Counter } = require('../model');

const getNextSequenceValue = (sequenceName) => {
    return new Promise((resolve, reject) => {
        Counter.findByIdAndUpdate(
            sequenceName,
            { $inc: { sequenceValue: 1} },
            { new: true, upsert: true }
        ).then(res => {
            resolve(res);
        }).catch(error => {
            reject(error);
        })
    })
}

module.exports = { getNextSequenceValue }
