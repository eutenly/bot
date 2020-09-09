import Command from "../Command";
import setPage from "./setPage";

interface SearchManagerData {
    input: string;
    orderedPages?: boolean;
    splitPages?: number;
}

export default class SearchManager {

    // The command
    command: Command;

    // Data about the search manager
    input: string;
    orderedPages?: boolean;
    splitPages?: number;
    page?: number;
    nextPageToken?: string | null;

    cache: Map<number, any>;

    // Constructor
    constructor(command: Command, data: SearchManagerData) {

        // Set data
        this.command = command;

        this.input = data.input;
        this.orderedPages = data.orderedPages;
        this.splitPages = data.splitPages;
        this.cache = new Map();
    }

    // Get a page's results
    setPage = (page: number): Promise<void> => setPage(this, page);
}