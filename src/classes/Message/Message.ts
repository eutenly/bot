import Channel from "../Channel/Channel";
import Client from "../Client/Client";
import Command from "../Command/Command";
import { EmbedData } from "../Embed/Embed";
import Guild from "../Guild/Guild";
import addReaction from "./addReaction";
import edit from "./edit";

interface MessageData {
    id: string;
    content: string;
    authorID: string;
    channel: Channel;
    guild: Guild | undefined;
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

    command?: Command;

    // Constructor
    constructor(client: Client, data: MessageData) {

        // Set data
        this.client = client;

        this.id = data.id;
        this.content = data.content;
        this.authorID = data.authorID;
        this.channel = data.channel;
        this.guild = data.guild;
    }

    // Edit message
    edit = (content: string | EmbedData, embed?: EmbedData): Promise<void> => edit(this, content, embed);

    // Add reaction
    addReaction = (emoji: string): Promise<any> => addReaction(this, emoji);
}