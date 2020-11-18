import { ParserData } from "../../../classes/Command/Command";

export default function parse(data: any): ParserData | undefined {

    // No results
    if (data.error) return;

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