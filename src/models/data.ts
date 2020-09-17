import { Document, Schema, Types } from "mongoose";

interface BlacklistedItem {
    id: string;
    reason: string;
}

export interface IData extends Document {
    _id: string;
    blacklistedUsers: Types.Array<BlacklistedItem>;
    blacklistedServers: Types.Array<BlacklistedItem>;
    botFarmWhitelist: Types.Array<string>;
}

export const dataSchema: Schema = new Schema({
    _id: String,
    blacklistedUsers: [{
        id: String,
        reason: String
    }],
    blacklistedServers: [{
        id: String,
        reason: String
    }],
    botFarmWhitelist: [String]
});