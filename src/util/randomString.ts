import crypto from "crypto";

export default function randomString(length: number): Promise<string> {
    return new Promise((resolve) => {

        // Get random bytes
        crypto.randomBytes(length, (err: Error | null, data: Buffer) => {

            // Error
            if (err) throw err;

            // Resolve
            resolve(data.toString("hex"));
        });
    });
}