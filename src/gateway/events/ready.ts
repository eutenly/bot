import { terminal } from "terminal-kit";
import Client from "../../classes/Client/Client";

interface ReadyEventDataUser {
    id: string;
    avatar: string;
}

export interface LoadingGuilds {
    id: string;
}

interface ReadyEventData {
    user: ReadyEventDataUser;
    session_id: string;
    guilds: LoadingGuilds[];
}

export default function ready(client: Client, data: ReadyEventData) {

    // Set client data
    client.id = data.user.id;
    client.avatarURL = `https://cdn.discordapp.com/avatars/${client.id}/${data.user.avatar}`;
    client.sessionID = data.session_id;

    // Set loading guilds
    data.guilds.forEach((g: LoadingGuilds) => client.loadingGuilds?.set(g.id));

    // Log
    client.loadingGuildsProgressBar = terminal.progressBar({
        title: "Loading Guilds",
        percent: true,
        items: client.loadingGuilds?.size,
        barStyle: terminal.green,
        barBracketStyle: terminal.white
    });
    terminal("\n\n");
}