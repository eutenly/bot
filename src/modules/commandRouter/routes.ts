import Message from "../../classes/Message/Message";
import compactCommand from "../compact";
import evalCommand from "../eval";
import githubCommand from "../github/main";
import helpCommand from "../help";
import infoCommand from "../info";
import inviteCommand from "../invite";
import moveCommand from "../move";
import pageCommand from "../page";
import pingCommand from "../ping";
import redditCommand from "../reddit/main";
import removeCommand from "../remove";
import saveCommand from "../save";
import savedLinksCommand from "../savedLinks/main";
import searchCommand from "../search/main";
import spotifyCommand from "../spotify/main";
import supportCommand from "../support";
import twitterCommand from "../twitter/main";
import viewCommand from "../view";
import websiteCommand from "../website/main";
import wikipediaCommand from "../wikipedia/main";
import youtubeCommand from "../youtube/main";

// Define routes
export const routes: CommandRoute[] = [
    {
        name: "Ping",
        information: "Check how responsive the bot is",
        description: "The Ping command let's you make sure the bot is online and can send messages. It will also tell you the connection speed to Discord and to our database.",
        inputs: ["ping"],
        module: pingCommand
    },
    {
        name: "Info",
        information: "View info about Eutenly",
        description: "View info about Eutenly and get some helpful links.",
        inputs: ["info"],
        module: infoCommand
    },
    {
        name: "Website",
        information: "View details about a website",
        description: "Enter a link to view details about any website.",
        inputs: ["website", "websiteinfo", "site", "siteinfo", "web", "webinfo"],
        module: websiteCommand
    },
    {
        name: "Search",
        information: "Search the internet",
        inputs: ["search"],
        module: searchCommand
    },
    {
        name: "YouTube",
        information: "Search YouTube",
        inputs: ["youtube", "yt"],
        module: youtubeCommand
    },
    {
        name: "Twitter",
        information: "Search Twitter",
        inputs: ["twitter", "twt"],
        module: twitterCommand
    },
    {
        name: "Reddit",
        information: "Search Reddit",
        inputs: ["reddit"],
        module: redditCommand
    },
    {
        name: "Spotify",
        information: "Search Spotify",
        inputs: ["spotify", "spt"],
        module: spotifyCommand
    },
    {
        name: "GitHub",
        information: "Search GitHub",
        inputs: ["github", "gh"],
        module: githubCommand
    },
    {
        name: "Wikipedia",
        information: "Search Wikipedia",
        inputs: ["wikipedia", "wiki"],
        module: wikipediaCommand
    },
    {
        name: "Page",
        information: "Navigate between pages",
        description: "When viewing something with multiple pages, use the `next` and `previous` commands to navigate between pages You can also use the `page` command to jump to a page.",
        inputs: ["page", "next", "previous"],
        module: pageCommand
    },
    {
        name: "Move",
        information: "Move through your recent command history",
        description: "Use the `back` and `forward` commands to navigate through your recently used commands.",
        inputs: ["back", "forward"],
        module: moveCommand
    },
    {
        name: "View",
        information: "View more info about a result",
        inputs: ["view", "result", "select"],
        module: viewCommand
    },
    {
        name: "Remove",
        information: "Remove a saved link",
        inputs: ["remove"],
        module: removeCommand
    },
    {
        name: "Saved Links",
        information: "View your saved links",
        inputs: ["savedlinks", "saved"],
        module: savedLinksCommand
    },
    {
        name: "Save",
        information: "Save a link to view later",
        inputs: ["save"],
        module: saveCommand
    },
    {
        name: "Compact",
        information: "Enable or disable compact mode for a channel. You need to be a moderator to use this command",
        inputs: ["compact"],
        module: compactCommand
    },
    {
        name: "Invite",
        information: "Get a link to add Eutenly to your server",
        inputs: ["invite"],
        module: inviteCommand
    },
    {
        name: "Support",
        information: "Join Eutenly's support server",
        inputs: ["support"],
        module: supportCommand
    },
    {
        name: "Eval",
        information: "Owner JavaScript Eval",
        inputs: ["eval"],
        module: evalCommand,
        private: true,
    },
    {
        name: "Help",
        information: "Help about eutenly",
        inputs: ["help", "h", "?"],
        module: helpCommand
    }
];

type CommandModule = (message: Message) => Promise<any>;

export interface BaseCommand {
    inputs: string[];
    module: CommandModule;
    private?: boolean;
}

export interface CommandRoute extends BaseCommand {
    name: string;
    information: string;
    description?: string;
}