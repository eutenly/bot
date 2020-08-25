import Guild from "./Guild";

interface MessageData {
    id: string;
    content: string;
    authorID: string;
    channelID: string;
    guild: Guild;
}

export default class Message {

    // Data about the message
    id: string;
    content: string;
    authorID: string;
    channelID: string;
    guild: Guild;

    // Constructor
    constructor(data: MessageData) {

        // Set data
        this.id = data.id;
        this.content = data.content;
        this.authorID = data.authorID;
        this.channelID = data.channelID;
        this.guild = data.guild;
    }
}