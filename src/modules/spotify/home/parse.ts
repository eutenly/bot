import { ParserData } from "../../../classes/Command/Command";

export default function parse(data: any, extraData?: any[]): ParserData | undefined {

    // Parse extra data
    const topTracks: any = extraData && extraData[0];
    const topArtists: any = extraData && extraData[1];
    const recentlyPlayed: any = extraData && extraData[2];

    // Return
    return {
        data: {
            playlists: data.items.map((p: any) => ({
                id: p.id,
                name: p.name,
                description: p.description,
                owner: {
                    id: p.owner.id,
                    name: p.owner.display_name
                },
                tracks: p.tracks.total
            })),
            topTracks: topTracks.items.map((t: any) => ({
                id: t.id,
                name: t.name,
                artist: {
                    id: t.artists[0].id,
                    name: t.artists[0].name
                },
                length: t.duration_ms
            })),
            topArtists: topArtists.items.map((a: any) => ({
                id: a.id,
                name: a.name,
                followers: a.followers.total
            })),
            recentlyPlayed: recentlyPlayed.items.map((t: any) => ({
                id: t.track.id,
                name: t.track.name,
                artist: {
                    id: t.track.artists[0].id,
                    name: t.track.artists[0].name
                },
                length: t.track.duration_ms
            })),
        }
    };
}