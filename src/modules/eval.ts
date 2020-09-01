import Embed from "../classes/Embed/Embed";
import Message from "../classes/Message/Message";

export default async function (message: Message) {

    // Ignore non owners
    if ((!process.env.OWNERS) || (!process.env.OWNERS.split(",").includes(message.authorID))) return;

    // Get code
    const code = message.content.split("eval").slice(1).join("eval");

    // Done function
    const done = () => message.addReaction("✅");

    // Error function
    const err = (e: Error) => {

        // React
        message.addReaction("❌").catch(() => { });

        // Send
        const embed = new Embed()
            .setTitle("Eval Error")
            .setAuthor("JavaScript Evaluation", "https://cdn.auth0.com/blog/es6rundown/logo.png")
            .setDescription("```\n" + e + "```")
            .setColor(0xe05151);

        // Send
        message.channel.sendMessage(embed);
    };

    // Eval
    // tslint:disable-next-line
    eval(`

        const run = async () => {
            ${code}
        }

        run().then(done).catch(err);

    `);
}