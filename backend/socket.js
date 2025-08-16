// socket.js
import { Server } from "socket.io";
import User from "./src/Models/user.model.sql.js";
import Property from "./src/Models/property.model.js";

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
            { SocketId: socket.id },
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

    // property created (user type => host)
    socket.on("propertyCreated", async (propertyData) => {
      if (socket.userType !== "host") {
        console.warn(`Unauthorized propertyCreated attempt by userId=${socket.userId}`);
        return;
      }
      try {
        const property = await Property.create(propertyData);

        const propertyWithHost = await Property.findByPk(property.id, {
          include: [{ model: User, as: "Host" }],
        });

        io.emit("propertyCreated", propertyWithHost);

        console.log(`Property created & broadcasted: ${property.id}`);
      } catch (error) {
        console.error("Error creating property:", error);
      }
    });

    // property update (user type => host)
    socket.on("propertyUpdated", async({ propertyId, propertyData }) => {
      if (socket.userType !== "host") {
        console.warn(`Unauthorized propertyUpdated attempt by userId=${socket.userId}`);
        return;
      }

      try {
        const property = await Property.findByPk(propertyId);

        if(!property){
          console.log(`property not found: ${propertyId}`)
          return;
        }
        
        await property.update(propertyData);
        
        const updatedProperty = await Property.findByPk(propertyId, {
          include: [{ model: User, as: "Host" }],
        });

        io.emit("propertyUpdated", { propertyId, propertyData: updatedProperty });

        console.log(`Property ${propertyId} updated successfully`);
      } catch (error) {
        console.error(`Error updating property ${propertyId}:`, error);
      }
    });

    // Property deleted (user type => host)
    socket.on("propertyDeleted", async({ propertyId }) => {
      if (socket.userType !== "host") {
        console.warn(`Unauthorized propertyDeleted attempt by userId=${socket.userId}`);
        return;
      }
      try {
        const property = await Property.findByPk(propertyId);
        if(!property){
          return console.error(`Property not found: ${propertyId}`);
        }
        await property.destroy();
        io.emit("propertyDeleted", { propertyId });
        console.log(`Property ${propertyId} deleted successfully`);
      } catch (error) {
        console.error(`Error deleting property ${propertyId}:`, error);
      }
    });

    // property Booked (user type => user);
    socket.on("propertyBooked", async ({ propertyId, userId }) => {
      try {
        const property = await Property.findByPk(propertyId, {
          include: [{ model: User, as: "Host" }],
        });

        if (!property) {
          console.error(`Property not found: ${propertyId}`);
          return;
        }

        const hostSocketId = property.Host.hostSocketId;

        if (hostSocketId) {
          io.to(hostSocketId).emit("bookingNotification", {
            propertyId,
            bookedBy: userId,
            message: `Your property "${property.title}" has been booked!`,
          });
        }

        console.log(`Booking notification sent for property ${propertyId}`);
      } catch (error) {
        console.error("Error sending booking notification:", error);
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
