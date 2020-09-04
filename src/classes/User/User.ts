import Channel from "../Channel/Channel";
import Client from "../Client/Client";
import Command from "../Command/Command";

interface UserData {
    id: string;
}

export default class User {

    // The client
    client: Client;

    // Data about the user
    id: string;

    // The command this user has used
    command?: Command;

    // Constructor
    constructor(client: Client, data: UserData) {

        // Set data
        this.client = client;

        this.id = data.id;

        // Cache user
        this.client.users.set(this.id, this);
    }

    // Get the DM channel with this user
    getDMChannel = (): Promise<Channel> => this.client.getDMChannel(this.id);
}