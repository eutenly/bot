import PageManager from "./PageManager";

export default function cacheData(pageManager: PageManager, page: number, data: any) {

    // Split data into pages
    if (pageManager.perPage) for (let i = 0; i < Math.ceil(data.length / pageManager.perPage); i++) {

        // Add to cache
        pageManager.cache.set(page + i, data.slice(i * pageManager.perPage, (i * pageManager.perPage) + pageManager.perPage));
    }
    else pageManager.cache.set(page, data);
}