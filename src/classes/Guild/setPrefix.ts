import { Servers } from "../../models";
import Guild from "./Guild";

export default async function setPrefix(guild: Guild, prefix: string) {

    // Set prefix
    guild.prefix = prefix;
    if (guild.prefix === process.env.DEFAULT_PREFIX) delete guild.prefix;

    // Update database
    await Servers.findByIdAndUpdate(guild.id, guild.prefix ? { prefix: guild.prefix } : { $unset: { prefix: 1 } });
}