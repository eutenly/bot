import Client from "../../classes/Client";

interface ReadyEventDataUser {
    id: string;
    avatar: string;
}

interface ReadyEventData {
    user: ReadyEventDataUser;
}

export default function ready(client: Client, data: ReadyEventData) {

    // Set client data
    client.id = data.user.id;
    client.avatarURL = `https://cdn.discordapp.com/avatars/${client.id}/${data.user.avatar}`;

    // Emit event
    client.emit("ready");
}