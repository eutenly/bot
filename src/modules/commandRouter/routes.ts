import Message from "../../classes/Message/Message";
import evalCommand from "../eval";
import googleCommand from "../google/main";
import pageCommand from "../page";
import viewCommand from "../view";

// Define routes
export const routes: Command[] = [
    {
        name: "Google",
        information: "Search Google",
        inputs: ["google", "search"],
        module: googleCommand
    },
    {
        name: "Page",
        information: "Jump to a page",
        inputs: ["page", "next", "previous"],
        module: pageCommand
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