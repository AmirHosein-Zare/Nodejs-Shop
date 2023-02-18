const express = require('express');
const app = express();

// set port
const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Listening on port ${port}...`);});