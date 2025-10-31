// const Server = require("socket.io").Server;

// const http = require("http");

// const express = require("express");

// const app = express();

// //socket server will be working on top of the main server
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", //frontend url
//     methods: ["GET", "POST"],
//   },
// });

// const userSocketMap = {}; //userid->socketid

// io.on("connection", (socket) => {
//   //socket ke andar user ki id aa jayegi
//   console.log("User connected:", socket.id);
//   const userId = socket.handshake.query.userId;
//   if (userId !== undefined) {
//     userSocketMap[userId] = socket.id;
//   }
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// module.exports = { server, io, app };
const { Server } = require("socket.io");

let io = null;
const userSocketMap = {}; // userId -> socketId

const initSocket = (httpServer) => {
  if (io) return io; // already initialized

  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("✅ User connected:", socket.id, "for user:", userId);

    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", (reason) => {
      console.log("❌ User disconnected:", socket.id, "Reason:", reason);

      // Find which user had this socket ID and remove it
      for (const [id, sId] of Object.entries(userSocketMap)) {
        if (sId === socket.id) {
          delete userSocketMap[id];
          break;
        }
      }

      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};

const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

const getIo = () => io;

module.exports = { initSocket, getReceiverSocketId, getIo };
