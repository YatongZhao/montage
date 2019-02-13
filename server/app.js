const express = require('express');
const app = express();
const route = require('./route');
const MongoDB = require('./db');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const isProd = process.env.NODE_ENV === 'production';

MongoDB.init();
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

isProd || app.use(cors());
app.use('/api', route);
isProd && app.use('', express.static(path.join(__dirname, '../build')));

app.listen(8081, () => {
    console.log('App is now running on port 8081.');
});
