import Command, { ViewDataURL } from "../../../classes/Command/Command";
import Message from "../../../classes/Message/Message";
import fetch from "../fetch";
import embed from "./embed";
import parse from "./parse";
import view from "./view";

export default async function main(message: Message, itemID: string, itemName: string, type: string, commandHistoryIndex?: number): Promise<Command | undefined> {

    // Create command
    const command: Command = new Command(message.client, {
        name: "tracks",
        category: "spotify",
        message,
        input: itemID,
        metadata: {
            type,
            itemName
        },
        url: url(itemID, itemName, type),
        getData: (itemID: string = "", page: number = 1): string | Promise<any> => {

            /**
             * Top Tracks
             *
             * This endpoint always returns up to 10 tracks
             * If there are 10 results, pages 1 and 2 will be filled up, and page 2 will never be requested
             * If page 2 is ever requested, we know that there aren't more than 5 results, so we return nothing
             *
             * If a page higher than 2 is requested, return nothing
             */
            if (type === "topTracks") return page !== 1 ? new Promise((resolve) => resolve()) : `https://api.spotify.com/v1/artists/${itemID}/top-tracks?market=from_token`;

            // Albums and playlists
            else return `https://api.spotify.com/v1/${type === "album" ? "albums" : "playlists"}/${itemID}/tracks?limit=5${page ? `&offset=${(page - 1) * 5}` : ""}`;
        },
        connectionName: "spotify",
        fetch,
        perPage: 5,
        parser: parse,
        getEmbed: embed,
        view
    }, (m: Message, chIndex: number) => main(m, itemID, itemName, type, chIndex), commandHistoryIndex);
    await command.uninitializedConnection;

    // No connection
    if (command.noConnection) return;

    // Search
    command.pageManager?.setPage(1);

    // Return
    return command;
}

export function url(itemID: string, itemName: string, type: string): ViewDataURL {

    return type === "topTracks" ?
        {
            title: "Spotify",
            description: `${itemName}'s Top Tracks`,
            url: `eutenly://spotify/topTracks/${itemID}`
        } :
        `https://open.spotify.com/${type}/${itemID}`;
}