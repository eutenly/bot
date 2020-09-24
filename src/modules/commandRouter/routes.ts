import Message from "../../classes/Message/Message";
import evalCommand from "../eval";
import helpCommand from "../help";
import githubCommand from "../github/main";
import infoCommand from "../info";
import inviteCommand from "../invite";
import moveCommand from "../move";
import pageCommand from "../page";
import pingCommand from "../ping";
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
        inputs: ["ping"],
        module: pingCommand,
        private: false
    },
    {
        name: "Info",
        information: "View info about Eutenly",
        inputs: ["info"],
        module: infoCommand,
        private: false
    },
    {
        name: "Website",
        information: "View details about a website",
        inputs: ["website", "websiteinfo", "site", "siteinfo"],
        module: websiteCommand,
        private: false
    },
    {
        name: "Search",
        information: "Search the internet",
        inputs: ["search"],
        module: searchCommand,
        private: false
    },
    {
        name: "YouTube",
        information: "Search YouTube",
        inputs: ["youtube"],
        module: youtubeCommand,
        private: false
    },
    {
        name: "Twitter",
        information: "Search Twitter",
        inputs: ["twitter"],
        module: twitterCommand,
        private: false
    },
    {
        name: "Spotify",
        information: "Search Spotify",
        inputs: ["spotify"],
        module: spotifyCommand,
        private: false
    },
    {
        name: "GitHub",
        information: "Search GitHub",
        inputs: ["github"],
        module: githubCommand,
        private: false
    },
    {
        name: "Wikipedia",
        information: "Search Wikipedia",
        inputs: ["wikipedia"],
        module: wikipediaCommand,
        private: false
    },
    {
        name: "Page",
        information: "Jump to a page",
        inputs: ["page", "next", "previous"],
        module: pageCommand,
        private: false
    },
    {
        name: "Move",
        information: "Move through your recent command history",
        inputs: ["back", "forward"],
        module: moveCommand,
        private: false
    },
    {
        name: "View",
        information: "View more info about a result",
        inputs: ["view", "result"],
        module: viewCommand,
        private: false
    },
    {
        name: "Remove",
        information: "Remove a saved link",
        inputs: ["remove"],
        module: removeCommand,
        private: false
    },
    {
        name: "Saved Links",
        information: "View your saved links",
        inputs: ["savedlinks"],
        module: savedLinksCommand,
        private: false
    },
    {
        name: "Save",
        information: "Save a link to view later",
        inputs: ["save"],
        module: saveCommand,
        private: false
    },
    {
        name: "Invite",
        information: "Get a link to add Eutenly to your server",
        inputs: ["invite"],
        module: inviteCommand,
        private: false
    },
    {
        name: "Support",
        information: "Join Eutenly's support server",
        inputs: ["support"],
        module: supportCommand,
        private: false
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
        module: helpCommand,
        private: false
    }
];

type CommandModule = (message: Message) => Promise<any>;

export interface BaseCommand {
    inputs: string[];
    module: CommandModule;
}

export interface CommandRoute extends BaseCommand {
    name: string;
    information: string;
    private: boolean;
}