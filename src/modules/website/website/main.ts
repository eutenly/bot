import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import githubLinkChecker from "../../github/linkChecker";
import redditLinkChecker from "../../reddit/linkChecker";
import spotifyLinkChecker from "../../spotify/linkChecker";
import twitterLinkChecker from "../../twitter/linkChecker";
import youtubeLinkChecker from "../../youtube/linkChecker";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";

export type LinkCheckerModule = (userRequest: UserRequest) => Promise<Command | undefined>;

type LinkChecker = (input: string, linksOnly?: boolean) => LinkCheckerModule | undefined;

export default async function main(userRequest: UserRequest, url: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Link checkers
    const linkCheckers: LinkChecker[] = [youtubeLinkChecker, twitterLinkChecker, githubLinkChecker, spotifyLinkChecker, redditLinkChecker];
    for (let lc of linkCheckers) {
        const runModule: LinkCheckerModule | undefined = lc(url, true);
        if (runModule) return runModule(userRequest);
    }

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "website",
        category: "website",
        userRequest,
        url,
        getData: url,
        fetch,
        parser: parse,
        getEmbed: embed
    }, (r: UserRequest, chIndex: number) => main(r, url, chIndex), commandHistoryIndex);

    // Fetch
    await command.fetchData();
    if (command.data === null) return;

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    await command.send(commandEmbed);

    // Return
    return command;
}