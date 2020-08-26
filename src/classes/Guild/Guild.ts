import Client from "../Client/Client";

interface GuildData {
    id: string;
    joinedAt: Date;
}

export default class Guild {

    // The client
    client: Client;

    // Data about the guild
    id: string;
    joinedAt: Date;

    // Constructor
    constructor(client: Client, data: GuildData) {

        // Set data
        this.client = client;

        this.id = data.id;
        this.joinedAt = data.joinedAt;

        // Cache guild
        this.client.guilds.set(this.id, this);
    }
}