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
            username?: string;
            accessToken?: string;
            accessSecret?: string;
            connectedAt?: number;
        },
        reddit: {
            id?: string;
            username?: string;
            accessToken?: string;
            refreshToken?: string;
            connectedAt?: number;
        },
        spotify: {
            id?: string;
            username?: string;
            accessToken?: string;
            refreshToken?: string;
            connectedAt?: number;
        },
        github: {
            id?: string;
            username?: string;
            accessToken?: string;
            connectedAt?: number;
        };
    };
    commandsUsed: {
        google?: number;
        youtube?: number;
        twitter?: number;
        spotify?: number;
        reddit?: number;
        github?: number;
        wikipedia?: number;
    };
    savedLinks: Types.Array<SavedLink>;
    voteExpireTimestamp?: number;
    patreonTier?: number;
    alphaTester?: boolean;
    betaTester?: boolean;
    betaServerOwner?: boolean;
}

export const usersSchema: Schema = new Schema({
    _id: String,
    connections: {
        twitter: {
            id: String,
            username: String,
            accessToken: String,
            accessSecret: String,
            connectedAt: Number
        },
        reddit: {
            id: String,
            username: String,
            accessToken: String,
            refreshToken: String,
            connectedAt: Number
        },
        spotify: {
            id: String,
            username: String,
            accessToken: String,
            refreshToken: String,
            connectedAt: Number
        },
        github: {
            id: String,
            username: String,
            accessToken: String,
            connectedAt: Number
        }
    },
    commandsUsed: {
        google: Number,
        youtube: Number,
        twitter: Number,
        spotify: Number,
        reddit: Number,
        github: Number,
        wikipedia: Number
    },
    savedLinks: [{
        title: String,
        description: String,
        url: String
    }],
    voteExpireTimestamp: Number,
    patreonTier: Number,
    alphaTester: Boolean,
    betaTester: Boolean,
    betaServerOwner: Boolean
});