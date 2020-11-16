import Command from "../Command";
import cacheData from "./cacheData";
import getCachedData from "./getCachedData";
import setPage from "./setPage";

interface PageManagerData {
    input: string;
    perPage: number;
    perCompactPage?: number;
    orderedPages?: boolean;
}

export default class PageManager {

    // The command
    command: Command;

    // Data about the page manager
    input: string;
    page?: number;
    compactPage?: number;
    perPage: number;
    perCompactPage: number;
    orderedPages?: boolean;
    nextPageToken?: string | null;

    cache: Map<number, any>;

    // Constructor
    constructor(command: Command, data: PageManagerData) {

        // Set data
        this.command = command;

        this.input = data.input;
        this.perPage = data.perPage;
        this.perCompactPage = data.perCompactPage || data.perPage;
        this.orderedPages = data.orderedPages;
        this.cache = new Map();
    }

    // Get a page's results
    setPage = (page: number) => setPage(this, page);

    // Cache data
    cacheData = (page: number, data: any) => cacheData(this, page, data);

    /**
     * Get Cached Data
     *
     * Gets the cached data for a page
     * If compact mode is enabled, data will be adjusted for `PageManager.perCompactPage`
     */
    getCachedData = (page: number): any => getCachedData(this, page);

    // Convert page number to compact mode page number
    compactPageNumber = (page: number): number => {
        const firstItemIndex: number = ((page - 1) * this.perPage) + 1;
        return Math.ceil(firstItemIndex / this.perCompactPage);
    }

    // Convert compact mode page number to page number
    pageNumber = (page: number): number => {
        const firstItemIndex: number = ((page - 1) * this.perCompactPage) + 1;
        return Math.ceil(firstItemIndex / this.perPage);
    }
}