import Message from "../../classes/Message/Message";
import evalCommand from "../eval";
import helpCommand from "../help";

// Define routes
export const routes: Command[] = [
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

type CommandRoute = (message: Message) => Promise<void>;

export interface Command {
    name: string;
    information: string;
    inputs: string[];
    module: CommandRoute;
    private: boolean;
}