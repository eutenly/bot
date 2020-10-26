import collectStat from "../../util/collectStat";
import Client from "../Client/Client";
import Embed from "../Embed/Embed";
import Message from "../Message/Message";
import User, { CommandHistoryEntry, RunCommand } from "../User/User";
import SearchManager from "./SearchManager/SearchManager";
import fetchData from "./fetchData";
import getConnection from "./getConnection";
import send from "./send";

export type GetURL = (input?: string, page?: number, nextPageToken?: string, user?: User) => string;

export type GetExtraData = (data: any) => string;

export type Fetch = (message: Message, url: string, method?: string, body?: any) => Promise<any>;

export type GetData = (input?: string, page?: number, nextPageToken?: string) => Promise<any>;

export interface ParserData {
    data?: any;
    nextPageToken?: string;
    noData?: boolean;
}

export type Parser = (data: any, extraData?: any[], metadata?: any) => ParserData;

export type GetEmbed = (command: Command, data: any) => Embed;

export interface ViewData {
    module?: Function;
    url?: string;
    error?: string;
}

export type View = (data: any, message: Message, metadata?: any) => ViewData | undefined;

interface CommandData {
    name: string;
    type: string;
    message: Message;
    webScraper?: Boolean;
    input?: string;
    metadata?: any;
    url?: string;
    orderedPages?: boolean;
    getURL?: GetURL;
    getExtraData?: GetExtraData[];
    connectionName?: string;
    helpEmbed?: Embed;
    fetch?: Fetch;
    splitPages?: number;
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
    type: string;
    message: Message;
    responseMessage?: Message;
    webScraper?: Boolean;
    metadata?: any;
    url?: string;

    // A promise for when the connection has loaded
    uninitializedConnection?: Promise<any>;

    // Functions to use this command
    getURL?: GetURL;
    getExtraData?: GetExtraData[];
    connectionName?: string;
    noConnection?: boolean;
    helpEmbed?: Embed;
    fetch?: Fetch;
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
        this.type = data.type;
        this.message = data.message;
        this.webScraper = data.webScraper;
        this.metadata = data.metadata;
        this.url = data.url;
        this.connectionName = data.connectionName;
        this.helpEmbed = data.helpEmbed;

        this.getURL = data.getURL;
        this.getExtraData = data.getExtraData;
        this.fetch = data.fetch;
        this.getData = data.getData;
        this.parser = data.parser;
        this.getEmbed = data.getEmbed;
        this.view = data.view;

        this.data = data.data;

        if (data.input) this.searchManager = new SearchManager(this, {
            input: data.input,
            orderedPages: data.orderedPages,
            splitPages: data.splitPages
        });

        this.expireTimestamp = Date.now() + 180000;

        // Get connection
        this.getConnection();

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

        // Command used
        if (["google", "youtube", "twitter", "spotify", "reddit", "github", "wikipedia"].includes(this.type)) this.message.author.commandUsed(this.type);

        // Collect stats
        collectStat(this.client, {
            measurement: "commands_used",
            tags: {
                dms: this.message.guild ? undefined : true,
                viaHistory: commandHistoryIndex !== undefined ? true : undefined
            },
            fields: {
                command: this.name,
                commandType: this.type
            }
        });
    }

    // Get connection
    getConnection = (): void => getConnection(this);

    // Fetch this command's data
    fetchData = (input?: string, page?: number, nextPageToken?: string | null): Promise<ParserData | undefined> => fetchData(this, input, page, nextPageToken);

    // Send or edit the command message
    send = (embed: Embed): Promise<void> => send(this, embed);
}