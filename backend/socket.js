import socketIo from "socket.io";
import userModel from "./src/Models/user.model.js"

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true,
        }
    });

    io.on("connection", (socket) => {
        console.log(`🔗 New client connected: ${socket.id}`);

        // Handle user login event
        socket.on("userLogin", async (data) => {
            const {userId, userType } = data;
            console.log(`📥 User login event received for userId: ${userId}, userType: ${userType}`);

            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id }, { new: true })
                console.log(`✅ User socketId updated in MongoDB for userId: ${userId}`);
            }else if(userType === 'host'){
                await userModel.findByIdAndUpdate(userId, { hostSocketId: socket.id }, { new: true })
                console.log(`✅ Host socketId updated in MongoDB for userId: ${userId}`);
            }else{
                console.error(`❌ Invalid userType: ${userType}`);
            }
        })

        socket.on("disconnect", () => {
            console.log(`❌ Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocket = (socketId, messageObject) => {
    console.log(`📬 Sending message to socket ${socketId}:`, messageObject);

    if(io){
        io.to(socketId).emit(messageObject.event, messageObject.data);
    }else{
        console.error("❌ Socket.io not initialized");
    }
}

export default { initializeSocket, sendMessageToSocket };
