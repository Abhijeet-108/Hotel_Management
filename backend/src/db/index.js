// Models/index.js
import sequelize from '../db/db.sql.js';
import User from '../Models/user.model.sql.js';

// Add any future models here
const db = {
  sequelize,
  User,
};

// Optionally sync models here or from server.js
const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log(" MySQL connected.");

    await sequelize.sync(); 
    console.log(" All models synced successfully.");
  } catch (error) {
    console.error(" Database sync failed:", error);
    process.exit(1);
  }
};

export { db, initDb };