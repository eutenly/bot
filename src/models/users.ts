import { Document, Schema, Types } from "mongoose";

interface SavedLink {
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
        },
        reddit: {
            id?: string;
            accessToken?: string;
            refreshToken?: string;
        },
        spotify: {
            id?: string;
            accessToken?: string;
            refreshToken?: string;
        },
        twitch: {
            id?: string;
            accessToken?: string;
            refreshToken?: string;
        },
        github: {
            id?: string;
            accessToken?: string;
        },
        wakatime: {
            id?: string;
            accessToken?: string;
            refreshToken?: string;
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
            accessSecret: String
        },
        reddit: {
            id: String,
            accessToken: String,
            refreshToken: String
        },
        spotify: {
            id: String,
            accessToken: String,
            refreshToken: String
        },
        twitch: {
            id: String,
            accessToken: String,
            refreshToken: String
        },
        github: {
            id: String,
            accessToken: String
        },
        wakatime: {
            id: String,
            accessToken: String,
            refreshToken: String
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