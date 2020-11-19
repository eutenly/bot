import Command, { GetExtraData, ParserData } from "./Command";

export default async function fetchData(command: Command, input?: string, page?: number, nextPageToken?: string | null): Promise<ParserData | undefined> {

    // Define data
    let data: any;
    let extraData: any[] | undefined;

    // Get pending data
    const pendingData = ((typeof command.getData === "function") && (nextPageToken !== null)) ? command.getData(input, page, nextPageToken, command.message.author) : command.getData;

    // Regular commands
    if ((command.fetch) && (typeof pendingData === "string")) {

        // Define url
        const url: string = pendingData;

        // Fetch
        data = await command.fetch(command.message.author, command.message.channel, url, "GET");
        if (!data) return;

        // Get extra data
        const extraDataPromises: Array<Promise<any>> | undefined = command.getExtraData?.map((d: string | GetExtraData) => {

            // Get pending extra data
            const pendingExtraData = typeof d === "function" ? d(data) : d;

            // Return
            if (!command.fetch) return new Promise((resolve) => resolve());
            else if (typeof pendingExtraData === "string") return command.fetch(command.message.author, command.message.channel, pendingExtraData, "GET");
            else return pendingExtraData;
        });

        // Await extra data
        if (extraDataPromises) extraData = await Promise.all(extraDataPromises);
    }

    // Commands that have a custom function for getting data
    else if (pendingData instanceof Promise) data = await pendingData;

    // Debug
    command.debug("Fetched data", { data: JSON.stringify(data, null, 4), extraData: extraData && JSON.stringify(extraData, null, 4) });

    // Run parser
    if (!command.parser) return;
    const parserData: ParserData | undefined = command.parser(data, extraData || [], command.metadata);

    // Debug
    command.debug("Parsed data", parserData);

    // Set data
    // Only run if this module wasnt called via `PageManager.setPage`
    if (!input) command.data = parserData?.data;

    // Return
    return parserData;
}