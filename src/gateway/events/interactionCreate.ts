import Client from "../../classes/Client/Client";
import User from "../../classes/User/User";
import fetch from "node-fetch";

interface InteractionEventData {
    token: string; // Interactions token
    member: InteractionMember;
    id: string; // Interaction event ID
    guild_id: string;
    data: InteractionCommand;
    channel_id: string;
}

interface InteractionCommand {
    name: string;
    id: string;
}

interface InteractionMember {
    user: User;
    roles: string[];
    permissions: string;
}

export default async function interactionCreate(client: Client, data: InteractionEventData) {
    await fetch(`https://discord.com/api/v8/interactions/${data.id}/${data.token}/callback`, {
        method: 'POST', body: JSON.stringify(
            {
                "type": 4,
                "data": {
                    "tts": false,
                    "content": "Pong!",
                    "embeds": [],
                    "allowed_mentions": []
                }
            }
        ),
        headers: { 'Content-Type': 'application/json' },
    })

    client.emit("message", message);
}
