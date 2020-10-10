import { Document, Schema, Types } from "mongoose";

interface BlocklistedItem {
    id: string;
    reason: string;
}

export interface IData extends Document {
    _id: string;
    blocklistedUsers: Types.Array<BlocklistedItem>;
    blocklistedServers: Types.Array<BlocklistedItem>;
    botFarmAllowlist: Types.Array<string>;
}

export const dataSchema: Schema = new Schema({
    _id: String,
    blocklistedUsers: [{
        id: String,
        reason: String
    }],
    blocklistedServers: [{
        id: String,
        reason: String
    }],
    botFarmAllowlist: [String]
});