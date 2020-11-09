import Reaction from "./Reaction";

export default async function remove(reaction: Reaction): Promise<void> {

    // Missing perms
    const permissions: number | undefined = reaction.guild?.permissions.get(reaction.channel.id);
    if ((permissions) && ((permissions & 0x2000) !== 0x2000)) throw new Error("Missing permissions");

    // Add to fetch queue
    await reaction.channel.fetchQueues.removeReaction.request(`/channels/${reaction.channel.id}/messages/${reaction.message.id}/reactions/${reaction.name ? `${reaction.name}:` : ""}${reaction.id}/${reaction.user.id}`, {
        method: "DELETE"
    });
}