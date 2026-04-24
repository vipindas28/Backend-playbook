export async function jitterRetry<T> (
    fn: () => Promise<T>,
    retries: number,
    delayMs: number
): Promise<T> {
    let lastError: unknown;

    for (let i=1; i <= retries; i++) {
        try {
            console.log(`Jitter Retry => Attempt ${i}`);
            return await fn();
        } catch (e) {
            lastError = e;
            // exponentially increases wait time 
            if (i < retries){
                const expDelay = delayMs * Math.pow(2, i-1);
                const jitter = Math.random() * expDelay;
                const delay = expDelay + jitter;

                console.log(`Waiting ${delay}ms`)
                await wait(delay);
            }
        }
    }
    throw lastError;
}

const wait = (ms: number) => new Promise(res => setTimeout(res, ms));