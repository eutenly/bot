import Client from "../classes/Client/Client";

type Stat = UserInitiatedGuildEvent | WebsiteInitiatedUserEvent | GuildInitiatedEvent | ResourceUsageStat;

interface UserInitiatedGuildEvent {
    type: "userInitiatedGuildEvent";
    userID: string;
    guildID?: string;
    eventTrigger: EventTrigger;
    eventService: string;
    eventAction: string;
}

type EventTrigger = "textCommand" | "slashCommand" | "reaction";

interface WebsiteInitiatedUserEvent {
    type: "websiteInitiatedUserEvent";
    ip: string;
    userID?: string;
    page: string;
    eventAction: string;
    context?: string;
}

interface GuildInitiatedEvent {
    type: "guildInitiatedEvent";
    guildID: string;
    event: string;
    context?: string;
}

interface ResourceUsageStat {
    type: "resourceUsageStat";
    cpu: number;
    memory: number;
}

export default async function collectStat(client: Client, stat: Stat) {

    // Add to database
    if (stat.type === "userInitiatedGuildEvent") await client.postgres.query("INSERT INTO user_initiated_guild_events VALUES(NOW(), $1, $2, $3, $4, $5)", [stat.userID, stat.guildID, stat.eventTrigger, stat.eventService, stat.eventAction]);
    else if (stat.type === "websiteInitiatedUserEvent") await client.postgres.query("INSERT INTO website_initiated_user_events VALUES(NOW(), $1, $2, $3, $4, $5)", [stat.ip, stat.userID, stat.page, stat.eventAction, stat.context]);
    else if (stat.type === "guildInitiatedEvent") await client.postgres.query("INSERT INTO guild_initiated_events VALUES(NOW(), $1, $2, $3)", [stat.guildID, stat.event, stat.context]);
    else if (stat.type === "resourceUsageStat") await client.postgres.query("INSERT INTO resource_usage_stats VALUES(NOW(), $1, $2)", [stat.cpu, stat.memory]);
}