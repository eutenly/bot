import { ParserData } from "../../../classes/Command/Command";

export default function parse(data: any): ParserData | undefined {

    // No user
    if (data.error === "invalidResponse") return;

    // Return
    return { data };
}