import Client from "../Client/Client";
import Message from "../Message/Message";
import SearchManager, { CachedResult, GetEmbed, GetURL, Parser } from "./SearchManager/SearchManager";

export type View = (cachedResult: CachedResult, message: Message) => void;

interface CommandData {
    name: string;
    message: Message;
    webScraper?: Boolean;
    searchQuery: string;
    getURL: GetURL;
    parser: Parser;
    getEmbed: GetEmbed;
    view: View;
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

    view: View;

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

        this.view = data.view;

        this.expireTimestamp = Date.now() + 180000;

        // Set user command
        this.message.author.command = this;
    }
}