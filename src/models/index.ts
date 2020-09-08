import { model, Model } from "mongoose";
import { dataSchema, IData } from "./data";
import { serversSchema, IServer } from "./servers";
import { usersSchema, IUser } from "./users";
import { websitesSchema, IWebsite } from "./websites";

export const Data = model<IData, Model<IData>>("data", dataSchema);
export const Servers = model<IServer, Model<IServer>>("servers", serversSchema);
export const Users = model<IUser, Model<IUser>>("users", usersSchema);
export const Websites = model<IWebsite, Model<IWebsite>>("websites", websitesSchema);