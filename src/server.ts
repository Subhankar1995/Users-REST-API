import pool from "./db/UserDataBase";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

pool.connect().then(() => {
    console.log("Database connection successful...");
})

const server = app.listen(3000, '127.0.0.1', () => {
    console.log('Server started....');
})

process.on('unhandledRejection', err => {
    console.log("unhandled rejection!!");
    server.close(() => {
        process.exit(1);
    })
})