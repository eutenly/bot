import Message from "../../classes/Message/Message";
import evalCommand from "../eval";
<<<<<<< HEAD
import helpCommand from "../help";
=======
import githubCommand from "../github/main";
import googleCommand from "../google/main";
import moveCommand from "../move";
import pageCommand from "../page";
import pingCommand from "../ping";
import twitterCommand from "../twitter/main";
import viewCommand from "../view";
import websiteCommand from "../website/main";
import youtubeCommand from "../youtube/main";
>>>>>>> c9e324bfcc72c8f623b2282e3658b191ad42398b

// Define routes
export const routes: Command[] = [
    {
        name: "Ping",
        information: "Check how responsive the bot is",
        inputs: ["ping"],
        module: pingCommand
    },
    {
        name: "Website",
        information: "View details about a website",
        inputs: ["website", "websiteinfo", "site", "siteinfo"],
        module: websiteCommand
    },
    {
        name: "Google",
        information: "Search Google",
        inputs: ["google", "search"],
        module: googleCommand
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
        name: "Eval",
        information: "Owner JavaScript Eval",
        inputs: ["eval"],
        module: evalCommand,
        private: true
    },
    {
        name: "Help",
        information: "Help about eutenly",
        inputs: ["help", "h", "?"],
        module: helpCommand,
        private: false
    }
];

type CommandRoute = (message: Message) => Promise<any>;

export interface Command {
    name: string;
    information: string;
    inputs: string[];
    module: CommandRoute;
    private: boolean;
}