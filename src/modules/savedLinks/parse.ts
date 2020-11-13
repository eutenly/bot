import { ParserData } from "../../classes/Command/Command";

export default function parse(data: any): ParserData {

    // No issue
    if (!data) return { noData: true };

    // Return
    return {
        data
    };
}