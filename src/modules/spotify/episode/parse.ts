import { ParserData } from "../../../classes/Command/Command";

export interface SpotifyEpisode {
    id: string;
    name: string;
    description: string;
    explicit: boolean;
    show: string;
    length: number;
    image?: string;
    copyrights: string[];
}

export default function parse(data: any): ParserData {

    // No results
    if (data.error) return { noData: true };

    // Return
    return {
        data: {
            id: data.id,
            name: data.name,
            description: data.description,
            explicit: data.explicit,
            show: data.show.name,
            length: data.duration_ms,
            image: data.images[0] && data.images[0].url,
            copyrights: [...new Set(data.show.copyrights.map((c: any) => c.text))]
        }
    };
}