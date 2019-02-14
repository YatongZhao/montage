const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    join: Boolean,
    isDeleted: Boolean,
    date: Date
});

module.exports = {
    contactSchema
}
