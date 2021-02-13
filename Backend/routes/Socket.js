module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("connection set up");
    socket.emit("message", "hi");
    socket.broadcast.emit("message", "hello");
    socket.on("disconnect", () => {
      io.emit("message", "fu");
    });
  });
};
