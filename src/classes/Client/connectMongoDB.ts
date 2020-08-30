import chalk from "chalk";
import mongoose from "mongoose";

export default async function connectMongoDB() {

    // Log
    console.log(chalk.magenta("MongoDB: Connecting..."));

    // Connect
    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.IP}:27017/${process.env.DB_DATABASE}?authSource=${process.env.DB_AUTHENTICATION_DATABASE}`);

    // Log
    console.log(chalk.green("MongoDB: Connected"));
}