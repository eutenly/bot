import Channel from "../Channel/Channel";
import Client from "../Client/Client";
import FetchQueue from "../FetchQueue/FetchQueue";
import Guild from "../Guild/Guild";
import addReaction from "./addReaction";

interface MessageData {
    id: string;
    content: string;
    authorID: string;
    channel: Channel;
    guild: Guild | undefined;
}

interface MessageFetchQueue {
    addReaction: FetchQueue;
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

    // Fetch queues
    fetchQueues: MessageFetchQueue;

    // Constructor
    constructor(client: Client, data: MessageData) {

        // Set data
        this.client = client;

        this.id = data.id;
        this.content = data.content;
        this.authorID = data.authorID;
        this.channel = data.channel;
        this.guild = data.guild;

        // Set fetch queues
        this.fetchQueues = {
            addReaction: new FetchQueue(client)
        };
    }

    addReaction = (emoji: string): Promise<any> => addReaction(this, emoji);
}