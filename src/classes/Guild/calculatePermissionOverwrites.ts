import Guild, { GuildDataRole, PermissionOverwrites } from "./Guild";
import { Permissions } from "./calculateDeniedPermissions";

export default function calculatePermissionOverwrites(guild: Guild, userID: string, roles: Map<string, GuildDataRole>, deniedPermissions: number, permOverwrites: PermissionOverwrites[], PERMISSIONS: Permissions): number {

    /**
     * Filter permission overwrites
     *
     * We only need the permission overwrites that apply to the member
     * For example, if the member doesn't have a role, we don't need to process the permission overwrites for it
     * We also don't need to process permission overwrites for members that aren't the member itself
     */
    permOverwrites = permOverwrites.filter((o: PermissionOverwrites) => o.id === userID || roles.has(o.id));

    // Set permission overwrite role positions
    // A `PermissionOverwrites` object doesn't have role positions, so we need to set them
    permOverwrites.forEach((o: PermissionOverwrites) => {

        // Get role
        const role = roles.get(o.id);
        if (!role) {

            // If the role doesn't exist, that means that it's a member
            // Members have top position
            o.position = Infinity;

            return;
        }

        // Set position
        o.position = role.position;
    });

    // Sort permission overwrites by position
    permOverwrites = permOverwrites.sort((a, b) => {

        if ((a.position === undefined) || (b.position === undefined)) return 0;

        return a.position - b.position;
    });

    // Loop through permission overwrites
    permOverwrites.forEach((o: PermissionOverwrites) => {

        // Parse permissions into integers
        const allow = parseInt(o.allow_new);
        const deny = parseInt(o.deny_new);

        // Loop through permissions
        for (let permission in PERMISSIONS) {

            // If the allowed permissions include the permission, remove it from the denied permissions
            if ((allow & PERMISSIONS[permission]) === PERMISSIONS[permission]) deniedPermissions &= ~PERMISSIONS[permission];

            // If the denied permissions include the permission, add it to the denied permissions
            else if ((deny & PERMISSIONS[permission]) === PERMISSIONS[permission]) deniedPermissions |= PERMISSIONS[permission];
        }
    });

    // Return
    return deniedPermissions;
}