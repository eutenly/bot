export default interface RateLimit {
    bucket: string;
    remaining: number;
    reset: number;
}