import { EventEmitter } from "events";
import { RequestInit } from "node-fetch";
import WebSocket from "ws";
import connect from "../../gateway/socket/connect";
import Channel from "../Channel/Channel";
import Guild from "../Guild/Guild";
import RateLimit from "../common/RateLimit";
import fetch from "./fetch";

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

    // The guilds the bots in
    guilds: Map<string, Guild>;

    // The channels that are cached
    channels: Map<string, Channel>;

    // The names of emojis on the Eutenly support server mapped to their emoji IDs
    eutenlyEmojis: Map<string, string>;

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

        // Connect
        connect(this);

        // SIGINT
        process.on("SIGINT", () => {

            // Close websocket
            if (this.ws) this.ws.close(4020, "Process terminated");

            // Exit
            process.exit();
        });
    }

    // Update the sequence
    updateSequence = (sequence: number) => this.sequence = sequence;

    // Make requests to the API
    fetch = (path: string, options?: RequestInit, headers?: object): Promise<{ data: any; rateLimit: RateLimit | undefined; }> => fetch(this, path, options, headers);
}