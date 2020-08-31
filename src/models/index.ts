import { typedModel } from "ts-mongoose";
import { dataSchema } from "./data";
import { serversSchema } from "./servers";
import { websitesSchema } from "./websites";

export const Data = typedModel("data", dataSchema, "data");
export const Servers = typedModel("servers", serversSchema, "servers");
export const Websites = typedModel("websites", websitesSchema, "websites");