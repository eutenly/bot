import * as Sentry from "@sentry/node";
import dotenv from "dotenv";
import { terminal } from "terminal-kit";
import Client from "./classes/Client/Client";
import routeMessage from "./modules/commandRouter/router";
import reactionAdded from "./modules/reactionAdded";
import serverJoin from "./modules/serverJoin";
import serverLeave from "./modules/serverLeave";

// Configure env variables
dotenv.config();

// Enable Sentry
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
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
client.on("message", routeMessage);

// Reaction Added
client.on("messageReactionAdd", reactionAdded);

// Server Joined
client.on("guildCreate", serverJoin);

// Server Left
client.on("guildDelete", serverLeave);
