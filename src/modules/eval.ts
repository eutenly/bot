import Embed from "../classes/Embed/Embed";
import Message from "../classes/Message/Message";

export default async function (msg: Message) {
    if (msg.authorID !== `${process.env.OWNER_ID}`) {
        return;
    }
    try {
        eval(msg.content.slice(6));
    } catch (err) {
        msg.addReaction("❌");
        const embed = new Embed({
            title: "Eval Error",
            description: "```" + err + "```",
            color: 14700881,
            author: {name: "JavaScript Evaluation", icon_url: "https://cdn.auth0.com/blog/es6rundown/logo.png", url: "https://eutenly.com"},
        });
        await msg.channel.sendMessage(embed);
        return;
    }
    msg.addReaction("✅");
}