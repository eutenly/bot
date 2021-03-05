import { Client as PGClient } from "pg";
import { terminal } from "terminal-kit";
import Client from "./Client";

export default function connectPostgres(client: Client) {

    // Create client
    client.postgres = new PGClient({
        host: process.env.IP,
        user: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE
    });

    // Connect
    client.postgres.connect();

    // Log
    terminal.green("Connected to Postgres\n\n");
}