import { Users } from "../../models/index";
import User from "./User";

export default async function getConnection(user: User, name: string): Promise<void> {

    // Get user data
    const userData = await Users.findById(user.id);

    // Set connection
    if (name === "twitter") user.connections.twitter = userData?.connections.twitter;
    else if (name === "reddit") user.connections.reddit = userData?.connections.reddit;
    else if (name === "spotify") user.connections.spotify = userData?.connections.spotify;
    else if (name === "twitch") user.connections.twitch = userData?.connections.twitch;
    else if (name === "github") user.connections.github = userData?.connections.github;
    else if (name === "wakatime") user.connections.wakatime = userData?.connections.wakatime;
}