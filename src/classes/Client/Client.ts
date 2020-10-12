import { EventEmitter } from "events";
import { google, youtube_v3 } from "googleapis";
import { InfluxDB } from "influx";
import mongoose from "mongoose";
import { RequestInit } from "node-fetch";
import { Terminal } from "terminal-kit";
import WebSocket from "ws";
import connect from "../../gateway/socket/connect";
import Channel from "../Channel/Channel";
import FetchQueue from "../FetchQueue/FetchQueue";
import Guild from "../Guild/Guild";
import User from "../User/User";
import RateLimit from "../common/RateLimit";
import connectInfluxDB from "./connectInfluxDB";
import connectMongoDB from "./connectMongoDB";
import fetch from "./fetch";
import activateGarbageCollection from "./garbageCollector";
import getDMChannel from "./getDMChannel";
import leaveGuild from "./leaveGuild";
import resourceUsage from "./resourceUsage";

export interface ServerData {
    prefix?: string;
}

export interface EventQueueEvent {
    type: string;
    data: any;
}

interface ClientFetchQueue {
    getDMChannel: FetchQueue;
    leaveGuild: FetchQueue;
}

export default class Client extends EventEmitter {

    // The bot's token
    token: string;

    // The websocket between the client and Discord
    ws: WebSocket;

    // The client's ping
    ping: number;
    lastPingTimestamp: number;
    pingInterval: NodeJS.Timeout;

    // The last sequence number from Discord
    sequence: number | null;

    // Data about the client
    id: string;
    avatarURL: string;
    sessionID: string | undefined;

    // The InfluxDB connection
    influxDB: InfluxDB;

    // Whether or not the client is ready to handle events from Discord
    ready: boolean;
    eventQueue: EventQueueEvent[];

    // Guilds that haven't become available yet
    // A map is used instead of an array since we need to index by guild ID
    loadingGuilds: Map<string, ServerData> | undefined;
    loadingGuildsProgressBar: Terminal.ProgressBarController;

    // The guilds the bots in
    guilds: Map<string, Guild>;
    eutenland: Guild;

    // The channels that are cached
    channels: Map<string, Channel>;
    serverJoinLeave: Channel;

    // Users mapped to their command
    users: Map<string, User>;

    // The names of emojis on the Eutenland server mapped to their emoji IDs
    eutenlyEmojis: Map<string, string>;

    // Fetch queues
    fetchQueues: ClientFetchQueue;

    // The youtube client
    youtube: youtube_v3.Youtube;

    // Constructor
    constructor(token: string) {

        // Super
        super();

        // Set data
        this.token = token;
        this.sequence = null;

        this.eventQueue = [];

        this.loadingGuilds = new Map();
        this.guilds = new Map();
        this.channels = new Map();

        this.users = new Map();

        this.eutenlyEmojis = new Map();

        // Set fetch queues
        this.fetchQueues = {
            getDMChannel: new FetchQueue(this),
            leaveGuild: new FetchQueue(this)
        };

        // Set youtube client
        this.youtube = google.youtube({ version: "v3", auth: process.env.YOUTUBE_API_KEY });

        // Connect
        this.connect();

        // SIGINT
        process.on("SIGINT", async () => {

            // Close websocket
            if (this.ws) this.ws.close(4020, "Process terminated");

            // Disconnect from MongoDB
            await mongoose.disconnect();

            // Exit
            process.exit();
        });
    }

    connect = async () => {

        // Connect to MongoDB
        await connectMongoDB();

        // Connect to InfluxDB
        connectInfluxDB(this);

        // Activate the Garbage Collector
        activateGarbageCollection(this);

        // Connect to Discord
        connect(this);

        // Resource usage
        resourceUsage(this);
    };

    // Update the sequence
    updateSequence = (sequence: number) => this.sequence = sequence;

    // Make requests to the API
    fetch = (path: string, options?: RequestInit, headers?: object): Promise<{ data: any; rateLimit: RateLimit | undefined; }> => fetch(this, path, options, headers);

    // Get a DM channel
    getDMChannel = (userID: string): Promise<Channel> => getDMChannel(this, userID);

    // Leave a guild
    leaveGuild = (guild: Guild, reason?: string): Promise<void> => leaveGuild(this, guild, reason);
}