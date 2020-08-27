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

    // The guilds the bots in
    guilds: Map<string, Guild>;

    // The channels that are cached
    channels: Map<string, Channel>;

    // Constructor
    constructor(token: string) {

        // Super
        super();

        // Set data
        this.token = token;
        this.sequence = null;

        this.guilds = new Map();
        this.channels = new Map();

        // Connect
        connect(this);
    }

    // Update the sequence
    updateSequence = (sequence: number) => this.sequence = sequence;

    // Make requests to the API
    fetch = (path: string, options?: RequestInit, headers?: object): Promise<{ data: any; rateLimit: RateLimit | undefined; }> => fetch(this, path, options, headers);
}