import { ParserData } from "../../../classes/Command/Command";

interface SpotifyArtist {
    id: string;
    name: string;
}

export interface SpotifySearchOverview {
    id: string;
    type: string;
    name: string;
    artist: SpotifyArtist;
    length?: number;
    followers?: number;
    tracks?: number;
}

export default function parse(data: any): ParserData {

    // Define results
    const results: any[] = [];

    // Sort tracks and artists by popularity
    const tracksAndArtists: any[] = [...data.tracks.items, ...data.artists.items].sort((a, b) => b.popularity - a.popularity);

    // Get top track and artist
    const topTrack: any = data.tracks.items[0];
    const topArtist: any = data.artists.items[0];

    // Add both to data ordered by popularity
    if (!topTrack) results.push(topArtist);
    else if (!topArtist) results.push(topTrack);
    else if (topTrack.popularity > topArtist.popularity) results.push(topTrack, topArtist);
    else results.push(topArtist, topTrack);

    // Remove from tracks and artists
    if (topTrack) tracksAndArtists.splice(tracksAndArtists.indexOf(topTrack), 1);
    if (topArtist) tracksAndArtists.splice(tracksAndArtists.indexOf(topArtist), 1);

    // Add top 2 albums
    if (data.albums.items[0]) results.push(data.albums.items[0]);
    if (data.albums.items[1]) results.push(data.albums.items[1]);

    // Fill remaining space with top tracks and artists
    results.push(...tracksAndArtists.slice(0, 5 - results.length));

    // No results
    if (results.length === 0) return { noData: true };

    // Return
    return {
        data: results.map((d: any) => ({
            id: d.id,
            type: d.type,
            name: d.name,
            artist: d.artists && {
                id: d.artists[0].id,
                name: d.artists[0].name
            },
            length: d.duration_ms,
            followers: d.followers?.total,
            tracks: d.total_tracks
        }))
    };
}