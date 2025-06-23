// socket.js
import { Server } from "socket.io";
import {User} from "./src/Models/user.model.js";

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
    console.log(`🔗 New client connected: ${socket.id}`);

    // Listen for user login
    socket.on("userLogin", async ({ userId, userType }) => {
      console.log(`📥 User login received - ID: ${userId}, Type: ${userType}`);
      try {
        if (userType === "user") {
          await User.findByIdAndUpdate(userId, { socketId: socket.id }, { new: true });
          console.log(`✅ User socketId updated in database for userId: ${userId}`);
        } else if (userType === "host") {
          await User.findByIdAndUpdate(userId, { hostSocketId: socket.id }, { new: true });
          console.log(`✅ Host socketId updated in database for userId: ${userId}`);
        } else {
          console.error(`❌ Invalid userType received: ${userType}`);
        }
      } catch (error) {
        console.error(`❌ Error updating socketId for userId: ${userId}`, error);
      }
    });

    // Disconnect handler
    socket.on("disconnect", async () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
      // try {
      //   await User.updateOne({ socketId: socket.id }, { $unset: { socketId: "" } });
      //   await User.updateOne({ hostSocketId: socket.id }, { $unset: { hostSocketId: "" } });
      // } catch (error) {
      //   console.error(`❌ Error clearing disconnected socketId ${socket.id}`, error);
      // }
    });
  });
}

export function sendMessageToSocket(socketId, messageObject) {
  if (!io) {
    console.error("❌ Socket.io not initialized");
    return;
  }
  console.log(`📬 Sending message to socket ${socketId}:`, messageObject);
  io.to(socketId).emit(messageObject.event, messageObject.data);
}

export default { initializeSocket, sendMessageToSocket };