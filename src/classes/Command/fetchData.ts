import { Connection } from "../User/User";
import Command, { GetExtraData, ParserData } from "./Command";

export default async function fetchData(command: Command, input?: string, page?: number, nextPageToken?: string | null): Promise<ParserData | undefined> {

    // Define data
    let data: any;
    let extraData: any[] | undefined;

    // Regular commands
    if ((command.fetch) && (command.getURL) && (nextPageToken !== null)) {

        // Get url
        const url: string = command.getURL(input, page, nextPageToken);

        // Fetch
        data = await command.fetch(command.message, url, "GET");
        if (!data) return;

        // Get extra data
        const extraDataPromises: Array<Promise<any>> | undefined = command.getExtraData?.map((d: GetExtraData) => {

            // Get url
            const extraDataURL: string = d(data);

            // Return
            if (!command.fetch) return new Promise((resolve) => resolve());
            return command.fetch(command.message, extraDataURL, "GET");
        });

        // Await extra data
        if (extraDataPromises) extraData = await Promise.all(extraDataPromises);
    }

    // Commands that have a custom function for getting data
    else if ((command.getData) && (nextPageToken !== null)) data = await command.getData(input, page, nextPageToken);

    // Run parser
    if (!command.parser) return;
    const parserData: ParserData = command.parser(data, extraData, command.metadata);

    // If theres no data, set it to an empty array
    if (parserData.noData) parserData.data = [];

    // Set data
    // Only run if this module wasnt called via `SearchManager.setPage`
    if (!input) command.data = parserData.data;

    // Return
    return parserData;
}