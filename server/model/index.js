const mongoose = require('mongoose');
const { projectSchema } = require('./schema/project');
const { stampSchema } = require('./schema/stamp');
const { counterSchema } = require('./schema/counter');
const { contactSchema } = require('./schema/contact');

const Project = mongoose.model('Project', projectSchema);
const Stamp = mongoose.model('Stamp', stampSchema);
const Counter = mongoose.model('Counter', counterSchema);
const Contact = mongoose.model('Contact', contactSchema);

module.exports = {
    Project,
    Stamp,
    Counter,
    Contact
}
