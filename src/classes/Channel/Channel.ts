import Client from "../Client/Client";
import Guild from "../Guild/Guild";
import Message from "../Message/Message";
import { EmbedData } from "./Embed/Embed";
import registerMessage, { MessageData } from "./registerMessage";
import sendMessage from "./sendMessage";

interface ChannelData {
    id: string;
    guildID: string;
}

export default class Channel {

    // The client
    client: Client;

    // Data about the channel
    id: string;
    guild: Guild | undefined;
    messages: Map<string, Message>;

    // Constructor
    constructor(client: Client, data: ChannelData) {

        // Set data
        this.client = client;

        this.id = data.id;
        this.guild = this.client.guilds.get(data.guildID);

        this.messages = new Map();

        // Cache channel
        this.client.channels.set(this.id, this);
    }

    registerMessage = (data: MessageData): Promise<Message> => registerMessage(this, data);
    sendMessage = (content?: string, embed?: EmbedData): Promise<Message> => sendMessage(this, content, embed);
}