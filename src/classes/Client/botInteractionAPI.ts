import bodyParser from "body-parser";
import express, { Express } from "express";
import http from "http";
import githubHelpEmbed from "../../modules/github/helpEmbed";
import redditHelpEmbed from "../../modules/reddit/helpEmbed";
import searchHelpEmbed from "../../modules/search/helpEmbed";
import spotifyHelpEmbed from "../../modules/spotify/helpEmbed";
import twitterHelpEmbed from "../../modules/twitter/helpEmbed";
import wikipediaHelpEmbed from "../../modules/wikipedia/helpEmbed";
import youtubeHelpEmbed from "../../modules/youtube/helpEmbed";
import Channel from "../Channel/Channel";
import Embed from "../Embed/Embed";
import User from "../User/User";
import Client from "./Client";

export default async function botInteractionAPI(client: Client) {

    // Define app
    const app: Express = express();
    app.use(bodyParser.json());

    // Check authorization token
    app.use((req, res, next) => {

        // Invalid authorization token
        if (req.get("Authorization") !== process.env.BOT_ENDPOINT_KEY) return res.sendStatus(401);

        // Next
        next();
    });

    // Create server
    http.createServer(app).listen(8085);

    // Help embed
    app.post("/api/v1/helpEmbed", async (req, res) => {

        // Get DM channel
        const dmChannel: Channel = await client.getDMChannel(req.body.user_id);

        // Get help embed
        let helpEmbed: Embed;
        if (req.body.embed === "search") helpEmbed = searchHelpEmbed(process.env.DEFAULT_PREFIX as string);
        else if (req.body.embed === "youtube") helpEmbed = youtubeHelpEmbed(process.env.DEFAULT_PREFIX as string);
        else if (req.body.embed === "twitter") helpEmbed = twitterHelpEmbed(process.env.DEFAULT_PREFIX as string);
        else if (req.body.embed === "spotify") helpEmbed = spotifyHelpEmbed(process.env.DEFAULT_PREFIX as string);
        else if (req.body.embed === "reddit") helpEmbed = redditHelpEmbed(process.env.DEFAULT_PREFIX as string);
        else if (req.body.embed === "github") helpEmbed = githubHelpEmbed(process.env.DEFAULT_PREFIX as string);
        else if (req.body.embed === "wikipedia") helpEmbed = wikipediaHelpEmbed(process.env.DEFAULT_PREFIX as string);
        else return res.sendStatus(400);

        // Send message
        dmChannel.sendMessage(helpEmbed);

        // Send status
        res.sendStatus(200);
    });

    // DM
    app.post("/api/v1/dm", async (req, res) => {

        // Get DM channel
        const dmChannel: Channel = await client.getDMChannel(req.body.user_id);

        // Send message
        dmChannel.sendMessage(req.body.message);

        // Send status
        res.sendStatus(200);
    });

    // Uncache Connection
    app.post("/api/v1/uncacheConnection", (req, res) => {

        // Get user
        const user: User | undefined = client.users.get(req.body.user_id);
        if (!user) return res.sendStatus(200);

        // Uncache connection
        user.uncacheConnection(req.body.connection);

        // Send status
        res.sendStatus(200);
    });
}