import Embed from "../../classes/Embed/Embed";
import Message from "../../classes/Message/Message";

export default async function (msg: Message) {
    console.log("eval");
    if (msg.authorID !== `${process.env.OWNER_ID}`) {
        return;
    }
    try {
        eval(msg.content.slice(6));
    } catch (err) {
        const embed = new Embed({
            title: "Eval Error",
            description: "```" + err + "```",
            color: 14700881,
            footer: {text: "eutenly.com", icon_url: "https://cdn.discordapp.com/avatars/733809972630126612/469419e84eeaddf88b56a37c5d1b4f77.png"},
            author: {name: "JavaScript Evaluation", icon_url: "https://cdn.auth0.com/blog/es6rundown/logo.png", url: "https://eutenly.com"},
        });
        await msg.channel.sendMessage("", embed);
    }
}