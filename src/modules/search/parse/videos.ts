import ent from "ent";

export default function videos(data: any): any {

    // Return
    return {

        // Set type
        type: "videos",

        // Get videos
        items: data.data.items.map((d: any) => ({
            id: d.id.videoId,
            title: ent.decode(d.snippet.title),
            channelName: ent.decode(d.snippet.channelTitle)
        }))
    };
}