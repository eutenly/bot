import Command from "../Command";
import setPage from "./setPage";

export type GetURL = (query: string, page: number) => string;

interface SearchManagerData {
    query: string;
    getURL: GetURL;
}

export default class SearchManager {

    // The command
    command: Command;

    // Data about the search manager
    query: string;
    page?: number;
    getURL: GetURL;

    cache: Map<number, any>;

    // Constructor
    constructor(command: Command, data: SearchManagerData) {

        // Set data
        this.command = command;

        this.query = data.query;
        this.getURL = data.getURL;
        this.cache = new Map();
    }

    // Get a page's results
    setPage = (page: number): Promise<void> => setPage(this, page);
}