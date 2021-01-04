import Channel from "../Channel/Channel";
import Client from "../Client/Client";
import { EmbedData } from "../Embed/Embed";
import FetchQueue from "../FetchQueue/FetchQueue";
import Guild from "../Guild/Guild";
import Message from "../Message/Message";
import User from "../User/User";
import respond from "./respond";

interface InteractionData {
    id: string;
    token: string;
    commandID: string;
    parameters: InteractionParameter[];
    user: User;
    channel: Channel;
    guild: Guild | undefined;
}

export interface InteractionParameter {
    name: string;
    value: string | number | boolean;
}

interface InteractionFetchQueue {
    respond: FetchQueue;
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

    // Fetch queues
    fetchQueues: InteractionFetchQueue;

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

        // Set fetch queues
        this.fetchQueues = {
            respond: new FetchQueue(client)
        };
    }

    // Respond
    respond = (content: string | EmbedData, embed?: EmbedData): Promise<Message> => respond(this, content, embed);

    // Uncaches this interaction
    uncache = () => this.channel.interactions.delete(this.id);
}
