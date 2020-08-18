  
const express = require("express");
const helmet = require("helmet");

const projects = require("./data/projects/index");
const actions = require("./data/projects/index");

const server = express();
server.use(express.json());
server.use(helmet());

server.use("/projects", projects);
server.use("/actions", actions);

server.listen(5000, () => {
    console.log("Listening on port 5000");
})

// const express = require('express');

// const projects = require('./data/projects');
// const actions = require('./data/actions');


// const server = express();
// server.use(express.json());

// server.use('/api/projects', projects);
// server.use('/api/actions', actions);

// server.listen(5000, () => {
//   console.log("listening on port 5000");
// });