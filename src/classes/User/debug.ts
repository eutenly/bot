import * as sentry from "@sentry/node";
import Command from "../Command/Command";
import User from "../User/User";

export interface DebugExtraData {
    [index: string]: any;
}

export interface DebugData {
    message: string;
    fingerprint?: string;
    data?: DebugExtraData;
    command?: Command;
}

export default function debug(user: User, data: DebugData) {

    // Debug mode not enabled
    if (!user.debugMode) return;

    // Parse data
    if (!data.data) data.data = {};
    if (data.command) data.data.command = {
        name: data.command.name,
        category: data.command.category,
        author: {
            id: data.command.message.author.id,
            tag: data.command.message.author.tag
        },
        guildID: data.command.message.guild?.id,
        channelID: data.command.message.channel.id,
        url: data.command.url,
        compactMode: data.command.compactMode,
        page: data.command.pageManager?.page
    };

    // Log to sentry
    sentry.captureEvent({
        message: data.message,
        fingerprint: data.fingerprint ? [data.fingerprint] : undefined,
        level: sentry.Severity.Debug,
        extra: data.data,
        user: {
            id: user.id,
            username: user.tag
        }
    });
}