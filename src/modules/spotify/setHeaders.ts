import { Headers } from "node-fetch";
import { Connection } from "../../classes/User/User";

export default function setHeaders(headers: Headers, connection: Connection = {}) {

    // Set headers
    headers.set("Authorization", `Bearer ${connection.accessToken}`);
}