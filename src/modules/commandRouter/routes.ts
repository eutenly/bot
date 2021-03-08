import UserRequest from "../../classes/UserRequest/UserRequest";
import badgeCommand from "../badge";
import compactCommand from "../compact";
import debugCommand from "../debug";
import evalCommand from "../eval";
import githubCommand from "../github/main";
import helpCommand from "../help";
import infoCommand from "../info";
import inviteCommand from "../invite";
import moveCommand from "../move";
import pageCommand from "../page";
import pingCommand from "../ping";
import reactionConfirmationsCommand from "../reactionConfirmations";
import redditCommand from "../reddit/main";
import removeCommand from "../remove";
import saveCommand from "../save";
import savedLinksCommand from "../savedLinks/main";
import searchCommand from "../search/main";
import setPrefixCommand from "../setPrefix";
import addCommand from "../spotify/add";
import spotifyCommand from "../spotify/main";
import supportCommand from "../support";
import twitterCommand from "../twitter/main";
import viewCommand from "../view";
import websiteCommand from "../website/main";
import wikipediaCommand from "../wikipedia/main";
import youtubeCommand from "../youtube/main";

type CommandModule = (request: UserRequest) => Promise<any>;

export interface CommandRoute {
    id?: string;
    name: string;
    description?: string;
    information: string;
    inputs: string[];
    private?: boolean;
    module: CommandModule;
    parameters?: CommandParameter[];
}

export interface CommandParameter {
    type: number;
    name: string;
    description: string;
    default?: boolean;
    required?: boolean;
    choices?: CommandChoice[];
}

export interface CommandChoice {
    name: string;
    value: string;
}

// Option types
export const SUB_COMMAND = 1;
export const SUB_COMMAND_GROUP = 2;
export const STRING = 3;
export const NUMBER = 4;
export const BOOLEAN = 5;
export const USER = 6;
export const CHANNEL = 7;
export const ROLE = 8;

// Define routes
export const routes: CommandRoute[] = [
    {
        name: "ping",
        information: "Check how responsive the bot is",
        description: "The Ping command let's you make sure the bot is online and can send messages. It will also tell you the connection speed to Discord and to our database.",
        inputs: ["ping"],
        module: pingCommand
    },
    {
        name: "help",
        information: "Help about Eutenly",
        inputs: ["help"],
        module: helpCommand,
        parameters: [{
            type: STRING,
            name: "module",
            description: "The module you'd like to view"
        }]
    },
    {
        name: "info",
        information: "View info about Eutenly",
        description: "View info about Eutenly and get some helpful links.",
        inputs: ["info"],
        module: infoCommand
    },
    {
        name: "website",
        information: "View details about a website",
        description: "Enter a link to view details about any website.",
        inputs: ["website", "websiteinfo", "site", "siteinfo", "web", "webinfo"],
        module: websiteCommand,
        parameters: [{
            type: STRING,
            name: "link",
            description: "The website link you'd like to visit",
            required: true
        }]
    },
    {
        name: "search",
        information: "Search the internet",
        inputs: ["search"],
        module: searchCommand,
        parameters: [{
            type: STRING,
            name: "search-query",
            description: "What you'd like to search the web for"
        }]
    },
    {
        name: "youtube",
        information: "Search YouTube",
        inputs: ["youtube", "yt"],
        module: youtubeCommand,
        parameters: [{
            type: STRING,
            name: "search-query",
            description: "What you'd like to search YouTube for"
        }]
    },
    {
        name: "twitter",
        information: "Search Twitter",
        inputs: ["twitter", "twt"],
        module: twitterCommand,
        parameters: [{
            type: STRING,
            name: "search-query",
            description: "What you'd like to search Twitter for"
        }]
    },
    {
        name: "reddit",
        information: "Search Reddit",
        inputs: ["reddit"],
        module: redditCommand,
        parameters: [{
            type: STRING,
            name: "search-query",
            description: "What you'd like to search Reddit for"
        }]
    },
    {
        name: "spotify",
        information: "Search Spotify",
        inputs: ["spotify", "spt"],
        module: spotifyCommand,
        parameters: [{
            type: STRING,
            name: "search-query",
            description: "What you'd like to search Spotify for"
        }]
    },
    {
        name: "add",
        information: "Add the Spotify track or episode you're viewing to a playlist",
        inputs: ["add"],
        module: addCommand,
        parameters: [{
            type: STRING,
            name: "playlist",
            description: "The playlist to add the track or episode to",
            required: true
        }]
    },
    {
        name: "github",
        information: "Search GitHub",
        inputs: ["github", "gh"],
        module: githubCommand,
        parameters: [{
            type: STRING,
            name: "search-query",
            description: "What you'd like to search GitHub for"
        }]
    },
    {
        name: "wikipedia",
        information: "Search Wikipedia",
        inputs: ["wikipedia", "wiki"],
        module: wikipediaCommand,
        parameters: [{
            type: STRING,
            name: "search-query",
            description: "What you'd like to search Wikipedia for"
        }]
    },
    {
        name: "page",
        information: "Jump to a page",
        inputs: ["page"],
        module: async (userRequest: UserRequest) => pageCommand(userRequest),
        parameters: [{
            type: NUMBER,
            name: "page",
            description: "The page that you'd like to view",
            required: true
        }]
    },
    {
        name: "next",
        information: "Go to the next page",
        inputs: ["next"],
        module: async (userRequest: UserRequest) => pageCommand(userRequest, "next"),
        parameters: [{
            type: NUMBER,
            name: "amount",
            description: "The amount of pages that you'd like to go forward by"
        }]
    },
    {
        name: "previous",
        information: "Go to the previous page",
        inputs: ["previous"],
        module: async (userRequest: UserRequest) => pageCommand(userRequest, "previous"),
        parameters: [{
            type: NUMBER,
            name: "amount",
            description: "The amount of pages that you'd like to go backwards by"
        }]
    },
    {
        name: "back",
        information: "Go back through your recent command history",
        inputs: ["back"],
        module: async (userRequest: UserRequest) => moveCommand(userRequest, "back")
    },
    {
        name: "forward",
        information: "Go forward through your recent command history",
        inputs: ["forward"],
        module: async (userRequest: UserRequest) => moveCommand(userRequest, "forward")
    },
    {
        name: "view",
        information: "View more info about a result",
        inputs: ["view", "result", "select"],
        module: viewCommand,
        parameters: [{
            type: STRING,
            name: "result",
            required: true,
            description: "The result ID that you'd like to view",
        }]
    },
    {
        name: "remove",
        information: "Remove a saved link",
        inputs: ["remove"],
        module: removeCommand,
        parameters: [{
            type: NUMBER,
            name: "link-number",
            description: "The saved link that you'd like to remove",
            required: true
        }]
    },
    {
        name: "saved-links",
        information: "View your saved links",
        inputs: ["savedlinks", "saved"],
        module: savedLinksCommand,
        parameters: [
            {
                type: STRING,
                name: "search-query",
                description: "What you'd like to search your saved links for"
            },
            {
                type: NUMBER,
                name: "page",
                description: "The page you'd like to view"
            }
        ]
    },
    {
        name: "save",
        information: "Save a link to view later",
        inputs: ["save"],
        module: saveCommand,
        parameters: [{
            type: STRING,
            name: "link-or-result",
            description: "The link or result number that you'd like to save"
        }]
    },
    {
        name: "set-prefix",
        information: "Set the prefix in the server. You need to be a moderator to use this command",
        inputs: ["setprefix"],
        module: setPrefixCommand,
        parameters: [{
            type: STRING,
            name: "prefix",
            description: "The prefix to be set",
            required: true
        }]
    },
    {
        name: "compact",
        information: "Enable or disable compact mode for a channel. You need to be a moderator to use this command",
        inputs: ["compact"],
        module: compactCommand,
        parameters: [
            {
                type: BOOLEAN,
                name: "mode",
                description: "Would you like compact mode on or off?",
                required: true
            },
            {
                type: CHANNEL,
                name: "channel",
                description: "The channel to change the setting in"
            },
            {
                type: BOOLEAN,
                name: "all",
                description: "Whether or not you'd like to affect all channels"
            }
        ]
    },
    {
        name: "reaction-confirmations",
        information: "Enable or disable reaction confirmations",
        inputs: ["reactionconfirmations", "reactionconfirms", "rc"],
        module: reactionConfirmationsCommand,
        parameters: [{
            type: BOOLEAN,
            name: "mode",
            description: "Would you like confirmations on or off?",
            required: true
        }]
    },
    {
        name: "invite",
        information: "Get a link to add Eutenly to your server",
        inputs: ["invite"],
        module: inviteCommand
    },
    {
        name: "support",
        information: "Join Eutenly's support server",
        inputs: ["support"],
        module: supportCommand
    },
    {
        name: "eval",
        information: "Owner JavaScript Eval",
        inputs: ["eval"],
        module: evalCommand,
        private: true
    },
    {
        name: "debug",
        information: "Enable or disable debug mode",
        inputs: ["debug"],
        module: debugCommand,
        private: true,
        parameters: [{
            type: BOOLEAN,
            name: "mode",
            description: "Would you like debug mode on or off?",
            required: true
        }]
    },
    {
        name: "badge",
        information: "Add or remove badges from users",
        inputs: ["badge"],
        module: badgeCommand,
        private: true,
        parameters: [
            {
                type: STRING,
                name: "user",
                description: "The user to modify badges for",
                required: true
            },
            {
                type: BOOLEAN,
                name: "action",
                description: "Whether you'd like to add or remove the badge"
            },
            {
                type: STRING,
                name: "badge",
                description: "The badge you'd like to modify",
                required: true
            }
        ]
    }
];
