import dotenv from 'dotenv';
import http from 'http';
import { app } from './app.js';
import connectDB from './db/db.js'; 
import { initDb } from './db/index.js';   
import { initializeSocket } from '../socket.js';

dotenv.config();

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

initializeSocket(server);

(async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");
    
    await initDb();
    console.log("MySQL pool initialized");

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    server.on('error', (err) => {
      console.error("Server error: ", err);
    });

    server.on('close', () => {
      console.log(" Server closed");
    });

  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();


