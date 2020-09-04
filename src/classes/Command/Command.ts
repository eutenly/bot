import Client from "../Client/Client";
import Message from "../Message/Message";
import SearchManager, { GetEmbed, GetURL, Parser } from "./SearchManager/SearchManager";

interface CommandData {
    name: string;
    message: Message;
    webScraper?: Boolean;
    searchQuery: string;
    getURL: GetURL;
    parser: Parser;
    getEmbed: GetEmbed;
}

export default class Command {

    // The client
    client: Client;

    // Data about the command
    name: string;
    message: Message;
    responseMessage?: Message;
    webScraper?: Boolean;

    searchManager: SearchManager;

    expireTimestamp: number;

    // Constructor
    constructor(client: Client, data: CommandData) {

        // Set data
        this.client = client;

        this.name = data.name;
        this.message = data.message;
        this.webScraper = data.webScraper;

        this.searchManager = new SearchManager(this, {
            query: data.searchQuery,
            getURL: data.getURL,
            parser: data.parser,
            getEmbed: data.getEmbed
        });

        this.expireTimestamp = Date.now() + 180000;

        // Set user command
        this.message.author.command = this;
    }
}