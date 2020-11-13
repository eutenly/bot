import Websocket from "ws";

export default function identify(ws: Websocket, token: string) {

    // Intents
    // https://discord.com/developers/docs/topics/gateway#list-of-intents
    const INTENTS: object = {
        GUILDS: 1 << 0,
        GUILD_MEMBERS: 1 << 1,
        GUILD_MESSAGES: 1 << 9,
        GUILD_MESSAGE_REACTIONS: 1 << 10,
        DIRECT_MESSAGES: 1 << 12,
        DIRECT_MESSAGE_REACTIONS: 1 << 13
    };

    // Calculate intents
    // https://github.com/discordjs/discord.js/blob/master/src/util/Intents.js
    const intents: number = Object.values(INTENTS).reduce((all, intent) => all | intent);

    // Identify
    ws.send(JSON.stringify({
        op: 2,
        d: {
            token,
            properties: {
                $os: "linux",
                $browser: "eutenly_framework",
                $device: "eutenly_framework"
            },
            presence: {
                game: {
                    name: `say ${process.env.DEFAULT_PREFIX}help`,
                    type: 0
                }
            },
            intents
        }
    }));
}