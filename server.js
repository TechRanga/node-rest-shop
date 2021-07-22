const http = require('http');
require('dotenv').config({path:'./config/config.env'});
const app = require('./app');

const server = http.createServer(app);
server.listen(process.env.PORT);
