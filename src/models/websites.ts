import { Document, Schema, Types } from "mongoose";

interface Field {
    title?: string;
    description?: string;
    inline?: boolean;
}

export interface IWebsite extends Document {
    _id: string;
    fields: Types.Array<Field>;
}

export const websitesSchema: Schema = new Schema({
    _id: String,
    fields: [{
        title: String,
        description: String,
        inline: Boolean
    }]
});