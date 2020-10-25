import { Document, Schema, Types } from "mongoose";

export interface SavedLink {
    title?: string;
    description?: string;
    url: string;
}

export interface IUser extends Document {
    _id: string;
    connections: {
        twitter: {
            id?: string;
            accessToken?: string;
            accessSecret?: string;
            connectedAt?: number;
        },
        reddit: {
            id?: string;
            accessToken?: string;
            refreshToken?: string;
            connectedAt?: number;
        },
        spotify: {
            id?: string;
            accessToken?: string;
            refreshToken?: string;
            connectedAt?: number;
        },
        github: {
            id?: string;
            accessToken?: string;
            connectedAt?: number;
        };
    };
    savedLinks: Types.Array<SavedLink>;
    voteExpireTimestamp?: number;
    patreonTier?: number;
}

export const usersSchema: Schema = new Schema({
    _id: String,
    connections: {
        twitter: {
            id: String,
            accessToken: String,
            accessSecret: String,
            connectedAt: Number
        },
        reddit: {
            id: String,
            accessToken: String,
            refreshToken: String,
            connectedAt: Number
        },
        spotify: {
            id: String,
            accessToken: String,
            refreshToken: String,
            connectedAt: Number
        },
        github: {
            id: String,
            accessToken: String,
            connectedAt: Number
        }
    },
    savedLinks: [{
        title: String,
        description: String,
        url: String
    }],
    voteExpireTimestamp: Number,
    patreonTier: Number
});