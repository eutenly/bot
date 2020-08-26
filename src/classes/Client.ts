import { EventEmitter } from "events";
import fetch from "node-fetch";
import WebSocket from "ws";
import connect from "../gateway/socket/connect";
import Channel from "./Channel";
import Guild from "./Guild";

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
    updateSequence(sequence: number) {
        this.sequence = sequence;
    }

    // Fetch
    async fetch(path: string): Promise<any> {

        // Make request
        const result = await fetch(`https://discord.com/api/v6${path}`, {
            headers: {
                "Authorization": `Bot ${this.token}`
            }
        });

        // Parse result
        const data: any = await result.json();

        // Return
        return data;
    }
}