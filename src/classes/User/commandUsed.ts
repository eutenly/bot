import { Users } from "../../models/index";
import User from "./User";

export default async function commandUsed(user: User, type: string) {

    // Update user data
    await Users.findByIdAndUpdate(user.id, { $inc: { [`commandsUsed.${type}`]: 1 } }, { upsert: true, setDefaultsOnInsert: true, new: true });
}