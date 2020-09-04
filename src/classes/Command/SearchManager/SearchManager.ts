import Embed from "../../Embed/Embed";
import Command from "../Command";
import setPage from "./setPage";

export type GetURL = (query: string, page: number) => string;

export interface CachedResult {
    metadata: any;
    results: any[];
}

export type Parser = (data: any) => CachedResult;

export type GetEmbed = (searchManager: SearchManager, cachedResult: CachedResult) => Embed;

interface SearchManagerData {
    query: string;
    getURL: GetURL;
    parser: Parser;
    getEmbed: GetEmbed;
}

export default class SearchManager {

    // The command
    command: Command;

    // Data about the search manager
    query: string;
    page?: number;
    getURL: GetURL;
    cache: Map<number, CachedResult>;

    parser: Parser;
    getEmbed: GetEmbed;

    // Constructor
    constructor(command: Command, data: SearchManagerData) {

        // Set data
        this.command = command;

        this.query = data.query;
        this.getURL = data.getURL;
        this.cache = new Map();

        this.parser = data.parser;
        this.getEmbed = data.getEmbed;
    }

    // Get a page's results
    setPage = (page: number): Promise<void> => setPage(this, page);
}