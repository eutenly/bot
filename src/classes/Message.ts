import Channel from "./Channel";
import Client from "./Client";
import Guild from "./Guild";

interface MessageData {
    id: string;
    content: string;
    authorID: string;
    channel: Channel;
    guild: Guild | undefined;
}

export default class Message {

    // The client
    client: Client;

    // Data about the message
    id: string;
    content: string;
    authorID: string;
    channel: Channel;
    guild: Guild | undefined;

    // Constructor
    constructor(client: Client, data: MessageData) {

        // Set data
        this.client = client;

        this.id = data.id;
        this.content = data.content;
        this.authorID = data.authorID;
        this.channel = data.channel;
        this.guild = data.guild;
    }
}