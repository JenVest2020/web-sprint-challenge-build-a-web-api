const express = require('express');
const helmet = require('helmet');
const server = express();
const projectRouter = require('./data/projectRouter.js');
const actionRouter = require('./data/actionRouter.js');

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'This server is online!' });
});

server.use('/api/projects', projectRouter);
server.use('api/actions', actionRouter);


module.exports = server;