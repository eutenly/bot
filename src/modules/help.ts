import Embed from "../classes/Embed/Embed";
import Message from "../classes/Message/Message";
import { routes } from "./commandRouter/routes";

export default async function (message: Message) {
    // Split for arguments
    const args = message.content.split(" ");

    // Get prefix
    const activePrevix = message.guild?.prefix || process.env.DEFAULT_PREFIX;

    // Embed
    const embed = new Embed()
    .setTitle("Eutenly Help Center")
    .setColor(0x820020);

    // Switch for amount of arguments
    switch (args.length) {
        case 1:
            // When there are no arguments, show the help embed. For each route, make a field.
            routes.forEach(function (route) {
                // Ignore private commands
                if (route.private) return;

                // Add field
                embed.addField(activePrevix + route.inputs[0], `**${route.name}:** ${route.information}`);
            });

            embed.addField("Learn more about a command", "Run `" + activePrevix + "help <command>`");

            await message.channel.sendMessage(embed);
            return;
        case 2:
            // When there are arguments, search for the command
            const route = routes.find((route) => route.name.toLowerCase() === args[1].toLowerCase());

            // If no command (or command private), show error
            if (!route || route.private) {
                embed.setDescription("Cannot find information about `" + args[1] + "`!");
                await message.channel.sendMessage(embed);
                return;
            }

            // If command present, display information
            embed.setDescription("Information about `" + route.name + "`")
            .addField("Description", route.information)
            .addField("Usage", route.inputs.join(", "));
            await message.channel.sendMessage(embed);
            return;
    }
}