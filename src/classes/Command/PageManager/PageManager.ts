import Command from "../Command";
import cacheData from "./cacheData";
import setPage from "./setPage";

interface PageManagerData {
    input: string;
    perPage: number;
    orderedPages?: boolean;
}

export default class PageManager {

    // The command
    command: Command;

    // Data about the page manager
    input: string;
    page?: number;
    perPage: number;
    orderedPages?: boolean;
    nextPageToken?: string | null;

    cache: Map<number, any>;

    // Constructor
    constructor(command: Command, data: PageManagerData) {

        // Set data
        this.command = command;

        this.input = data.input;
        this.perPage = data.perPage;
        this.orderedPages = data.orderedPages;
        this.cache = new Map();
    }

    // Get a page's results
    setPage = (page: number) => setPage(this, page);

    // Cache data
    cacheData = (page: number, data: any) => cacheData(this, page, data);
}