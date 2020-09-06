import Channel from "../Channel/Channel";
import Client from "../Client/Client";
import Command from "../Command/Command";
import Message from "../Message/Message";

export type RunCommand = (message: Message, commandHistoryIndex: number) => void;

export interface CommandHistoryEntry {
    run: RunCommand;
    timestamp: number;
    latest?: boolean;
}

interface UserData {
    id: string;
}

export default class User {

    // The client
    client: Client;

    // Data about the user
    id: string;
    cooldown: number;

    // The command this user has used
    command?: Command;

    // The users command history
    commandHistory: CommandHistoryEntry[];

    // Constructor
    constructor(client: Client, data: UserData) {

        // Set data
        this.client = client;

        this.id = data.id;
        this.cooldown = 0;

        this.commandHistory = [];

        // Cache user
        this.client.users.set(this.id, this);
    }

    // Check if this user's cooldown is done
    checkCooldown = (): boolean => this.cooldown <= Date.now();

    // Set this users cooldown
    setCooldown = (amount: number) => this.cooldown = Date.now() + amount;

    // Get the DM channel with this user
    getDMChannel = (): Promise<Channel> => this.client.getDMChannel(this.id);
}