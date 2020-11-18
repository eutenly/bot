import { ParserData } from "../../../classes/Command/Command";

export default function parse(data: any, extraData?: any[], metadata?: any): ParserData | undefined {

    // No results
    if ((data.error) || (!extraData)) return;

    // Parse extra data
    const audioFeatureData: any = extraData[0];
    const albumData: any = extraData[1];

    // Return
    return {
        data: {
            id: data.id,
            name: data.name,
            artists: data.artists.map((a: any) => ({
                id: a.id,
                name: a.name
            })),
            album: {
                id: data.album.id,
                name: data.album.name
            },
            length: data.duration_ms,
            explicit: data.explicit,
            energy: Math.round(audioFeatureData.energy * 100),
            tempo: Math.round(audioFeatureData.tempo),
            danceability: Math.round(audioFeatureData.danceability * 100),
            albumArt: data.album.images[0] && data.album.images[0].url,
            copyrights: [...new Set(albumData.copyrights.map((c: any) => c.text))],
            releasedOn: data.album.release_date,
            progress: metadata.progress
        }
    };
}