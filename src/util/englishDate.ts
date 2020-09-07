export default function englishDate(input: string): string {

    // Create date object
    const date: Date = new Date(input);

    // Get day
    const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day: string = days[date.getDay()];

    // Get month
    const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month: string = months[date.getMonth()];

    // Get date
    const dateNumber: number = date.getDate();

    // Get year
    const year: number = date.getFullYear();

    // Get hour
    let hour: number = date.getHours();

    // Get minute
    let minute: number | string = date.getMinutes();
    if (minute < 10) minute = `0${minute}`;

    // Get second
    let second: number | string = date.getSeconds();
    if (second < 10) second = `0${second}`;

    // Get AM/PM
    let amPm: string = hour < 12 ? "AM" : "PM";

    // Parse hour
    if (amPm === "PM") hour = hour - 12;
    if (hour === 0) hour = 12;

    // Return
    return `${day}, ${month} ${dateNumber}, ${year} at ${hour}:${minute}:${second} ${amPm} (GMT+0000, UTC)`;
}