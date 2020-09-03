import Message from "../../classes/Message/Message";
import evalCommand from "../eval";
import googleCommand from "../google/main";

// Define routes
export const routes: Command[] = [
    {
        name: "Google",
        information: "Search Google",
        inputs: ["google", "search"],
        module: googleCommand
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