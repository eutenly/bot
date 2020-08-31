import { Document, Model } from "mongoose";
import { Data, Servers, Websites } from "./index";

interface DocumentObject {
    [key: string]: any;
}

interface Unsets {
    [key: string]: number;
}

export default async function save(...rawDocs: Document[]) {

    // Parse docs
    // The need to be of type `any` since we need to access internal metadata
    const docs: any[] = rawDocs.filter((d: Document) => d);

    // Define saving
    const saving: Array<Promise<Document | null>> = [];

    // Loop through docs
    for (let doc of docs) {

        // Get model
        const modelName: string = doc.constructor.modelName;

        let model: Model<Document> | undefined;
        if (modelName === "data") model = Data;
        else if (modelName === "servers") model = Servers;
        else if (modelName === "websites") model = Websites;
        if (!model) continue;

        // Get doc data
        const id: string = doc._id;
        const docObject: DocumentObject = doc.toObject();
        const modifiedPaths: string[] = doc.modifiedPaths().filter((mp: string) => (!mp.includes(".")) && (!docObject.hasOwnProperty(mp)));

        // Parse unsets
        const unsets: Unsets = {};
        modifiedPaths.forEach((mp: string) => unsets[mp] = 1);
        if (Object.keys(unsets).length) docObject["$unset"] = unsets;

        // Update doc
        saving.push(model.findByIdAndUpdate(id, docObject).exec());
    }

    // Await updates
    await Promise.all(saving);
}