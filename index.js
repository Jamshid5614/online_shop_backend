const express = require('express');
const winston = require('winston');
const app = express();
const PORT = process.env.PORT || 5000;

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();


app.listen(PORT,() => {
    console.log(`application run on ${PORT} port`);
});