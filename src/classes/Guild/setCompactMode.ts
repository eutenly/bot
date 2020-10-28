import { Types } from "mongoose";
import { Servers } from "../../models";
import { CompactMode } from "../../models/servers";
import Guild from "./Guild";

export default async function setCompactMode(guild: Guild, channels: string | string[], enabled: boolean) {

    // Parse channels
    if (typeof channels === "string") channels = [channels];

    // Set compact mode
    channels.forEach((c: string) => guild.compactMode.set(c, enabled));

    // Get compact mode
    const compactMode: CompactMode[] = [...guild.compactMode.keys()].map((c: string) => ({
        channelID: c,
        enabled: guild.compactMode.get(c) as boolean
    }));

    // Update database
    await Servers.findByIdAndUpdate(guild.id, { compactMode: compactMode as Types.Array<CompactMode> });
}