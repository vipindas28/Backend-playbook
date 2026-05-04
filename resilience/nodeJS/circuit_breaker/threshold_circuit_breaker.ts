type State = "CLOSED" | "OPEN" | "HALF_OPEN";

export function thresholdCircuitBreaker<T>(
    fn: () => Promise<T>,
    failureThreshold: number,
    cooldown: number
): () => Promise<T> {
    let failCount = 0;
    let state: State = "CLOSED";
    let nextAttempt = 0;

    return async () => {
        const now = Date.now();

        if (state === "OPEN") {
            if (now > nextAttempt) {
                state = "HALF_OPEN";
                console.log("Threshold Circuit Switching to HALF_OPEN");
            } else {
                throw new Error("Threshold Circuit is OPEN");
            }
        }

        try {
            const result = await fn();

            if (state === "HALF_OPEN") {
                console.log("Recovery successful, closing Threshold Circuit");
                state = "CLOSED";
                failCount = 0;
            }

            return result;
        } catch (err) {
            failCount++;

            if (failCount >= failureThreshold) {
                state = "OPEN";
                nextAttempt = now + cooldown;
                console.log("Threshold Circuit switched to OPEN");
            }

            throw err;
        }
    }
}