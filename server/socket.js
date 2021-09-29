export function socketConnect(io, PORT) {
  io.on("connection", (socket) => {
    //Handle connection request
    console.log(`User connection on port ${PORT} : ${socket.id}`);

    //When message recieved emit to all sockets
    socket.on("message", (message) => {
      console.log("this message:" + message + " socketID: " + socket.id);
      io.emit("message", message);
    });
  });
}
