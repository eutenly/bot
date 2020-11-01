import { Document, Schema, Types } from "mongoose";

export interface CompactMode {
    channelID: string;
    enabled: boolean;
}

export interface IServer extends Document {
    _id: string;
    prefix?: string;
    compactMode: Types.Array<CompactMode>;
}

export const serversSchema: Schema = new Schema({
    _id: String,
    prefix: String,
    compactMode: [{
        channelID: String,
        enabled: Boolean
    }]
});