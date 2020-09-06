import Client from "../Client/Client";
import Embed from "../Embed/Embed";
import Message from "../Message/Message";
import SearchManager, { GetURL } from "./SearchManager/SearchManager";
import send from "./send";

export type Parser = (data: any) => any;

export type GetEmbed = (command: Command, data: any) => Embed;

export type View = (data: any, message: Message) => void;

interface CommandData {
    name: string;
    message: Message;
    webScraper?: Boolean;
    searchQuery?: string;
    getURL?: GetURL;
    data?: any;
    parser?: Parser;
    getEmbed: GetEmbed;
    view?: View;
}

export default class Command {

    // The client
    client: Client;

    // Data about this command
    name: string;
    message: Message;
    responseMessage?: Message;
    webScraper?: Boolean;

    // Functions to use this command
    parser?: Parser;
    getEmbed: GetEmbed;
    view?: View;

    // The result of this command
    data?: any;

    // The search manager for search based commands
    searchManager?: SearchManager;

    // When this command expires
    expireTimestamp: number;

    // Constructor
    constructor(client: Client, data: CommandData) {

        // Set data
        this.client = client;

        this.name = data.name;
        this.message = data.message;
        this.webScraper = data.webScraper;

        this.parser = data.parser;
        this.getEmbed = data.getEmbed;
        this.view = data.view;

        this.data = data.data;

        if ((data.searchQuery) && (data.getURL)) this.searchManager = new SearchManager(this, {
            query: data.searchQuery,
            getURL: data.getURL
        });

        this.expireTimestamp = Date.now() + 180000;

        // Set user command
        this.message.author.command = this;
    }

    // Send or edit the command message
    send = (embed: Embed): Promise<void> => send(this, embed);
}