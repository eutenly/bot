export interface YouTubeSearchResult {
    id: string;
    title: string;
    description: string;
    uploadedOn: string;
}

interface YouTubeSearchData {
    data: YouTubeSearchResult[];
    nextPageToken: string | null;
}

export default function parse(data?: any): YouTubeSearchData {

    // No data
    if (!data) return {
        data: [],
        nextPageToken: null
    };

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