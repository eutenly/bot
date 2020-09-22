import Message from "../../classes/Message/Message";
import evalCommand from "../eval";
import githubCommand from "../github/main";
import infoCommand from "../info";
import inviteCommand from "../invite";
import moveCommand from "../move";
import pageCommand from "../page";
import pingCommand from "../ping";
import saveCommand from "../save";
import searchCommand from "../search/main";
import spotifyCommand from "../spotify/main";
import supportCommand from "../support";
import twitterCommand from "../twitter/main";
import viewCommand from "../view";
import websiteCommand from "../website/main";
import youtubeCommand from "../youtube/main";

// Define routes
export const routes: CommandRoute[] = [
    {
        name: "Ping",
        information: "Check how responsive the bot is",
        inputs: ["ping"],
        module: pingCommand
    },
    {
        name: "Info",
        information: "View info about Eutenly",
        inputs: ["info"],
        module: infoCommand
    },
    {
        name: "Website",
        information: "View details about a website",
        inputs: ["website", "websiteinfo", "site", "siteinfo"],
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
        inputs: ["youtube"],
        module: youtubeCommand
    },
    {
        name: "Twitter",
        information: "Search Twitter",
        inputs: ["twitter"],
        module: twitterCommand
    },
    {
        name: "Spotify",
        information: "Search Spotify",
        inputs: ["spotify"],
        module: spotifyCommand
    },
    {
        name: "GitHub",
        information: "Search GitHub",
        inputs: ["github"],
        module: githubCommand
    },
    {
        name: "Page",
        information: "Jump to a page",
        inputs: ["page", "next", "previous"],
        module: pageCommand
    },
    {
        name: "Move",
        information: "Move through your recent command history",
        inputs: ["back", "forward"],
        module: moveCommand
    },
    {
        name: "View",
        information: "View more info about a result",
        inputs: ["view", "result"],
        module: viewCommand
    },
    {
        name: "Save",
        information: "Save a link to view later",
        inputs: ["save"],
        module: saveCommand
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
        module: evalCommand
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
}