import Client from "../Client/Client";
import Embed from "../Embed/Embed";
import Message from "../Message/Message";
import { CommandHistoryEntry, RunCommand } from "../User/User";
import SearchManager from "./SearchManager/SearchManager";
import fetch from "./fetch";
import send from "./send";

export type GetURL = (query?: string, page?: number, nextPageToken?: string) => string;

export type GetData = (query?: string, page?: number, nextPageToken?: string) => Promise<any>;

/**
 * Parser
 *
 * For commands with unordered pages, the return type is expected to have a `data` and `nextPageToken` property
 * The `data` property is what the return data would be for a command with ordered pages
 */
export type Parser = (data: any) => any;

export type GetEmbed = (command: Command, data: any) => Embed;

export type View = (data: any, message: Message) => void;

interface CommandData {
    name: string;
    message: Message;
    webScraper?: Boolean;
    searchQuery?: string;
    orderedPages?: boolean;
    getURL?: GetURL;
    getData?: GetData;
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
    getURL?: GetURL;
    getData?: GetData;
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
    constructor(client: Client, data: CommandData, runCommand: RunCommand, commandHistoryIndex?: number) {

        // Set data
        this.client = client;

        this.name = data.name;
        this.message = data.message;
        this.webScraper = data.webScraper;

        this.getURL = data.getURL;
        this.getData = data.getData;
        this.parser = data.parser;
        this.getEmbed = data.getEmbed;
        this.view = data.view;

        this.data = data.data;

        if (data.searchQuery) this.searchManager = new SearchManager(this, {
            query: data.searchQuery,
            orderedPages: data.orderedPages
        });

        this.expireTimestamp = Date.now() + 180000;

        // Set user's command
        this.message.author.command = this;

        // Remove latest flag from user's command history
        const latestCommand: CommandHistoryEntry | undefined = this.message.author.commandHistory.find((h: CommandHistoryEntry) => h.latest);
        if (latestCommand) delete latestCommand.latest;

        /**
         * Remove newer commands
         *
         * If the user has gone back through their history and then used a command, remove any newer commands
         *
         * [Command 1, 2, 3, 4, 5]
         * Back (command 4)
         * Back (command 3)
         * Back (command 2)
         * New command
         *
         * New command will be command 3, but commands 4 and 5 need to be removed
         */
        if ((latestCommand) && (commandHistoryIndex === undefined)) {

            // Get latest command index
            const latestCommandIndex: number = this.message.author.commandHistory.indexOf(latestCommand);

            // Remove newer commands
            this.message.author.commandHistory.splice(latestCommandIndex + 1, this.message.author.commandHistory.length);
        }

        // Add to user's command history
        const commandHistoryEntry: CommandHistoryEntry = {
            run: runCommand,
            timestamp: Date.now(),
            latest: true
        };

        if (commandHistoryIndex !== undefined) this.message.author.commandHistory[commandHistoryIndex] = commandHistoryEntry;
        else this.message.author.commandHistory.push(commandHistoryEntry);

        // Limit command history to 10 commands
        if (this.message.author.commandHistory.length >= 10) this.message.author.commandHistory.splice(0, this.message.author.commandHistory.length - 10);
    }

    // Fetch this command's data
    fetch = (): Promise<any> => fetch(this);

    // Send or edit the command message
    send = (embed: Embed): Promise<void> => send(this, embed);
}