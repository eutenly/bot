import { ParserData } from "../../../classes/Command/Command";

export default function parse(data?: any): ParserData | undefined {

    // No data
    if (data.message) return;

    // Return
    return {
        data: data.map((d: any) => ({
            type: d.type,
            data: d.payload,
            user: {
                id: d.actor.id,
                name: d.actor.login
            },
            repo: {
                id: d.repo.id,
                name: d.repo.name
            },
            timestamp: d.created_at
        }))
    };
}