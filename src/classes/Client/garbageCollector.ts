import collectStat from "../../util/collectStat";
import Channel from "../Channel/Channel";
import Message from "../Message/Message";
import User from "../User/User";
import Client from "./Client";

export default function activateGarbageCollection(client: Client) {
    // Setup Garbage Collection to run every 60 seconds
    setInterval(() => {
        collectGarbage(client);
    }, 60000);
}

function collectGarbage(client: Client) {

    // Collect stats
    collectStat(client, {
        measurement: "cached_channels",
        fields: {
            value: client.channels.size
        }
    });
    collectStat(client, {
        measurement: "cached_messages",
        fields: {
            value: [...client.channels.entries()].reduce((acc, cur) => acc + cur[1].messages.size, 0)
        }
    });
    collectStat(client, {
        measurement: "cached_users",
        fields: {
            value: client.users.size
        }
    });

    // Define exclusions
    const exclusions: string[] = [client.serverJoinLeave.id];

    // Cycle through cached channels
    client.channels.forEach((channel: Channel) => {

        // If the channel's commands' source command (`Channel.commands.sourceCommand`) has expired, remove it
        if ((channel.commands) && (channel.commands.sourceCommand.expireTimestamp <= Date.now())) delete channel.commands;

        // Cycle through messages within channel
        channel.messages.forEach((message: Message) => {
            // Get Timestamp
            const timestamp = convertToTimestamp(message.id);

            // Check age of Timestamp
            if (timestamp.getTime() < Date.now() - 600000) {
                // Delete messages older than 10 minutes
                channel.messages.delete(message.id);
            }
        });

        // Check if the channel doesn't have any cached messages and doesn't have any commands
        if ((channel.messages.size === 0) && (!channel.commands)) {
            // Check for exclusions
            if (exclusions.includes(channel.id)) return;

            // Delete channel cache
            client.channels.delete(channel.id);
        }
    });

    // Loop through users
    client.users.forEach((user: User) => {

        /**
         * If the user's cooldown or command has expired, remove it from cache
         *
         * This assumes that a user's cooldown and command are the only reason a user would be cached long-term
         * Regular command uses (ie. ping, help, etc) only keep the user object in the message object which gets cleared by the garbage collector
         */
        // If the user's cooldown is done, set it to `0`
        if (user.checkCooldown()) user.cooldown = 0;

        // If the user's command has expired, remove it
        if ((user.command) && (user.command.expireTimestamp <= Date.now())) delete user.command;

        // If the user's latest command history entry is also 30 minutes old, remove the user from cache
        if (
            !user.cooldown &&
            !user.command &&
            (
                !user.commandHistory[user.commandHistory.length - 1] ||
                user.commandHistory[user.commandHistory.length - 1].timestamp + 1800000 <= Date.now()
            )
        ) client.users.delete(user.id);
    });
}

function convertToTimestamp(snowflake: string): Date {
    // Convert to Bits
    const id = BigInt.asUintN(64, BigInt(snowflake));
    const dateBits = Number(id >> 22n);

    // Calculate Date with Epoch
    const discordEpoch = 1420070400000;
    const date = new Date(dateBits + discordEpoch);

    return date;
}