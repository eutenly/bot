import Command from "../../../classes/Command/Command";
import Embed from "../../../classes/Embed/Embed";
import { Event } from "../types";

export default function embed(command: Command, data: Event[]): Embed {

    // Get prefix
    const prefix: string = command.message.channel.prefix;

    // Embed
    const embed = new Embed()
        .setAuthor("GitHub Events", "https://i.imgur.com/FwnDNtd.png")
        .setDescription(`Page ${command.pageManager?.page}`)
        .setColor(0x000000)
        .setBranding();

    // No data
    if (data.length === 0) return embed
        .setDescription("There aren't that many events")
        .setColor(0xf44242);

    // Build embed
    embed
        .setAuthor(`${command.pageManager?.input}: Events`, "https://i.imgur.com/FwnDNtd.png", `https://github.com/${command.pageManager?.input}`)
        .addField(null, null, true)
        .addField("Link", `[github.com...](https://github.com/${command.pageManager?.input})`, true)
        .addField(null, null, true);

    data.forEach((d: Event, i: number) => {

        /**
         * Commit Comment
         *
         * **1. [APixelVisuals/example](https://github.com/APixelVisuals/example)**
         * [APixelVisuals](https://github.com/APixelVisuals) commented on `1234567`
         */
        if (d.type === "CommitCommentEvent") embed.addField(null, `**${i + 1}. [${d.repo.name}](https://github.com/${d.repo.name})**\n[${d.user.name}](https://github.com/${d.user.name}) commented on \`${d.data.comment.commit_id.substring(0, 7)}\``);

        /**
         * Create
         *
         * **1. [APixelVisuals/example](https://github.com/APixelVisuals/example)**
         * [APixelVisuals](https://github.com/APixelVisuals) created a branch (master)
         */
        else if (d.type === "CreateEvent") embed.addField(null, `**${i + 1}. [${d.repo.name}](https://github.com/${d.repo.name})**\n[${d.user.name}](https://github.com/${d.user.name}) created a ${d.data.ref_type}${d.data.ref ? ` (${d.data.ref})` : ""}`);

        /**
         * Delete
         *
         * **1. [APixelVisuals/example](https://github.com/APixelVisuals/example)**
         * [APixelVisuals](https://github.com/APixelVisuals) deleted a branch (master)
         */
        else if (d.type === "DeleteEvent") embed.addField(null, `**${i + 1}. [${d.repo.name}](https://github.com/${d.repo.name})**\n[${d.user.name}](https://github.com/${d.user.name}) deleted a ${d.data.ref_type}${d.data.ref ? ` (${d.data.ref})` : ""}`);

        /**
         * Fork
         *
         * **1. [APixelVisuals/example](https://github.com/APixelVisuals/example)**
         * [APixelVisuals](https://github.com/APixelVisuals) forked this repo to [APixelVisuals/example-2](https://github.com/APixelVisuals/example-2)
         */
        else if (d.type === "ForkEvent") embed.addField(null, `**${i + 1}. [${d.repo.name}](https://github.com/${d.repo.name})**\n[${d.user.name}](https://github.com/${d.user.name}) forked this repo to [${d.data.forkee.owner.login}/${d.data.forkee.name}](https://github.com/${d.data.forkee.owner.login}/${d.data.forkee.name})`);

        /**
         * Gollum (Wiki)
         *
         * **1. [APixelVisuals/example](https://github.com/APixelVisuals/example)**
         * [APixelVisuals](https://github.com/APixelVisuals) edited 2 wiki pages
         */
        else if (d.type === "GollumEvent") embed.addField(null, `**${i + 1}. [${d.repo.name}](https://github.com/${d.repo.name})**\n[${d.user.name}](https://github.com/${d.user.name}) edited ${d.data.pages.length} wiki page${d.data.pages.length === 1 ? "" : "s"}`);

        /**
         * Issue Comment
         *
         * **1. [APixelVisuals/example](https://github.com/APixelVisuals/example)**
         * [APixelVisuals](https://github.com/APixelVisuals) commented on issue [#2](https://github.com/APixelVisuals/example/issues/2)
         */
        else if (d.type === "IssueCommentEvent") embed.addField(null, `**${i + 1}. [${d.repo.name}](https://github.com/${d.repo.name})**\n[${d.user.name}](https://github.com/${d.user.name}) commented on issue [#${d.data.issue.number}](https://github.com/${d.repo.name}/issues/${d.data.issue.number})`);

        /**
         * Issues
         *
         * **1. [APixelVisuals/example](https://github.com/APixelVisuals/example)**
         * [APixelVisuals](https://github.com/APixelVisuals) opened issue [#2](https://github.com/APixelVisuals/example/issues/2)
         */
        else if (d.type === "IssuesEvent") embed.addField(null, `**${i + 1}. [${d.repo.name}](https://github.com/${d.repo.name})**\n[${d.user.name}](https://github.com/${d.user.name}) ${d.data.action} issue [#${d.data.issue.number}](https://github.com/${d.repo.name}/issues/${d.data.issue.number})`);

        /**
         * Member
         *
         * **1. [APixelVisuals/example](https://github.com/APixelVisuals/example)**
         * [APixelVisuals](https://github.com/APixelVisuals) added [APixelAudibles](https://github.com/APixelAudibles) to the repo
         */
        else if (d.type === "MemberEvent") embed.addField(null, `**${i + 1}. [${d.repo.name}](https://github.com/${d.repo.name})**\n[${d.user.name}](https://github.com/${d.user.name}) added [${d.data.member.login}](https://github.com/${d.data.member.login}) to the repo`);

        /**
         * Public
         *
         * **1. [APixelVisuals/example](https://github.com/APixelVisuals/example)**
         * [APixelVisuals](https://github.com/APixelVisuals) made this repo public
         */
        else if (d.type === "PublicEvent") embed.addField(null, `**${i + 1}. [${d.repo.name}](https://github.com/${d.repo.name})**\n[${d.user.name}](https://github.com/${d.user.name}) made this repo public`);

        /**
         * Pull Request
         *
         * **1. [APixelVisuals/example](https://github.com/APixelVisuals/example)**
         * [APixelVisuals](https://github.com/APixelVisuals) opened pull request [#2](https://github.com/APixelVisuals/example/pull/2)
         */
        else if (d.type === "PullRequestEvent") embed.addField(null, `**${i + 1}. [${d.repo.name}](https://github.com/${d.repo.name})**\n[${d.user.name}](https://github.com/${d.user.name}) ${d.data.action} pull request [#${d.data.pull_request.number}](https://github.com/${d.repo.name}/pull/${d.data.pull_request.number})`);

        /**
         * Pull Request Review Comment
         *
         * **1. [APixelVisuals/example](https://github.com/APixelVisuals/example)**
         * [APixelVisuals](https://github.com/APixelVisuals) created a review comment on pull request [#2](https://github.com/APixelVisuals/example/pull/2)
         */
        else if (d.type === "PullRequestReviewCommentEvent") embed.addField(null, `**${i + 1}. [${d.repo.name}](https://github.com/${d.repo.name})**\n[${d.user.name}](https://github.com/${d.user.name}) created a review comment on pull request [#${d.data.pull_request.number}](https://github.com/${d.repo.name}/pull/${d.data.pull_request.number})`);

        /**
         * Push
         *
         * **1. [APixelVisuals/example](https://github.com/APixelVisuals/example)**
         * [APixelVisuals](https://github.com/APixelVisuals) pushed 2 commits
         */
        else if (d.type === "PushEvent") embed.addField(null, `**${i + 1}. [${d.repo.name}](https://github.com/${d.repo.name})**\n[${d.user.name}](https://github.com/${d.user.name}) pushed ${d.data.commits.length} commit${d.data.commits.length === 1 ? "" : "s"}`);

        /**
         * Release
         *
         * **1. [APixelVisuals/example](https://github.com/APixelVisuals/example)**
         * [APixelVisuals](https://github.com/APixelVisuals) published a release
         */
        else if (d.type === "ReleaseEvent") embed.addField(null, `**${i + 1}. [${d.repo.name}](https://github.com/${d.repo.name})**\n[${d.user.name}](https://github.com/${d.user.name}) published a release`);

        /**
         * Sponsorship
         *
         * **1. [APixelVisuals/example](https://github.com/APixelVisuals/example)**
         * [APixelVisuals](https://github.com/APixelVisuals) sponsored this repo
         */
        else if (d.type === "SponsorshipEvent") embed.addField(null, `**${i + 1}. [${d.repo.name}](https://github.com/${d.repo.name})**\n[${d.user.name}](https://github.com/${d.user.name}) sponsored this repo`);

        /**
         * Watch (star)
         *
         * **1. [APixelVisuals/example](https://github.com/APixelVisuals/example)**
         * [APixelVisuals](https://github.com/APixelVisuals) starred this repo
         */
        else if (d.type === "WatchEvent") embed.addField(null, `**${i + 1}. [${d.repo.name}](https://github.com/${d.repo.name})**\n[${d.user.name}](https://github.com/${d.user.name}) starred this repo`);
    });

    if (command.compactMode) embed.addField(null, `*React or use the \`${prefix}next\` and \`${prefix}previous\` commands to cycle through pages*`);
    else embed
        .addField()
        .addField("Navigation", `\u2022 Use the reactions to cycle through pages\n\u2022 Alternatively, you can use the \`${prefix}next\` and \`${prefix}previous\` commands\n\u2022 *Navigation for this search times out in 3 minutes*`)
        .addField();

    // Return
    return embed;
}