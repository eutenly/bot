import { Users } from "../../models";
import User from "../User/User";
import Client from "./Client";

export interface CreateUserData {
    id: string;
    bot: boolean;
}

export default async function createUser(client: Client, data: CreateUserData): Promise<User> {

    // User is cached
    let user: User | undefined = client.users.get(data.id);
    if (user) return user;

    // Get user data
    const userData = await Users.findById(data.id);

    // Create user
    user = new User(client, {
        id: data.id,
        bot: data.bot,
        data: userData || {}
    });

    // Return
    return user;
}