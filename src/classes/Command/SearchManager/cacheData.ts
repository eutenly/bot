import SearchManager from "./SearchManager";

export default function cacheData(searchManager: SearchManager, page: number, data: any) {

    // Split data into pages
    if (searchManager.splitPages) for (let i = 0; i < Math.ceil(data.length / searchManager.splitPages); i++) {

        // Add to cache
        searchManager.cache.set(page + i, data.slice(i * searchManager.splitPages, (i * searchManager.splitPages) + searchManager.splitPages));
    }
    else searchManager.cache.set(page, data);
}