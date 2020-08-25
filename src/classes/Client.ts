import { EventEmitter } from "events";
import WebSocket from "ws";
import connect from "../gateway/socket/connect";

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

    // Constructor
    constructor(token: string) {

        // Super
        super();

        // Set data
        this.token = token;
        this.sequence = null;

        // Connect
        connect(this);
    }

    // Update the sequence
    updateSequence(sequence: number) {
        this.sequence = sequence;
    }
}