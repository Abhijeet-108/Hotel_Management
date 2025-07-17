// socket.js
import { Server } from "socket.io";
import User from "./src/Models/user.model.sql.js";

let io;

export function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("userLogin", async ({ userId, userType }) => {
      console.log(`User login received - ID: ${userId}, Type: ${userType}`);
      try {
        if (userType === "user") {
          await User.update(
            { socketId: socket.id },
            { where: { id: userId } }
          );
          console.log(`User socketId updated for userId: ${userId}`);
        } else if (userType === "host") {
          await User.update(
            { hostSocketId: socket.id },
            { where: { id: userId } }
          );
          console.log(`Host socketId updated for userId: ${userId}`);
        } else {
          console.error(`Invalid userType received: ${userType}`);
        }
      } catch (error) {
        console.error(`Error updating socketId for userId: ${userId}`, error);
      }
    });

    // Socket disconnect handler
    socket.on("disconnect", async () => {
      console.log(`Client disconnected: ${socket.id}`);
      try {
        await User.update(
          { socketId: null },
          { where: { socketId: socket.id } }
        );
        await User.update(
          { hostSocketId: null },
          { where: { hostSocketId: socket.id } }
        );
        console.log(`Cleared socketId from DB for disconnected socket: ${socket.id}`);
      } catch (error) {
        console.error(`Error clearing socketId: ${socket.id}`, error);
      }
    });
  });
}

export function sendMessageToSocket(socketId, messageObject) {
  if (!io) {
    console.error("Socket.io not initialized");
    return;
  }
  console.log(`Sending message to socket ${socketId}:`, messageObject);
  io.to(socketId).emit(messageObject.event, messageObject.data);
}

export default { initializeSocket, sendMessageToSocket };
