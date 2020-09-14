export default function catchPromise(promise: Promise<any>): Promise<any> {
    return new Promise((resolve) => promise
        .then(resolve)
        .catch(() => resolve(null)));
}