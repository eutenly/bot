import Message from "../../classes/Message/Message";
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
import spotifyCommand from "../spotify/main";
import supportCommand from "../support";
import twitterCommand from "../twitter/main";
import viewCommand from "../view";
import websiteCommand from "../website/main";
import wikipediaCommand from "../wikipedia/main";
import youtubeCommand from "../youtube/main";

type CommandModule = (message: Message) => Promise<any>;

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
const SUB_COMMAND = 1;
const SUB_COMMAND_GROUP = 2;
const STRING = 3;
const INTEGER = 4;
const BOOLEAN = 5;
const USER = 6;
const CHANNEL = 7;
const ROLE = 8;

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
            description: "What you'd like to search the web for",
            required: true
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
            description: "What you'd like to search Spotify for",
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
        information: "Navigate between pages",
        description: "When viewing something with multiple pages, use the `next` and `previous` commands to navigate between pages You can also use the `page` command to jump to a page.",
        inputs: ["page", "next", "previous"],
        module: pageCommand,
        parameters: [{
            type: STRING,
            name: "page",
            description: "Do you want to go to the next or previous page?",
            choices: [{
                name: "next",
                value: "next"
            },
            {
                name: "previous",
                value: "previous"
            }],
        }]
    },
    {
        name: "move",
        information: "Move through your recent command history",
        description: "Use the `back` and `forward` commands to navigate through your recently used commands.",
        inputs: ["back", "forward"],
        module: moveCommand,
        parameters: [{
            type: STRING,
            name: "movement",
            description: "Do you want to go back or forward?",
            choices: [{
                name: "back",
                value: "back"
            }, {
                name: "forward",
                value: "forward"
            }],
        }]
    },
    {
        name: "view",
        information: "View more info about a result",
        inputs: ["view", "result", "select"],
        module: viewCommand
    },
    {
        name: "remove",
        information: "Remove a saved link",
        inputs: ["remove"],
        module: removeCommand
    },
    {
        name: "saved-links",
        information: "View your saved links",
        inputs: ["savedlinks", "saved"],
        module: savedLinksCommand
    },
    {
        name: "save",
        information: "Save a link to view later",
        inputs: ["save"],
        module: saveCommand
    },
    {
        name: "set-prefix",
        information: "Set the prefix in the server. You need to be a moderator to use this command",
        inputs: ["setprefix"],
        module: setPrefixCommand
    },
    {
        name: "compact",
        information: "Enable or disable compact mode for a channel. You need to be a moderator to use this command",
        inputs: ["compact"],
        module: compactCommand
    },
    {
        name: "reaction-confirmations",
        information: "Enable or disable reaction confirmations",
        inputs: ["reactionconfirmations", "reactionconfirms", "rc"],
        module: reactionConfirmationsCommand
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
        private: true
    },
    {
        name: "badge",
        information: "Add or remove badges from users",
        inputs: ["badge"],
        module: badgeCommand,
        private: true
    },
    {
        name: "help",
        information: "Help about eutenly",
        inputs: ["help", "h", "?"],
        module: helpCommand
    }
];
