import { Users } from "../../models/index";
import { IUser } from "../../models/users";
import User from "./User";

export default async function getData(user: User, upsert?: boolean): Promise<IUser | null> {

    // Return user data
    return await Users.findByIdAndUpdate(user.id, {}, { upsert, setDefaultsOnInsert: true, new: true });
}