import { Document, Schema } from "mongoose";

export interface IServer extends Document {
    _id: string;
    prefix?: string;
}

export const serversSchema: Schema = new Schema({
    _id: String,
    prefix: String
});