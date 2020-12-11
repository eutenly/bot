import Channel, { RawMessage } from "../Channel/Channel";
import Client from "../Client/Client";
import Command from "../Command/Command";
import { EmbedData } from "../Embed/Embed";
import Guild from "../Guild/Guild";
import User from "../User/User";
// import addReaction from "./addReaction";
// import edit from "./edit";
// import getLastMessage from "./getLastMessage";

interface UserRequestData {
    commandName: string;
    parameters: UserRequestParameter[];
    user: User;
    channel: Channel;
    guild: Guild | undefined;
}

interface UserRequestParameter {
    name: string;
    value: string | number;
}

export default class UserRequest {

    // The client
    client: Client;

    // Data about the request
    commandName: string;
    parameters: UserRequestParameter[];
    user: User;
    channel: Channel;
    guild: Guild | undefined;

    command?: Command;

    // Constructor
    constructor(client: Client, data: UserRequestData) {

        // Set data
        this.client = client;

        this.user = data.user;
        this.commandName = data.commandName;
        this.parameters = data.parameters;
        this.channel = data.channel;
        this.guild = data.guild;
    }

    // Edit message
    // edit = (content: string | EmbedData, embed?: EmbedData): Promise<void> => edit(this, content, embed);

    // Add reaction
    // addReaction = (emoji: string): Promise<any> => addReaction(this, emoji);

    /**
     * Get Last Message
     *
     * Gets the last message that has `content`
     * Used for commands like `e;search ^`
     */
    // getLastMessage = (): Promise<RawMessage | undefined> => getLastMessage(this);

    // Uncaches this message
    // uncache = () => this.channel.messages.delete(this.id);
}
