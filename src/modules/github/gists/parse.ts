import { ParserData } from "../../../classes/Command/Command";

export default function parse(data?: any): ParserData | undefined {

    // No data
    if (data.message) return;

    // Return
    return {
        data: data.map((d: any) => ({
            id: d.id,
            name: Object.keys(d.files)[0],
            description: d.description
        }))
    };
}