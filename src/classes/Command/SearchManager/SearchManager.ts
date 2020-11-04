import Command from "../Command";
import cacheData from "./cacheData";
import setPage from "./setPage";

interface SearchManagerData {
    input: string;
    orderedPages?: boolean;
    splitPages?: number;
    allData?: any;
}

export default class SearchManager {

    // The command
    command: Command;

    // Data about the search manager
    input: string;
    orderedPages?: boolean;
    splitPages?: number;
    allData?: boolean;
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
        this.allData = Boolean(data.allData);
        this.cache = new Map();

        // Cache data
        if (data.allData) this.cacheData(1, data.allData);
    }

    // Get a page's results
    setPage = (page: number): Promise<void> => setPage(this, page);

    // Cache data
    cacheData = (page: number, data: any) => cacheData(this, page, data);
}