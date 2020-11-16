import PageManager from "./PageManager";

export default function getCachedData(pageManager: PageManager, page: number): any {

    // Get data
    let data: any = pageManager.cache.get(page);
    if (!data) return;

    // Compact mode disabled
    if (!pageManager.command.compactMode) return data;

    // Get data in compact mode
    data = [];
    for (let i = 0; i < pageManager.perCompactPage; i++) {

        // Add to data
        const compactPage: number = pageManager.compactPageNumber(page);

        const firstItemIndex: number = ((compactPage - 1) * pageManager.perCompactPage) + 1;
        const pageNumber: number = Math.ceil((firstItemIndex + i) / pageManager.perPage);

        const pageData: any = pageManager.cache.get(pageNumber);
        const firstDataItemIndex: number = ((pageNumber - 1) * pageManager.perPage) + 1;

        data.push(pageData[firstItemIndex - firstDataItemIndex + i]);
    }

    return data;
}