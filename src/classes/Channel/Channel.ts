import Client from "../Client/Client";
import FetchQueue from "../FetchQueue/FetchQueue";
import Guild from "../Guild/Guild";
import Message from "../Message/Message";
import { EmbedData } from "./Embed/Embed";
import registerMessage, { MessageData } from "./registerMessage";
import sendMessage from "./sendMessage";

interface ChannelData {
    id: string;
    guildID: string;
}

interface ChannelFetchQueue {
    sendMessage: FetchQueue;
    addReaction: FetchQueue;
}

export default class Channel {

    // The client
    client: Client;

    // Data about the channel
    id: string;
    guild: Guild | undefined;
    messages: Map<string, Message>;

    // Fetch queues
    fetchQueues: ChannelFetchQueue;

    // Constructor
    constructor(client: Client, data: ChannelData) {

        // Set data
        this.client = client;

        this.id = data.id;
        this.guild = this.client.guilds.get(data.guildID);

        this.messages = new Map();

        // Set fetch queues
        this.fetchQueues = {
            sendMessage: new FetchQueue(client),
            addReaction: new FetchQueue(client)
        };

        // Cache channel
        this.client.channels.set(this.id, this);
    }

    // Register a new message into cache
    registerMessage = (data: MessageData): Promise<Message> => registerMessage(this, data);

    // Send a message
    sendMessage = (content: string | EmbedData, embed?: EmbedData): Promise<Message> => sendMessage(this, content, embed);
}