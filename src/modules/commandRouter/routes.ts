import Message from "../../classes/Message/Message";
import evalCommand from "../eval";
import exampleCommand from "../example";

// Define routes
export const routes: Command[] = [
    {
        name: "Example",
        information: "Example command",
        inputs: ["example"],
        module: exampleCommand,
        allowParams: true
    },
    {
        name: "Eval",
        information: "Owner JavaScript Eval",
        inputs: ["eval"],
        module: evalCommand,
        allowParams: true,
    }
];

type CommandRoute = (message: Message) => Promise<void>;

export interface Command {
    name: string;
    information: string;
    inputs: string[];
    module: CommandRoute;
    allowParams: boolean;
}