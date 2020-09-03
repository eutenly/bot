import Message from "../../classes/Message/Message";
import evalCommand from "../eval";

// Define routes
export const routes: Command[] = [
    {
        name: "Eval",
        information: "Owner JavaScript Eval",
        inputs: ["eval"],
        module: evalCommand
    }
];

type CommandRoute = (message: Message) => Promise<void>;

export interface Command {
    name: string;
    information: string;
    inputs: string[];
    module: CommandRoute;
}