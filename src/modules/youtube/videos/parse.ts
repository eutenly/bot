import ent from "ent";
import { ParserData } from "../../../classes/Command/Command";

export default function parse(data?: any): ParserData | undefined {

    // No data
    if (!data) return;

    // Return
    return {
        data: data.data.items.map((d: any) => ({
            id: d.id.videoId,
            title: ent.decode(d.snippet.title),
            description: ent.decode(d.snippet.description),
            uploadedOn: d.snippet.publishedAt
        })),
        nextPageToken: data.data.nextPageToken || null
    };
}