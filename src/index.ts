import chalk from "chalk";
import dotenv from "dotenv";
import Client from "./classes/Client/Client";

// Configure env variables
dotenv.config();

// Create client
const client: Client = new Client(process.env.BOT_TOKEN || "");

// Ready
client.on("ready", () => {

    // Log
    console.log(chalk.green("Bot online!"));
});