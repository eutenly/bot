import { createSchema, Type } from "ts-mongoose";

export const usersSchema = createSchema({

    // User ID
    _id: Type.string(),

    // The user's connections
    connections: {

        twitter: {
            id: Type.string(),
            accessToken: Type.string(),
            accessSecret: Type.string()
        },

        reddit: {
            id: Type.string(),
            accessToken: Type.string(),
            refreshToken: Type.string()
        },

        spotify: {
            id: Type.string(),
            accessToken: Type.string(),
            refreshToken: Type.string()
        },

        twitch: {
            id: Type.string(),
            accessToken: Type.string(),
            refreshToken: Type.string()
        },

        github: {
            id: Type.string(),
            accessToken: Type.string()
        },

        wakatime: {
            id: Type.string(),
            accessToken: Type.string(),
            refreshToken: Type.string()
        }
    },

    // The user's saved links
    savedLinks: Type.array().of({
        url: Type.string(),
        note: Type.string()
    }),

    // When this user's vote expires
    voteExpireTimestamp: Type.number(),

    // What tier this user is on Patreon
    patreonTier: Type.number(),
});