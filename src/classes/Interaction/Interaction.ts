import Channel, { RawMessage } from "../Channel/Channel";
import Client from "../Client/Client";
import Command from "../Command/Command";
import { EmbedData } from "../Embed/Embed";
import Guild from "../Guild/Guild";
import User from "../User/User";

interface InteractionData {
    id: string;
    token: string;
    commandID: string;
    parameters: InteractionParameter[];
    user: User;
    channel: Channel;
    guild: Guild | undefined;
}

interface InteractionParameter {
    name: string;
    value: string | number;
}

export default class Interaction {

    // The client
    client: Client;

    // Data about the interaction
    id: string;
    token: string;
    commandID: string;
    parameters: InteractionParameter[];
    user: User;
    channel: Channel;
    guild: Guild | undefined;

    command?: Command;

    // Constructor
    constructor(client: Client, data: InteractionData) {

        // Set data
        this.client = client;

        this.id = data.id;
        this.token = data.token;
        this.user = data.user;
        this.commandID = data.commandID;
        this.parameters = data.parameters;
        this.channel = data.channel;
        this.guild = data.guild;
    }

    // Uncaches this message
    uncache = () => this.channel.messages.delete(this.id);
}
