export default function parseDuration(input: number): string {

    // Get total seconds
    const totalSeconds: number = Math.ceil(input / 1000);

    // Process
    const hours: number | null = Math.floor(totalSeconds / 3600) || null;
    let minutes: number | string = Math.floor(totalSeconds % 3600 / 60);
    if ((hours) && (minutes < 10)) minutes = `0${minutes}`;
    let seconds: number | string = Math.floor(totalSeconds % 3600 % 60);
    if (seconds < 10) seconds = `0${seconds}`;

    // Return
    return [hours, minutes, seconds].filter((d: number | string | null) => d !== null).join(":");
}