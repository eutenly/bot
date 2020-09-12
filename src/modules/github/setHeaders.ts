import { Headers } from "node-fetch";
import { Connection } from "../../classes/User/User";

export default async function setHeaders(headers: Headers, connection: Connection = {}) {

    // Set headers
    headers.set("Authorization", `token ${connection.accessToken}`);
    headers.set("Accept", "application/vnd.github.v3+json");
}