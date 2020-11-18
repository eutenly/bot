import { ParserData } from "../../../classes/Command/Command";

export default function parse(data?: any): ParserData | undefined {

    // No data
    if (data.message) return;

    // Filter out prs
    data = data.filter((d: any) => !d.pull_request);

    // Return
    return {
        data: data.map((d: any) => ({
            title: d.title,
            number: d.number,
            text: d.body
        }))
    };
}