import Channel from "../Channel/Channel";
import Client from "../Client/Client";
import Command from "../Command/Command";
import { EmbedData } from "../Embed/Embed";
import Guild from "../Guild/Guild";
import User from "../User/User";
import addReaction from "./addReaction";
import edit from "./edit";

interface MessageData {
    id: string;
    content: string;
    author: User;
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

    // The command for this message
    command?: Command;

    // The content without the prefix, ie `e;search eutenly` > `search eutenly`
    commandContent: string;

    // Constructor
    constructor(client: Client, data: MessageData) {

        // Set data
        this.client = client;

        this.id = data.id;
        this.content = data.content;
        this.author = data.author;
        this.channel = data.channel;
        this.guild = data.guild;

        this.commandContent = this.content.substring(this.channel.prefix.length, this.content.length).trim();
    }

    // Edit message
    edit = (content: string | EmbedData, embed?: EmbedData): Promise<void> => edit(this, content, embed);

    // Add reaction
    addReaction = (emoji: string): Promise<any> => addReaction(this, emoji);

    // Uncaches this message
    uncache = () => this.channel.messages.delete(this.id);
}