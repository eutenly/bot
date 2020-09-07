import Command from "../Command";
import setPage from "./setPage";

interface SearchManagerData {
    query: string;
    orderedPages?: boolean;
}

export default class SearchManager {

    // The command
    command: Command;

    // Data about the search manager
    query: string;
    orderedPages?: boolean;
    page?: number;
    nextPageToken?: string;

    cache: Map<number, any>;

    // Constructor
    constructor(command: Command, data: SearchManagerData) {

        // Set data
        this.command = command;

        this.query = data.query;
        this.orderedPages = data.orderedPages;
        this.cache = new Map();
    }

    // Get a page's results
    setPage = (page: number): Promise<void> => setPage(this, page);
}