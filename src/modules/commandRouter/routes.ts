import Message from "../../classes/Message/Message";
import evalCommand from "../eval";
import googleCommand from "../google/main";
import moveCommand from "../move";
import pageCommand from "../page";
import viewCommand from "../view";
import youtubeCommand from "../youtube/main";

// Define routes
export const routes: Command[] = [
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
        module: evalCommand
    }
];

type CommandRoute = (message: Message) => Promise<any>;

export interface Command {
    name: string;
    information: string;
    inputs: string[];
    module: CommandRoute;
}