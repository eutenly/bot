import Client from "../classes/Client/Client";

interface Stat {
    measurement: string;
    tags?: {
        [index: string]: any;
    };
    fields?: {
        [index: string]: any;
    };
}

export default async function collectStat(client: Client, stat: Stat) {

    // Parse tags
    if (stat.tags) {
        for (let tag in stat.tags) if (stat.tags[tag] === undefined) delete stat.tags[tag];
        if (Object.keys(stat.tags).length === 0) delete stat.tags;
    }

    // Parse fields
    if (stat.fields) {
        for (let field in stat.fields) if (stat.fields[field] === undefined) delete stat.fields[field];
        if (Object.keys(stat.fields).length === 0) delete stat.fields;
    }

    // Add to database
    await client.influxDB.writePoints([{
        measurement: stat.measurement,
        tags: stat.tags || {},
        fields: stat.fields || { event: true }
    }]);
}