import { ParserData } from "../../../classes/Command/Command";

export interface GitHubIssue {
    title: string;
    number: number;
    text: string;
    state: string;
    user: string;
    locked: boolean;
    labels: string[];
    createdOn: string;
}

export default function parse(data: any): ParserData {

    // No issue
    if (data.message) return { noData: true };

    // Return
    return {
        data: {
            title: data.title,
            number: data.number,
            state: data.state,
            text: data.body,
            user: data.user.login,
            locked: data.locked,
            labels: data.labels.map((l: any) => l.name),
            createdOn: data.created_at
        }
    };
}