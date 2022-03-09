const express = require('express');
const cors = require('cors');

//start a node server
const app = express();
app.use(express.json())
app.use(cors());

const routes = require('./routes/routes');
app.use('/', routes);

app.listen(3000, () => {
    console.log("server started");
})