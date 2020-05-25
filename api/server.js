require('dotenv').config()

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../api/auth/authenticationMiddleware');
const authRouter = require('../api/auth/authRouter');
// const usersRouter = require('../api/users/usersRouter');
// const trucksRouter = require('../api/trucks/trucksRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api', authRouter);
// server.use('/api/jokes', authenticate, jokesRouter);/////////
// server.use("/api/users/", usersRouter);
// server.use('/api/trucks/', trucksRouter);


server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
});

module.exports = server;