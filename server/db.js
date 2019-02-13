const mongoose = require('mongoose');
const url = require('../passport.conf.js').DB_URL;

module.exports = {
    init () {
        mongoose.connect(url, { useNewUrlParser: true, autoIndex: true });

        let db = mongoose.connection;
        db.on('connected', () => console.log('database connected.'));
        db.on('error', err => console.log('connection failed.', err));
        db.on('disconnected', () => console.log('connection disconnected.'));
    }
}
