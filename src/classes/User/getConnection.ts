import { Users } from "../../models/index";
import User from "./User";

export default async function getConnection(user: User, name: string): Promise<void> {

    // No need to get connection
    if (user.connections[name]) return;

    // Get user data
    const userData = await Users.findById(user.id);

    // Set connection
    if (name === "youtube") user.connections.youtube = userData?.connections.youtube.id ? userData?.connections.youtube : undefined;
    else if (name === "twitter") user.connections.twitter = userData?.connections.twitter.id ? userData?.connections.twitter : undefined;
    else if (name === "reddit") user.connections.reddit = userData?.connections.reddit.id ? userData?.connections.reddit : undefined;
    else if (name === "spotify") user.connections.spotify = userData?.connections.spotify.id ? userData?.connections.spotify : undefined;
    else if (name === "github") user.connections.github = userData?.connections.github.id ? userData?.connections.github : undefined;
}