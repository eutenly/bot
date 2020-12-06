import { ParserData } from "../../classes/Command/Command";

export default function parse(data: any): ParserData | undefined {

    // No issue
    if (!data) return;

    // Return
    return {
        data
    };
}