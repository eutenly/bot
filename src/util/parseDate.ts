import moment, { Moment } from "moment";

export default function parseDate(input: string): string {

    // Create date object
    const date: Moment = moment(new Date(input.toString()));

    // Get absolute time
    const absoluteTime: string = date.format("ddd, MMM Do, YYYY, [at] h:mm:ss A");

    // Get relative time
    let relativeTime: string = moment.duration(date.diff(moment())).humanize(true);
    relativeTime = `${relativeTime.charAt(0).toUpperCase()}${relativeTime.substring(1)}`;

    // Return
    return `${relativeTime} (${absoluteTime})`;
}