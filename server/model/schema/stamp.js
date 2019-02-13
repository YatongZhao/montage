const mongoose = require('mongoose');

const stampSchema = new mongoose.Schema({
    timeStamp: Number,
    nextId: Number,
    lastId: Number,
    isLast: Boolean
});

module.exports = {
    stampSchema
}