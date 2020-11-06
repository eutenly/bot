import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import githubLinkChecker from "../../linkCheckers/github";
import redditLinkChecker from "../../linkCheckers/reddit";
import spotifyLinkChecker from "../../linkCheckers/spotify";
import twitterLinkChecker from "../../linkCheckers/twitter";
import youtubeLinkChecker from "../../linkCheckers/youtube";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";

export type LinkCheckerModule = (message: Message) => Promise<Command | undefined>;

type LinkChecker = (input: string, linksOnly?: boolean) => LinkCheckerModule | undefined;

export default async function main(message: Message, url: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Link checkers
    const linkCheckers: LinkChecker[] = [youtubeLinkChecker, twitterLinkChecker, githubLinkChecker, spotifyLinkChecker, redditLinkChecker];
    for (let lc of linkCheckers) {
        const runModule: LinkCheckerModule | undefined = lc(url, true);
        if (runModule) return runModule(message);
    }

    // Create command
    const command: Command = new Command(message.client, {
        name: "website",
        type: "website",
        message,
        url,
        getURL: (): string => url,
        fetch,
        parser: parse,
        getEmbed: embed
    }, (m: Message, chIndex: number) => main(m, url, chIndex), commandHistoryIndex);

    // Fetch
    await command.fetchData();

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);

    // Return
    return command;
}