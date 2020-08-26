import Client from "../../classes/Client/Client";

interface ReadyEventDataUser {
    id: string;
    avatar: string;
}

interface ReadyEventData {
    user: ReadyEventDataUser;
    session_id: string;
}

export default function ready(client: Client, data: ReadyEventData) {

    // Set client data
    client.id = data.user.id;
    client.avatarURL = `https://cdn.discordapp.com/avatars/${client.id}/${data.user.avatar}`;
    client.sessionID = data.session_id;

    // Emit event
    client.emit("ready");
}