import Channel from "../classes/Channel/Channel";
import Client from "../classes/Client/Client";
import Embed from "../classes/Embed/Embed";
import Guild from "../classes/Guild/Guild";
import Message from "../classes/Message/Message";
import UserRequest from "../classes/UserRequest/UserRequest";

export default async function evalCommand(userRequest: UserRequest) {

    // Get params
    if (!(userRequest.source instanceof Message)) return;
    const code: string = userRequest.source.commandContent.split("eval").slice(1).join("eval");

    // Done function
    const done = (result: any) => {

        // Embed
        const embed = new Embed()
            .setAuthor("JavaScript Evaluation", "https://cdn.auth0.com/blog/es6rundown/logo.png")
            .setColor(0x42f44e);

        // Define formatted result
        let formattedResult: string | undefined;

        // Client
        if (result instanceof Client) embed
            .setTitle("Client")
            .setDescription(`User ID: ${result.id}`)
            .addField("Sequence Number", result.sequence?.toLocaleString(), true)
            .addField("Guilds", result.guilds.size.toLocaleString(), true)
            .addField("Cached Channels", result.channels.size.toLocaleString(), true);

        // Messages
        else if (result instanceof Message) embed
            .setTitle("Message")
            .setDescription(`\`\`\`\n${result.content}\`\`\``)
            .addField("Guild", result.guild ? `${result.guild.name} (${result.guild.id})` : "DMs", true)
            .addField("Author", `<@${result.author.id}> (${result.author.id})`, true)
            .addField("Channel", `<#${result.channel.id}> (${result.channel.id})`, true);

        // Channels
        else if (result instanceof Channel) embed
            .setTitle("Channel")
            .setDescription(`<#${result.id}> (${result.id})`)
            .addField("Guild", result.guild ? `${result.guild.name} (${result.guild.id})` : "DMs", true)
            .addField("Cached Messages", result.messages.size.toLocaleString(), true);

        // Guilds
        else if (result instanceof Guild) embed
            .setTitle("Guild")
            .setDescription(`${result.name} (${result.id})`);

        // Objects and arrays
        else if (typeof result === "object") {

            try {
                formattedResult = JSON.stringify(result, null, 4);
            }
            catch (e) {
                formattedResult = `[object ${result.constructor.name}]`;
            }
        }

        // Strings, numbers, bools, and null
        else if (result !== undefined) formattedResult = result;

        // Result
        if (formattedResult) embed.setDescription(`\`\`\`\n${formattedResult}\`\`\``);

        // Send
        userRequest.respond(embed);
    };

    // Error function
    const err = (e: Error) => {

        // Embed
        const embed = new Embed()
            .setTitle("Eval Error")
            .setAuthor("JavaScript Evaluation", "https://cdn.auth0.com/blog/es6rundown/logo.png")
            .setDescription("```\n" + e + "```")
            .setColor(0xe05151);

        // Send
        userRequest.respond(embed);
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