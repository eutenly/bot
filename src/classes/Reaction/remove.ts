import Reaction from "./Reaction";

export default async function remove(reaction: Reaction): Promise<void> {

    // Missing perms
    const deniedPermissions: number | undefined = reaction.guild?.deniedPermissions.get(reaction.channel.id);
    if ((deniedPermissions) && ((deniedPermissions & 0x2000) === 0x2000)) throw new Error("Missing permissions");

    // Add to fetch queue
    await reaction.channel.fetchQueues.removeReaction.request(`/channels/${reaction.channel.id}/messages/${reaction.message.id}/reactions/${reaction.name ? `${reaction.name}:` : ""}${reaction.id}/${reaction.user.id}`, {
        method: "DELETE"
    });
}