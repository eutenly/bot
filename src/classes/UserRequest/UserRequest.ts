import Channel from "../Channel/Channel";
import Client from "../Client/Client";
import Command from "../Command/Command";
import { EmbedData } from "../Embed/Embed";
import Guild from "../Guild/Guild";
import Interaction from "../Interaction/Interaction";
import Message from "../Message/Message";
import User from "../User/User";
import reply from "./reply";

interface UserRequestData {
    commandName: string;
    parameters: UserRequestParameter[];
    source: Message | Interaction;
    user: User;
    channel: Channel;
    guild: Guild | undefined;
}

export interface UserRequestParameter {
    name: string;
    value?: string | number;
}

export default class UserRequest {

    // The client
    client: Client;

    // Data about the request
    commandName: string;
    parameters: UserRequestParameter[];
    source: Message | Interaction;
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
        this.source = data.source;
        this.channel = data.channel;
        this.guild = data.guild;
    }

    // Reply
    reply = (content: string | EmbedData, embed?: EmbedData): Promise<Message> => reply(this, content, embed);
}
