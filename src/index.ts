import * as Sentry from "@sentry/node";
import dotenv from "dotenv";
import { terminal } from "terminal-kit";
import Client from "./classes/Client/Client";
import message from "./modules/message";
import reactionAdded from "./modules/reactionAdded";
import reactionRemoved from "./modules/reactionRemoved";
import serverJoin from "./modules/serverJoin";
import serverLeave from "./modules/serverLeave";

// Configure env variables
dotenv.config();

// Enable Sentry
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT,
    tracesSampleRate: 1.0
});

// Clear dev logs
if (process.env.DEV === "true") terminal.up(1).eraseLine().up(1).eraseLine();

// Create client
const client: Client = new Client(process.env.BOT_TOKEN || "");

// Ready
client.on("ready", () => {

    // Log
    terminal.green.bold("Bot online!\n");
});

// Message
client.on("message", message);

// Reaction Added
client.on("messageReactionAdd", reactionAdded);

// Reaction Removed
client.on("messageReactionRemove", reactionRemoved);

// Server Joined
client.on("guildCreate", serverJoin);

// Server Left
client.on("guildDelete", serverLeave);
