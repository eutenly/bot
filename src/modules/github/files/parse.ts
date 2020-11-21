import { ParserData } from "../../../classes/Command/Command";

export default function parse(data?: any): ParserData | undefined {

    // No data
    if (data.message) return;

    // Return
    return {
        data: data.map((d: any) => ({
            name: d.name,
            type: d.type,
            path: d.path,
            size: d.size
        }))
    };
}