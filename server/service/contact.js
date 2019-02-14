const { Contact } = require('../model');

const addContact = (req, res) => {
    let { firstName, lastName, email, join } = req.body;
    Contact.create({
        firstName,
        lastName,
        email,
        join,
        date: new Date(),
        isDeleted: false
    })
    .then(result => res.json({ code: 0, msg: 'success', data: result }))
    .catch(error => res.json({ code: -2, msg: 'error', error }))
}

const listContact = (req, res) => {
    Contact.find({}, {__v: 0})
        .then(result => res.json({ code: 0, msg: 'success', data: result }))
        .catch(error => res.json({ code: -2, msg: 'error', error }));
}

module.exports = {
    addContact,
    listContact
}