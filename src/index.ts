import dotenv from "dotenv";
import Client from "./classes/Client/Client";

// Configure env variables
dotenv.config();

// Create client
const client: Client = new Client(process.env.BOT_TOKEN || "");