import { createSchema, Type } from "ts-mongoose";

export const websitesSchema = createSchema({

    // The URL for the website
    _id: Type.string(),

    // Custom fields for the embed
    fields: Type.array().of({
        title: Type.string(),
        description: Type.string(),
        inline: Type.boolean()
    })
});