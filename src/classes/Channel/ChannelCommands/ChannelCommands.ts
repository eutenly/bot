import { BaseCommand } from "../../../modules/commandRouter/routes";
import Command from "../../Command/Command";
import Channel from "../Channel";

interface ChannelCommandsData {
    sourceCommand: Command;
    commands: BaseCommand[];
}

export default class ChannelCommands {

    // The channel
    channel: Channel;

    // Data about the channel commands
    sourceCommand: Command;
    commands: BaseCommand[];

    // Constructor
    constructor(channel: Channel, data: ChannelCommandsData) {

        // Set data
        this.channel = channel;

        this.sourceCommand = data.sourceCommand;
        this.commands = data.commands;
    }
}