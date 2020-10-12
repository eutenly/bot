import { InfluxDB } from "influx";
import { terminal } from "terminal-kit";
import { InfluxDBSchema } from "../../models/influxdb";
import Client from "./Client";

export default function connectInfluxDB(client: Client) {

    // Connect
    client.influxDB = new InfluxDB({
        host: process.env.IP,
        username: process.env.INFLUXDB_USERNAME,
        password: process.env.INFLUXDB_PASSWORD,
        database: process.env.INFLUXDB_DATABASE,
        schema: InfluxDBSchema
    });

    // Log
    terminal.green("Connected to InfluxDB\n\n");
}