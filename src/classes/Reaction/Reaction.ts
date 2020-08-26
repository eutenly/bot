import Channel from "../Channel/Channel";
import Client from "../Client/Client";
import Guild from "../Guild/Guild";
import Message from "../Message/Message";

interface ReactionData {
    id: string;
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
    uninitializedMessage: Promise<Message>;
    message: Message;
    userID: string;
    channel: Channel;
    guild: Guild | undefined;

    // Constructor
    constructor(client: Client, data: ReactionData) {

        // Set data
        this.client = client;

        this.id = data.id;
        this.userID = data.userID;

        // Get channel
        this.channel = this.client.channels.get(data.channelID) || new Channel(client, {
            id: data.channelID,
            guildID: data.guildID
        });

        this.guild = this.channel.guild;

        // Register message
        this.uninitializedMessage = this.channel.registerMessage({
            id: data.messageID
        });
        this.uninitializedMessage.then((m: Message) => this.message = m);
    }
}