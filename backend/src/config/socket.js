const { Server } = require("socket.io");

let io;

exports.initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  return io;
};

exports.getIO = () => {
  if (!io) {
    throw new Error("Socket not initialized");
  }
  return io;
};