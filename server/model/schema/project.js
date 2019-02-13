const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    startTime: Number,
    deadLine: Number,
    planningTime: Number,
    projectName: { type: String, required: true },
    id: { type: Number, required: true },
    done: { type: Boolean, required: true }
});

module.exports = {
    projectSchema
}