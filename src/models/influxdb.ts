import { FieldType } from "influx";

interface InfluxDBSchemaItem {
    measurement: string;
    tags: string[];
    fields: {
        [index: string]: FieldType;
    };
}

export const InfluxDBSchema: InfluxDBSchemaItem[] = [
    {
        measurement: "cpu_usage",
        tags: [],
        fields: {
            value: FieldType.FLOAT
        }
    },
    {
        measurement: "memory_usage",
        tags: [],
        fields: {
            value: FieldType.FLOAT
        }
    },
    {
        measurement: "cached_channels",
        tags: [],
        fields: {
            value: FieldType.INTEGER
        }
    },
    {
        measurement: "cached_messages",
        tags: [],
        fields: {
            value: FieldType.INTEGER
        }
    },
    {
        measurement: "cached_users",
        tags: [],
        fields: {
            value: FieldType.INTEGER
        }
    },
    {
        measurement: "server_join_leaves",
        tags: ["type", "source"],
        fields: {
            totalServers: FieldType.INTEGER
        }
    },
    {
        measurement: "eutenland_join_leaves",
        tags: ["type"],
        fields: {
            memberCount: FieldType.INTEGER
        }
    },
    {
        measurement: "commands_used",
        tags: ["dms", "viaHistory", "compactMode"],
        fields: {
            command: FieldType.STRING,
            commandType: FieldType.STRING
        }
    },
    {
        measurement: "pages_cycled",
        tags: ["dms"],
        fields: {
            command: FieldType.STRING,
            commandType: FieldType.STRING
        }
    },
    {
        measurement: "compact_mode_toggled",
        tags: ["dms", "action"],
        fields: {
            command: FieldType.STRING,
            commandType: FieldType.STRING
        }
    },
    {
        measurement: "results_viewed",
        tags: ["dms"],
        fields: {
            command: FieldType.STRING,
            commandType: FieldType.STRING,
            resultCommand: FieldType.STRING,
            resultCommandType: FieldType.STRING
        }
    },
    {
        measurement: "spotify_commands_used",
        tags: ["dms"],
        fields: {
            command: FieldType.STRING
        }
    },
    {
        measurement: "custom_reactions_used",
        tags: ["action", "dms", "confirmationMessageSent"],
        fields: {
            reaction: FieldType.STRING,
            commandType: FieldType.STRING,
            reactionType: FieldType.STRING
        }
    },
    {
        measurement: "accounts_authorized",
        tags: ["connection"],
        fields: {
            event: FieldType.BOOLEAN
        }
    },
    {
        measurement: "saved_links_updated",
        tags: ["action", "dms"],
        fields: {
            event: FieldType.BOOLEAN
        }
    },
    {
        measurement: "votes_cast",
        tags: [],
        fields: {
            event: FieldType.BOOLEAN
        }
    },
    {
        measurement: "patrons_updated",
        tags: ["tier", "action"],
        fields: {
            event: FieldType.BOOLEAN
        }
    }
];