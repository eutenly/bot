import dotenv from "dotenv";
import { terminal } from "terminal-kit";
import Client from "./classes/Client/Client";
import routeMessage from "./modules/commandRouter/router";

// Configure env variables
dotenv.config();

// Clear dev logs
if (process.env.DEV === "true") terminal.up(1).eraseLine().up(1).eraseLine();

// Create client
const client: Client = new Client(process.env.BOT_TOKEN || "");

// Ready
client.on("ready", () => {

    // Log
    terminal.green.bold("Bot online!\n");
});

client.on("message", (msg) => {
    routeMessage(msg);
});