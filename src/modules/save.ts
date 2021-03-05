import cheerio from "cheerio";
import fetch from "node-fetch";
import Command, { ViewData, ViewDataURL } from "../classes/Command/Command";
import Message from "../classes/Message/Message";
import UserRequest from "../classes/UserRequest/UserRequest";
import saveDocument from "../models/save";
import catchPromise from "../util/catchPromise";
import collectStat from "../util/collectStat";
import nsfwCheck from "../util/nsfwCheck";

export default async function save(userRequest: UserRequest) {

    // Get params
    const input: string | undefined = userRequest.getParameter<string>("link-or-result");

    // Get command
    const command: Command | undefined = userRequest.user.command;

    // Define url data
    let urlData: ViewDataURL | undefined;

    // Get user data
    const userData = await userRequest.user.getData(true);
    if (!userData) return;

    // Max saved links
    if (userData.savedLinks.length >= 15) return userRequest.respond(":x:  **|  You've reached the maximum number of saved links. Voters get their limit doubled from 15 saved links to 30 and Patrons can get an even higher limit.\n\nLearn more about voting (it's free!): https://eutenly.com/voter-perks\nBecome a Patron and support development: https://eutenly.com/patreon**");

    // Command url
    if ((!input) && (command) && (command.url)) urlData = command.url;

    // View
    else if ((command) && (command.view)) {

        // Get data
        let data: any;
        if (command.data) data = command.data;
        else data = command.pageManager?.cache.get(command.pageManager.page || 0);

        // Run module
        const viewData: ViewData | undefined = command.view(data, userRequest, command);

        // Set url
        if ((viewData) && (viewData.url)) urlData = viewData.url;
    }

    // Input is url
    else if (input) urlData = input;

    // No url
    if (!urlData) return userRequest.respond(":x:  **|  You must provide a link to save**");

    // Define title, description, and url
    let title: any = typeof urlData === "object" ? urlData.title : undefined;
    let description: any = typeof urlData === "object" ? urlData.description : undefined;
    let url: string = typeof urlData === "object" ? urlData.url : urlData;

    // Fetch
    if (!url.startsWith("eutenly://")) {

        // Parse url
        if ((!url.startsWith("http://")) && (!url.startsWith("https://"))) url = `http://${url}`;

        // Check NSFW
        const [success, nsfw] = await nsfwCheck(url);
        if (!success) return userRequest.respond(":x:  **|  I couldn't find that website**");
        if (nsfw) return userRequest.respond(":x:  **|  This website is not permitted on Eutenly!**");

        // Fetch
        const result: Response = await catchPromise(fetch(url, {
            headers: { "User-Agent": process.env.WEB_SCRAPING_USER_AGENT as string }
        }));

        // Invalid response
        if ((!result) || (!result.ok)) return userRequest.respond(":x:  **|  I couldn't find that website**");

        // Set url in case redirects were followed
        url = result.url;

        // Parse data
        const data: string = await result.text();

        // Parse
        const dom: any = cheerio.load(data);

        // Get title
        if (!title) {
            title = dom("title").first();
            title = title.length ? title.text() : undefined;
        }

        // Get description
        if (!description) {
            description = dom(`meta[name="description"]`).first();
            description = description.length ? description.attr("content") : undefined;
        }
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
    collectStat(userRequest.client, {
        type: "userInitiatedGuildEvent",
        userID: userRequest.user.id,
        guildID: userRequest.guild?.id,
        eventTrigger: userRequest.source instanceof Message ? "textCommand" : "slashCommand",
        eventService: "savedLinks",
        eventAction: "add"
    });

    // Send
    userRequest.respond(`:white_check_mark:  **|  Saved link! View your saved links with \`${userRequest.channel.prefix}savedlinks\`**`);
}