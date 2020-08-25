interface GuildData {
    id: string;
    joinedAt: Date;
}

export default class Guild {

    // Data about the guild
    id: string;
    joinedAt: Date;

    // Constructor
    constructor(data: GuildData) {

        // Set data
        this.id = data.id;
        this.joinedAt = data.joinedAt;
    }
}