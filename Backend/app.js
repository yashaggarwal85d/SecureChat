const express = require("express");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const http = require("http");
const bodyparser = require("body-parser");
require("dotenv/config");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//router
app.use(bodyparser.json());
const HomeRouter = require("./routes/users");
const RoomRouter = require("./routes/rooms");
app.use("/users", HomeRouter);
app.use("/rooms", RoomRouter);

//socket connects
require("./routes/Socket")(io);

//db
mongoose.connect(
  process.env.DB_CONNECTION_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("db active")
);
var PORT = process.env.PORT || 3000;
server.listen(PORT);
console.log(PORT);
