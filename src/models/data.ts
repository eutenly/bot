import { createSchema, Type } from "ts-mongoose";

export const dataSchema = createSchema({

    // ID
    _id: Type.string(),

    // Users blacklisted for spam
    blacklistedUsers: Type.array().of({
        id: Type.string(),
        reason: Type.string()
    }),

    // Servers blacklisted for spam
    blacklistedServers: Type.array().of({
        id: Type.string(),
        reason: Type.string()
    }),

    // Exceptions for bot farm detection
    botFarmWhitelist: Type.array().of(Type.string())
});