// const pgp = require('pg-promise')();

// const dbConfig = {
//   host: process.env.DB_HOST || 'localhost',
//   port: parseInt(process.env.DB_PORT) || 5432,
//   database: process.env.DB_NAME || 'react_admin1',
//   user: process.env.DB_USER || 'postgres',
//   password: process.env.DB_PASSWORD || '123456', // Replace with your actual password
// };

// let db = null;

// const getDb = async () => {
//   if (!db) {
//     db = pgp(dbConfig);
//     try {
//       await db.connect();
//       console.log("Database connected successfully.");
//     } catch (error) {
//       console.error("Failed to connect to the database:", error);
//       throw error;
//     }
//   }
//   return db;
// };

// module.exports = { getDb };