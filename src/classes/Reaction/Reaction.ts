import Channel from "../Channel/Channel";
import Client from "../Client/Client";
import Guild from "../Guild/Guild";
import Message from "../Message/Message";

interface ReactionData {
    id: string;
    name?: string;
    messageID: string;
    userID: string;
    channelID: string;
    guildID: string;
}

export default class Reaction {

    // The client
    client: Client;

    // Data about the reaction
    id: string;
    name?: string;
    uninitializedMessage: Promise<any>;
    message: Message;
    userID: string;
    channel: Channel;
    guild: Guild | undefined;

    // Whether or not construction for this reaction failed
    // This will be true if the bot doesn't have permissions to read message history to register the message
    constructionFailed: boolean;

    // Constructor
    constructor(client: Client, data: ReactionData) {

        // Set data
        this.client = client;

        this.id = data.id;
        this.name = data.name;
        this.userID = data.userID;

        // Get channel
        this.channel = this.client.channels.get(data.channelID) || new Channel(client, {
            id: data.channelID,
            guildID: data.guildID
        });

        this.guild = this.channel.guild;

        // Register message
        this.constructionFailed = false;
        this.uninitializedMessage = this.channel.registerMessage({
            id: data.messageID
        }).then((m: Message) => this.message = m).catch(() => this.constructionFailed = true);
    }
}