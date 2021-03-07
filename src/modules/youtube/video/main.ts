import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import UserRequest from "../../../classes/UserRequest/UserRequest";
import embedVideo from "../embedVideo";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(userRequest: UserRequest, videoID: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(userRequest.client, {
        name: "video",
        category: "youtube",
        userRequest,
        url: url(videoID),
        getData: async (): Promise<any> => await userRequest.client.youtube.videos.list({
            part: ["snippet", "contentDetails", "statistics"],
            id: [videoID],
            access_token: userRequest.user.connections["youtube"]?.accessToken
        }),
        connectionName: "youtube",
        parser: parse,
        getEmbed: embed,
        view,
        reactions: [{
            emoji: "youtube",
            module: embedVideo
        }]
    }, (r: UserRequest, chIndex: number) => main(r, videoID, chIndex), commandHistoryIndex);

    // Fetch
    await command.fetchData();
    if (command.data === null) return;

    // Get embed
    const commandEmbed: Embed = command.getEmbed(command, command.data);

    // Send
    command.send(commandEmbed);

    // Return
    return command;
}

export function url(videoID: string): ViewDataURL {

    return `https://youtube.com/watch?v=${videoID}`;
}