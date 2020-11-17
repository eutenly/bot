import { Users } from "../../models";
import User from "./User";

export default async function setReactionConfirmations(user: User, enabled: boolean) {

    // Set reaction confirmations
    user.reactionConfirmationsDisabled = !enabled;
    if (!user.reactionConfirmationsDisabled) delete user.reactionConfirmationsDisabled;

    // Update database
    await Users.findByIdAndUpdate(user.id, user.reactionConfirmationsDisabled ? { reactionConfirmationsDisabled: true } : { $unset: { reactionConfirmationsDisabled: 1 } });
}