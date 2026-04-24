export async function fixedRetry<T> (
    fn: () => Promise<T>,
    retries: number,
    delayMs: number
): Promise<T> {
    let lastError: unknown;

    for (let i=1; i <= retries; i++) {
        try {
            console.log(`Fixed Attempt ${i}`);
            return await fn();
        } catch (e) {
            lastError = e;
            if (i < retries){
                await wait(delayMs);
            }
        }
    }
    throw lastError;
}

const wait = (ms: number) => new Promise(res => setTimeout(res, ms));