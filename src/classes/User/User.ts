import Channel from "../Channel/Channel";
import Client from "../Client/Client";
import Command from "../Command/Command";
import Message from "../Message/Message";
import commandUsed from "./commandUsed";
import getConnection from "./getConnection";
import getData from "./getData";
import setReactionConfirmations from "./setReactionConfirmations";

export type RunCommand = (message: Message, commandHistoryIndex: number) => void;

export interface CommandHistoryEntry {
    run: RunCommand;
    timestamp: number;
    latest?: boolean;
}

export interface Connection {
    id?: string;
    accessToken?: string;
    accessSecret?: string;
    refreshToken?: string;
}

interface Connections {
    [index: string]: Connection | undefined;
    twitter?: Connection;
    reddit?: Connection;
    spotify?: Connection;
    github?: Connection;
}

interface StoredUserData {
    reactionConfirmationsDisabled?: boolean;
}

interface UserData {
    id: string;
    tag: string;
    bot: boolean;
    data: StoredUserData;
}

export default class User {

    // The client
    client: Client;

    // Data about the user
    id: string;
    tag: string;
    bot: boolean;
    cooldown: number;

    // The command this user has used
    command?: Command;

    // The users command history
    commandHistory: CommandHistoryEntry[];

    // The users connections
    connections: Connections;

    // Settings
    reactionConfirmationsDisabled?: boolean;

    // Constructor
    constructor(client: Client, data: UserData) {

        // Set data
        this.client = client;

        this.id = data.id;
        this.tag = data.tag; // This is only set when the user is cached
        this.bot = data.bot;
        this.cooldown = 0;

        this.commandHistory = [];

        this.connections = {};

        this.reactionConfirmationsDisabled = data.data.reactionConfirmationsDisabled;

        // Cache user
        this.client.users.set(this.id, this);
    }

    // Check if this user's cooldown is done
    checkCooldown = (): boolean => this.cooldown <= Date.now();

    // Set this users cooldown
    setCooldown = (amount: number) => this.cooldown = Date.now() + amount;

    // Get the DM channel with this user
    getDMChannel = (): Promise<Channel> => this.client.getDMChannel(this.id);

    // Get data
    getData = (upsert?: boolean) => getData(this, upsert);

    // Get a connection
    getConnection = (name: string) => getConnection(this, name);

    // Uncache a connection
    uncacheConnection = (name: string) => delete this.connections[name];

    // Increment a command used stat
    commandUsed = (type: string) => commandUsed(this, type);

    // Set reaction confirmations
    setReactionConfirmations = (enabled: boolean) => setReactionConfirmations(this, enabled);
}