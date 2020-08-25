import Guild from "./Guild";

interface ReactionData {
    id: string;
    messageID: string;
    userID: string;
    channelID: string;
    guild: Guild;
}

export default class Reaction {

    // Data about the reaction
    id: string;
    messageID: string;
    userID: string;
    channelID: string;
    guild: Guild;

    // Constructor
    constructor(data: ReactionData) {

        // Set data
        this.id = data.id;
        this.messageID = data.messageID;
        this.userID = data.userID;
        this.channelID = data.channelID;
        this.guild = data.guild;
    }
}