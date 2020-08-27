import dotenv from "dotenv";
import Client from "./classes/Client/Client";
import Message from "./classes/Message/Message";
import Embed from "./classes/Channel/Embed/Embed";

// Configure env variables
dotenv.config();

// Create client
const client: Client = new Client(process.env.BOT_TOKEN || "");

client.on("message", async function(msg: Message) {
    if (msg.content === "e$reactions") {
        await msg.addReaction("left_arrow:733891669199552552");
        await msg.addReaction("right_arrow:733891695195848734");
    }
    if (msg.content === "e$anus") {
        await msg.channel.sendMessage(`anus`);
    }
    if (msg.content === "e$anusembed") {
        const embed = new Embed({
            title: "Embed in Class",
            description: "testy test est"
        });
        await msg.channel.sendMessage("", embed);
    }
    if (msg.content.startsWith("e$eval")) {
        if (msg.authorID !== "149862827027464193") {
            return;
        }
        try {
            eval(msg.content.slice(6));
        } catch (err) {
            const embed = new Embed({
                title: "Eval Error",
                description: "```" + err + "```",
                color: "14700881",
                footer: {text: "eutenly.com", icon_url: "https://cdn.discordapp.com/avatars/733809972630126612/469419e84eeaddf88b56a37c5d1b4f77.png"},
                author: {name: "JavaScript Evaluation", icon_url: "https://cdn.auth0.com/blog/es6rundown/logo.png", url: "https://eutenly.com"},
            });
            console.log(JSON.stringify(embed))
            await msg.channel.sendMessage("", embed);
        }
    }
});