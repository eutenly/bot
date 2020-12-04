import { Users } from "../../models";
import User from "./User";

export default async function setCompactMode(user: User, enabled: boolean) {

    // Set compact mode
    user.compactMode = enabled;
    if (!user.compactMode) delete user.compactMode;

    // Update database
    await Users.findByIdAndUpdate(user.id, user.compactMode ? { compactMode: true } : { $unset: { compactMode: 1 } });
}