import collectStat from "../../util/collectStat";
import Channel from "../Channel/Channel";
import Client from "../Client/Client";
import Embed from "../Embed/Embed";
import Message from "../Message/Message";
import Reaction from "../Reaction/Reaction";
import User, { CommandHistoryEntry, RunCommand } from "../User/User";
import PageManager from "./PageManager/PageManager";
import fetchData from "./fetchData";
import getConnection from "./getConnection";
import send from "./send";

export interface ViewDataURLData {
    title?: string;
    description?: string;
    url: string;
}

export type ViewDataURL = string | ViewDataURLData;

export type CommandReactionModuleAction = "added" | "removed";

export type CommandReactionModule = (command: Command, user: User, action: CommandReactionModuleAction, reaction?: Reaction) => any;

export interface CommandReaction {
    emoji: string;
    module: CommandReactionModule;
}

export type Fetch = (user: User, channel: Channel, url: string, method?: string, body?: any) => Promise<any>;

export type GetData = (input?: string, page?: number, nextPageToken?: string, user?: User) => string | Promise<any>;

export type GetExtraData = (data: any) => string | Promise<any>;

export interface ParserData {
    data?: any;
    nextPageToken?: string;
}

export type Parser = (data: any, extraData: any[], metadata: any) => ParserData | undefined;

export type GetEmbed = (command: Command, data: any) => Embed;

export interface ViewData {
    module?: Function;
    url?: ViewDataURL;
    error?: string;
}

export type View = (data: any, message: Message, metadata: any) => ViewData | undefined;

interface CommandData {

    // Command name
    name: string;
    category: string;

    // Message
    message: Message;

    // Metadata
    input?: string;
    connectionName?: string;
    webScraper?: boolean;
    metadata?: any;
    url?: ViewDataURL;
    perPage?: number;
    orderedPages?: boolean;
    helpEmbed?: Embed;
    reactions?: CommandReaction[];

    // Data processing
    data?: any;
    fetch?: Fetch;
    getData?: GetData | string;
    getExtraData?: Array<GetExtraData | string>;
    parser?: Parser;
    getEmbed: GetEmbed;
    view?: View;
}

export default class Command {

    // The client
    client: Client;

    // Command name
    name: string;
    category: string;

    // Message
    message: Message;
    responseMessage?: Message;

    // Metadata
    connectionName?: string;
    webScraper?: boolean;
    metadata?: any;
    url?: ViewDataURL;
    helpEmbed?: Embed;
    reactions?: CommandReaction[];

    // A promise for when the connection has loaded
    uninitializedConnection?: Promise<any>;
    noConnection?: boolean;

    // Data processing
    fetch?: Fetch;
    getData?: GetData | string;
    getExtraData?: Array<GetExtraData | string>;
    parser?: Parser;
    getEmbed: GetEmbed;
    view?: View;

    // The result of this command
    data?: any;

    // Whether or not compact mode is enabled
    compactMode: boolean;

    // The page manager for paginated commands
    pageManager?: PageManager;

    // When this command expires
    expireTimestamp: number;

    // Constructor
    constructor(client: Client, data: CommandData, runCommand: RunCommand, commandHistoryIndex?: number) {

        // Set data
        this.client = client;

        this.name = data.name;
        this.category = data.category;

        this.message = data.message;

        this.connectionName = data.connectionName;
        this.webScraper = data.webScraper;
        this.metadata = data.metadata;
        this.url = data.url;
        this.helpEmbed = data.helpEmbed;
        this.reactions = data.reactions;

        this.data = data.data;
        this.fetch = data.fetch;
        this.getData = data.getData;
        this.getExtraData = data.getExtraData;
        this.parser = data.parser;
        this.getEmbed = data.getEmbed;
        this.view = data.view;

        /**
         * Set Compact Mode
         *
         * If the setting is set, use that
         * If the channel name includes `bot` or `command`, we know that the default should be `false`
         * Otherwise, default to `true`
         */
        const compactModeByName: boolean = !(["bot", "command"].find((i: string) => this.message.guild?.channelNames.get(this.message.channel.id)?.includes(i)));
        this.compactMode = this.message.channel.compactMode === undefined ? compactModeByName : this.message.channel.compactMode;

        // Create page manager
        if ((data.input) && (data.perPage)) this.pageManager = new PageManager(this, {
            input: data.input,
            perPage: data.perPage,
            orderedPages: data.orderedPages
        });

        // Set expire timestamp
        this.expireTimestamp = Date.now() + 180000;

        // Set cooldown
        this.message.author.setCooldown(this.webScraper ? 4000 : 2000);

        // Get connection
        getConnection(this);

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
        if (["google", "youtube", "twitter", "spotify", "reddit", "github", "wikipedia"].includes(this.category)) this.message.author.commandUsed(this.category);

        // Collect stats
        collectStat(this.client, {
            measurement: "commands_used",
            tags: {
                dms: this.message.guild ? undefined : true,
                viaHistory: commandHistoryIndex !== undefined ? true : undefined
            },
            fields: {
                command: this.name,
                commandType: this.category
            }
        });
    }

    // Fetch this command's data
    fetchData = (input?: string, page?: number, nextPageToken?: string | null): Promise<ParserData | undefined> => fetchData(this, input, page, nextPageToken);

    // Send or edit the command message
    send = (embed: Embed) => send(this, embed);
}