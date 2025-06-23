import dotenv from 'dotenv';
import http from 'http';
import { app } from './app.js';
import connectDB from './db/db.js';
import initializeSocket from '../socket.js'

dotenv.config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app); // Required for Socket.io

initializeSocket(server); // Pass server to socket initializer

connectDB()
.then(() => {
    server.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

    server.on('error', (err) => {
        console.error("❌ Server Error: ", err);
    });

    server.on('close', () => {
        console.log("🛑 Server Closed");
    });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection failed:", err);
    }
);
