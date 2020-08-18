const express = require("express");
// const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const projectsRouter = require("./data/routers/projectsRouter");
const actionsRouter = require("./data/routers/actionsRouter.js");

const server = express();

// This is our middleware
server.use(express.json());
server.use(helmet());
// server.use(morgan("dev"));
server.use(cors());
server.use("/projects", projectsRouter);
server.use("/actions", actionsRouter);

server.get("/api", (req, res) => {
  res.status(200).json({ message: "A  PI Ready." });
});

module.exports = server;