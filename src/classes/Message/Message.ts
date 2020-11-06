import Channel from "../Channel/Channel";
import Client from "../Client/Client";
import Command from "../Command/Command";
import { EmbedData } from "../Embed/Embed";
import Guild from "../Guild/Guild";
import User from "../User/User";
import addReaction from "./addReaction";
import edit from "./edit";

interface MessageDataAuthor {
    id: string;
    bot: boolean;
}

interface MessageData {
    id: string;
    content: string;
    author: MessageDataAuthor;
    channel: Channel;
    guild: Guild | undefined;
}

export default class Message {

    // The client
    client: Client;

    // Data about the message
    id: string;
    content: string;
    author: User;
    channel: Channel;
    guild: Guild | undefined;

    // The content without the prefix, ie `e;search eutenly` > `search eutenly`
    commandContent: string;

    command?: Command;

    // Constructor
    constructor(client: Client, data: MessageData) {

        // Set data
        this.client = client;

        this.id = data.id;
        this.content = data.content;
        this.author = client.users.get(data.author.id) || new User(client, {
            id: data.author.id,
            bot: data.author.bot
        });
        this.channel = data.channel;
        this.guild = data.guild;

        this.commandContent = this.content.substring(this.channel.prefix.length, this.content.length).trim();
    }

    // Edit message
    edit = (content: string | EmbedData, embed?: EmbedData): Promise<void> => edit(this, content, embed);

    // Add reaction
    addReaction = (emoji: string): Promise<any> => addReaction(this, emoji);
}