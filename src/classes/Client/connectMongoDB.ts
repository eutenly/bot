import mongoose from "mongoose";
import { terminal } from "terminal-kit";

export default async function connectMongoDB() {

    // Log
    const start = Date.now();
    terminal.magenta.bold("MongoDB: Connecting...\n");

    // Connect
    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.IP}:27017/${process.env.DB_DATABASE}?authSource=${process.env.DB_AUTHENTICATION_DATABASE}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // Log
    terminal.column(1).up(1).right("MongoDB: Connecting".length)(" - ").green(`Done! (${Date.now() - start}ms)\n\n`);
}