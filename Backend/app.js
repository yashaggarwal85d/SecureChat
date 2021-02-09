const express = require("express");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const http = require("http");
const bodyparser = require("body-parser");
require('dotenv/config');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//router
app.use(bodyparser.json());
const HomeRouter = require('./routes/users');
app.use('/users',HomeRouter);

//socket connects
io.on('connection',socket => {
    console.log('connection set up');
});

//db
mongoose.connect(process.env.DB_CONNECTION_URI,
    { useNewUrlParser: true ,useUnifiedTopology: true },
    ()=> console.log('db active')
);
server.listen(3000);