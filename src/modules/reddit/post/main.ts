import Command, { CommandReactionModuleAction, ViewDataURL } from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import Message from "../../../classes/Message/Message";
import User from "../../../classes/User/User";
import fetch from "../fetch";
import savePost from "../savePost";
import votePost from "../votePost";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, postID: string, subredditName: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "post",
        category: "reddit",
        message,
        url: url(postID, subredditName),
        getData: `https://oauth.reddit.com/api/info?id=t3_${encodeURIComponent(postID)}&raw_json=1`,
        connectionName: "reddit",
        fetch,
        parser: parse,
        getEmbed: embed,
        view,
        reactions: [
            {
                emoji: "reddit_upvote",
                module: (cmd: Command, user: User, action: CommandReactionModuleAction) => votePost(cmd, user, action, "upvote")
            },
            {
                emoji: "reddit_downvote",
                module: (cmd: Command, user: User, action: CommandReactionModuleAction) => votePost(cmd, user, action, "downvote")
            },
            {
                emoji: "reddit_save",
                module: savePost
            }
        ]
    }, (m: Message, chIndex: number) => main(m, postID, subredditName, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

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

export function url(postID: string, subredditName: string): ViewDataURL {

    return `https://reddit.com/r/${subredditName}/comments/${postID}`;
}