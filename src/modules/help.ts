import Embed from "../classes/Embed/Embed";
import Message from "../classes/Message/Message";
import { routes, CommandRoute } from "./commandRouter/routes";

export default async function (message: Message) {

    // Split for arguments
    const args: string[] = message.content.split(" ");

    // Get prefix
    const activePrevix: string = message.guild?.prefix || process.env.DEFAULT_PREFIX || "";

    // Embed
    const embed: Embed = new Embed()
        .setTitle("Eutenly Help Center")
        .setColor(0xf40b3d)
        .setBranding();

    // Switch for amount of arguments
    switch (args.length) {
        case 1:
            // When there are no arguments, show the help embed. For each route, make a field.
            routes.forEach((route: CommandRoute) => {
                // Ignore private commands
                if (route.private) return;

                // Add field
                embed.addField(route.name, `${route.information} (\`${activePrevix}${route.inputs[0]}\`)`);
            });

            embed
                .addField("Learn more about a command", "Run `" + activePrevix + "help <command>`")
                .addField(null, "[Add Eutenly](https://eutenly.com/invite) \u2022 [Support Server](https://discord.gg/feE2vaR) \u2022 [Website](https://eutenly.com) \u2022 [Vote](https://discordbots.org/bot/733753582507261999) \u2022 [Voter Perks](https://eutenly.com/voter-perks)");

            return message.channel.sendMessage(embed);
        case 2:
            // When there are arguments, search for the command
            const route = routes.find((route: CommandRoute) => route.name.toLowerCase() === args[1].toLowerCase());

            // If no command (or command private), show error
            if (!route || route.private) {
                embed.setDescription("Cannot find information about `" + args[1] + "`!");
                await message.channel.sendMessage(embed);
                return;
            }

            // If there's a help embed, send it
            if (route.helpEmbed) return message.channel.sendMessage(route.helpEmbed(activePrevix));

            // If command present, display information
            embed.setDescription("Information about `" + route.name + "`")
                .addField("Description", route.description || route.information)
                .addField("Command Aliases", route.inputs.join(", "))
                .addField(null, "[Add Eutenly](https://eutenly.com/invite) \u2022 [Support Server](https://discord.gg/feE2vaR) \u2022 [Website](https://eutenly.com) \u2022 [Vote](https://discordbots.org/bot/733753582507261999) \u2022 [Voter Perks](https://eutenly.com/voter-perks)");

            return message.channel.sendMessage(embed);
    }
}