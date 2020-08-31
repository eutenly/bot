import { EventEmitter } from "events";
import mongoose from "mongoose";
import { RequestInit } from "node-fetch";
import { Terminal } from "terminal-kit";
import WebSocket from "ws";
import connect from "../../gateway/socket/connect";
import Channel from "../Channel/Channel";
import FetchQueue from "../FetchQueue/FetchQueue";
import Guild from "../Guild/Guild";
import RateLimit from "../common/RateLimit";
import connectMongoDB from "./connectMongoDB";
import fetch from "./fetch";
import activateGarbageCollection from "./garbageCollector";
import getDMChannel from "./getDMChannel";

interface ClientFetchQueue {
    getDMChannel: FetchQueue;
}

export default class Client extends EventEmitter {

    // The bots token
    token: string;

    // The websocket between the client and Discord
    ws: WebSocket;

    // The last sequence number from Discord
    sequence: number | null;

    // Data about the client
    id: string;
    avatarURL: string;
    sessionID: string | undefined;

    // Guilds that haven't become available yet
    // A map is used instead of an array since we need to index by guild ID
    loadingGuilds: Map<string, void> | undefined;
    loadingGuildsProgressBar: Terminal.ProgressBarController;

    // The guilds the bots in
    guilds: Map<string, Guild>;
    eutenland: Guild;

    // The channels that are cached
    channels: Map<string, Channel>;

    // The names of emojis on the Eutenland server mapped to their emoji IDs
    eutenlyEmojis: Map<string, string>;

    // Fetch queues
    fetchQueues: ClientFetchQueue;

    // Constructor
    constructor(token: string) {

        // Super
        super();

        // Set data
        this.token = token;
        this.sequence = null;

        this.loadingGuilds = new Map();
        this.guilds = new Map();
        this.channels = new Map();

        this.eutenlyEmojis = new Map();

        // Set fetch queues
        this.fetchQueues = {
            getDMChannel: new FetchQueue(this)
        };

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

        // Activate the Garbage Collector
        activateGarbageCollection(this);

        // Connect to Discord
        connect(this);
    };

    // Update the sequence
    updateSequence = (sequence: number) => this.sequence = sequence;

    // Make requests to the API
    fetch = (path: string, options?: RequestInit, headers?: object): Promise<{ data: any; rateLimit: RateLimit | undefined; }> => fetch(this, path, options, headers);

    // Get a DM channel
    getDMChannel = (userID: string): Promise<Channel> => getDMChannel(this, userID);
}