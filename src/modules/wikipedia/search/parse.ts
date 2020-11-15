import { ParserData } from "../../../classes/Command/Command";

export interface WikipediaSearchResult {
    title: string;
    words: number;
    text: string;
}

export default function parse(data?: any): ParserData | undefined {

    // Return
    return {
        data: data.query.search.map((d: any) => ({
            title: d.title,
            words: d.wordcount,
            text: d.snippet.replace(/(<span class="searchmatch">|<\/span>)/g, "**")
        }))
    };
}