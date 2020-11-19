import Client from "../classes/Client/Client";

export default function generateID(client: Client): string {

    // Generate ID
    const id: string = `${Date.now()}${process.pid}${client.idGenerationIncrement}`;

    // Increment ID generation number
    client.idGenerationIncrement++;

    // Return
    return id;
}