import { ParserData } from "../../../classes/Command/Command";

export interface SpotifyArtist {
    id: string;
    name: string;
}

interface SpotifyAlbum {
    id: string;
    name: string;
}

export interface SpotifyTrack {
    id: string;
    name: string;
    artists: SpotifyArtist[];
    album: SpotifyAlbum;
    length: number;
    explicit: boolean;
    energy: number;
    tempo: number;
    danceability: number;
    albumArt?: string;
    copyrights: string[];
    releasedOn: string;
    progress?: number;
}

export default function parse(data: any, extraData?: any[], metadata?: any): ParserData {

    // No results
    if ((data.error) || (!extraData)) return { noData: true };

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