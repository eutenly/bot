import iso8601, { Duration } from "iso8601-duration";

export default function parseISO8601(input: string): string {

    // Parse
    const data: Duration = iso8601.parse(input);

    // Process
    const years: string | undefined = data.years ? `${data.years} year${data.years > 1 ? "s" : ""}` : undefined;
    const months: string | undefined = data.months ? `${data.months} month${data.months > 1 ? "s" : ""}` : undefined;
    const days: string | undefined = data.days ? `${data.days} day${data.days > 1 ? "s" : ""}` : undefined;
    const hours: string | undefined = data.hours ? `${data.hours} hour${data.hours > 1 ? "s" : ""}` : undefined;
    const minutes: string | undefined = data.minutes ? `${data.minutes} minute${data.minutes > 1 ? "s" : ""}` : undefined;
    const seconds: string | undefined = data.seconds ? `${data.seconds} second${data.seconds > 1 ? "s" : ""}` : undefined;

    // Return
    return [years, months, days, hours, minutes, seconds].filter((d: string | undefined) => d).join(", ");
}