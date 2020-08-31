import Message from "../../classes/Message/Message";
import evalCommand from "../eval/eval";

export const routes: Command[] = [
    {
        name: "Eval",
        information: "Owner JavaScript Eval",
        inputs: ["eval "],
        module: evalCommand,
        allowParams: true,
    }
];

type CommandRoute = (message: Message) => Promise<void>;

interface Command {
    name: string;
    information: string;
    inputs: string[];
    module: CommandRoute;
    allowParams: boolean;
}