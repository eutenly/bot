import Channel from "../Channel/Channel";
import Client from "../Client/Client";
import Guild from "../Guild/Guild";
import Message from "../Message/Message";
import User from "../User/User";
import remove from "./remove";

interface ReactionData {
    id: string;
    name?: string;
    messageID: string;
    user: User;
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
    user: User;
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
        this.user = data.user;

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

    // Remove this reaction
    remove = (): Promise<void> => remove(this);
}