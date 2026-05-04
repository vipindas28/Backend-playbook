type State = "CLOSED" | "OPEN";

export function basicCircuitBreaker<T>(
    fn: () => Promise<T>,
    failureThreshold: number
): () => Promise<T>{
    let failCount = 0;
    let state: State = "CLOSED";

    return async () => {
        if (state === "OPEN") {
            throw new Error("Basic Circuit Failed: Circuit is Open");
        }
        try {
            const result = await fn();
            failCount = 0;
            return result;
        } catch (e) {
            failCount++;
            console.log(`Basic Circuit Failure count: ${failCount}`);

            if (failCount >= failureThreshold) {
                state = "OPEN";
                console.log("Basic Circuit switched to OPEN")
            }
            throw e;            
        }
    }
}