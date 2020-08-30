import typegoose from "@typegoose/typegoose";

import dataSchema from "./data";
import serversSchema from "./servers";
import websitesSchema from "./websites";

export const Data = typegoose.getModelForClass(dataSchema);
export const Servers = typegoose.getModelForClass(serversSchema);
export const Websites = typegoose.getModelForClass(websitesSchema);