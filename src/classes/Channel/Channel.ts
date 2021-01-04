import Client from "../Client/Client";
import { EmbedData } from "../Embed/Embed";
import FetchQueue from "../FetchQueue/FetchQueue";
import Guild from "../Guild/Guild";
import Interaction from "../Interaction/Interaction";
import Message from "../Message/Message";
import fetchMessage from "./fetchMessage";
import fetchMessages, { FetchMessagesOptions } from "./fetchMessages";
import getLastMessage from "./getLastMessage";
import registerInteraction, { InteractionData } from "./registerInteraction";
import registerMessage, { MessageData } from "./registerMessage";
import sendMessage from "./sendMessage";

interface RawMessageAuthor {
    id: string;
    username: string;
    discriminator: string;
    bot?: boolean;
}

export interface RawMessage {
    id: string;
    content: string;
    author: RawMessageAuthor;
}

interface ChannelData {
    id: string;
    guildID?: string;
}

interface ChannelFetchQueue {
    sendMessage: FetchQueue;
    addReaction: FetchQueue;
    removeReaction: FetchQueue;
    fetchMessage: FetchQueue;
    fetchMessages: FetchQueue;
}

export default class Channel {

    // The client
    client: Client;

    // Data about the channel
    id: string;
    guild: Guild | undefined;
    messages: Map<string, Message>;
    interactions: Map<string, Interaction>;

    // Prefix
    get prefix(): string {
        return (this.guild?.prefix || process.env.DEFAULT_PREFIX) as string;
    }

    // Fetch queues
    fetchQueues: ChannelFetchQueue;

    // Compact mode
    get compactMode(): boolean | undefined {
        return this.guild ? this.guild.compactMode.get(this.id) : false;
    }

    // Constructor
    constructor(client: Client, data: ChannelData) {

        // Set data
        this.client = client;

        this.id = data.id;
        if (data.guildID) this.guild = this.client.guilds.get(data.guildID);

        this.messages = new Map();
        this.interactions = new Map();

        // Set fetch queues
        this.fetchQueues = {
            sendMessage: new FetchQueue(client),
            addReaction: new FetchQueue(client),
            removeReaction: new FetchQueue(client),
            fetchMessage: new FetchQueue(client),
            fetchMessages: new FetchQueue(client)
        };

        // Cache channel
        this.client.channels.set(this.id, this);
    }

    // Register a new message into cache
    registerMessage = (data: MessageData): Promise<Message> => registerMessage(this, data);

    // Register a new interaction into cache
    registerInteraction = (data: InteractionData): Promise<Interaction> => registerInteraction(this, data);

    // Send a message
    sendMessage = (content: string | EmbedData, embed?: EmbedData): Promise<Message> => sendMessage(this, content, embed);

    // Fetch a message from this channel
    fetchMessage = (messageID: string): Promise<RawMessage> => fetchMessage(this, messageID);

    // Fetch messages from this channel
    fetchMessages = (options?: FetchMessagesOptions): Promise<RawMessage[]> => fetchMessages(this, options);

    /**
     * Get Last Message
     *
     * Gets the last message that has `content`
     * Used for commands like `e;search ^`
     */
    getLastMessage = (messageOrInteraction: Message | Interaction): Promise<RawMessage | undefined> => getLastMessage(this, messageOrInteraction);
}