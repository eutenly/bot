import cheerio from "cheerio";
import fetch from "node-fetch";
import Command, { ViewData } from "../classes/Command/Command";
import Message from "../classes/Message/Message";
import saveDocument from "../models/save";
import catchPromise from "../util/catchPromise";
import collectStat from "../util/collectStat";

export default async function save(message: Message) {

    // Get params
    const input: string = message.commandContent.split(" ").slice(1).join(" ");

    // Get command
    const command: Command | undefined = message.author.command;

    // Define url
    let url: string | undefined;

    // Get user data
    const userData = await message.author.getData(true);
    if (!userData) return;

    // Max saved links
    if (userData.savedLinks.length >= 15) return message.channel.sendMessage(":x:  **|  You've reached the maximum number of saved links. Voters get their limit doubled from 15 saved links to 30 and Patrons can get an even higher limit.\n\nLearn more about voting (it's free!): https://eutenly.com/voter-perks\nBecome a Patron and support development: https://eutenly.com/patreon**");

    // Command url
    if ((!input) && (command) && (command.url)) url = command.url;

    // View
    else if ((command) && (command.view)) {

        // Get data
        let data: any;
        if (command.data) data = command.data;
        else data = command.searchManager?.cache.get(command.searchManager.page || 0);

        // Run module
        const viewData: ViewData | undefined = command.view(data, message, command);

        // Set url
        if ((viewData) && (viewData.url)) url = viewData.url;
    }

    // Input is url
    if (input) url = input;

    // No url
    if (!url) return message.channel.sendMessage(":x:  **|  You must provide a link to save**");

    // Define title and description
    let title: any;
    let description: any;

    // Fetch
    if (!url.startsWith("eutenly://")) {

        // Parse url
        if ((!url.startsWith("http://")) && (!url.startsWith("https://"))) url = `http://${url}`;

        // Fetch
        const result: Response = await catchPromise(fetch(url, {
            headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36" }
        }));

        // Invalid response
        if ((!result) || (!result.ok)) return message.channel.sendMessage(":x:  **|  I couldn't find that website**");

        // Set url in case redirects were followed
        url = result.url;

        // Parse data
        const data: string = await result.text();

        // Parse
        const dom: any = cheerio.load(data);

        // Get title
        title = dom("title").first();
        title = title.length ? title.text() : undefined;

        // Get description
        description = dom(`meta[name="description"]`).first();
        description = description.length ? description.attr("content") : undefined;
    }

    // Add to saved links
    userData.savedLinks.push({
        title,
        description,
        url
    });

    // Save
    await saveDocument(userData);

    // Collect stats
    collectStat(message.client, {
        measurement: "saved_links_updated",
        tags: {
            action: "add",
            dms: message.guild ? undefined : true
        }
    });

    // Send
    message.channel.sendMessage(`:white_check_mark:  **|  Saved link! View your saved links with \`${message.channel.prefix}savedlinks\`**`);
}