import { createSchema, Type } from "ts-mongoose";

export const serversSchema = createSchema({

    // Server ID
    _id: Type.string(),

    // The server's prefix
    prefix: Type.string()
});