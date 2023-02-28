const express = require('express');
const app = express();

//startup
require('./startup/db')();
require('./startup/routes')(app);
require('./startup/logging')();

// set port
const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Listening on port ${port}...`);});