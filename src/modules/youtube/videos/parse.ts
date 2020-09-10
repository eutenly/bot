import { ParserData } from "../../../classes/Command/Command";

export interface YouTubeSearchResult {
    id: string;
    title: string;
    description: string;
    uploadedOn: string;
}

export default function parse(data?: any): ParserData {

    // No data
    if (!data) return { noData: true };

    // Return
    return {
        data: data.data.items.map((d: any) => ({
            id: d.id.videoId,
            title: d.snippet.title,
            description: d.snippet.description,
            uploadedOn: d.snippet.publishedAt
        })),
        nextPageToken: data.data.nextPageToken || null
    };
}