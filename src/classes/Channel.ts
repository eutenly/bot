import Client from "./Client";
import Guild from "./Guild";
import Message from "./Message";

interface ChannelData {
    id: string;
    guildID: string;
}

interface MessageData {
    id: string;
    content?: string;
    authorID?: string;
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

    async registerMessage(data: MessageData): Promise<Message> {

        // Already cached
        const cachedMessage: Message | undefined = this.messages.get(data.id);
        if (cachedMessage) return cachedMessage;

        // Message needs to be fetched
        if (!data.content) {

            // Fetch message
            const rawMessage: any = await this.client.fetch(`/channels/${this.id}/messages/${data.id}`);

            // Set data
            data.content = rawMessage.content;
            data.authorID = rawMessage.author.id;
        }

        // Create message
        const message = new Message(this.client, {
            id: data.id,
            content: data.content || "",
            authorID: data.authorID || "",
            channel: this,
            guild: this.guild
        });

        // Cache message
        this.messages.set(message.id, message);

        // Return
        return message;
    };
}