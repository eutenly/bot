export default function truncateString(input: string, length: number): string {

    // Return
    return `${input.substring(0, length)}${input.length > length ? "..." : ""}`;
}