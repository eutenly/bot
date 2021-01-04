import { terminal } from "terminal-kit";
import Client, { EventQueueEvent } from "../../classes/Client/Client";
import { Servers } from "../../models/index";
import event from "../socket/event";

interface ReadyEventDataUser {
    id: string;
    username: string;
    discriminator: string;
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

export default async function ready(client: Client, data: ReadyEventData) {

    // Set client data
    client.id = data.user.id;
    client.tag = `${data.user.username}#${data.user.discriminator}`;
    client.avatarURL = `https://cdn.discordapp.com/avatars/${client.id}/${data.user.avatar}`;
    client.sessionID = data.session_id;

    // Get server data
    await Servers.insertMany(data.guilds.map((g: LoadingGuilds) => ({ _id: g.id }))).catch(() => { });
    const serverData = await Servers.find({ _id: { $in: data.guilds.map((g: LoadingGuilds) => g.id) } });

    // Set loading guilds
    serverData.forEach((s) => client.loadingGuilds?.set(s._id, {
        prefix: s.prefix,
        compactMode: s.compactMode
    }));

    // Log
    client.loadingGuildsProgressBar = terminal.progressBar({
        title: "Loading Guilds",
        percent: true,
        items: client.loadingGuilds?.size,
        barStyle: terminal.green,
        barBracketStyle: terminal.white
    });
    terminal("\n\n");

    // Ready
    client.ready = true;

    // Process queued events
    client.eventQueue.forEach((e: EventQueueEvent) => event(client, e.type, e.data));
    client.eventQueue = [];

    // Register slash commands
    client.registerSlashCommands();
}