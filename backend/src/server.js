import dotenv from 'dotenv';
import connectDB from './db/db.js';
import { app } from './app.js';

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server running on PORT: ${process.env.PORT || 8000}`)
    })
    app.on('error', (err) => {
        console.log("Server error: ", err);
    })
    app.on('close', () => {
        console.log("Server Closed...")
    })
})
.catch((err) => {
    console.log("MongoDB connection Failed: ", err);
})