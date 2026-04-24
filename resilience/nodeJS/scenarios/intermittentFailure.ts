import { flakyService } from "../services/flakyService";
import { fixedRetry } from "../retry/fixed_retry";
import { exponentialRetry } from "../retry/exponential_retry";

const RETRY = 3;
const DELAY = 1000;
async function runScenarios() {
    await runSafe(() => fixedRetry(flakyService, RETRY, DELAY));

    await runSafe(() => exponentialRetry(flakyService, RETRY, DELAY));
}

async function runSafe(fn: () => Promise<any>) {
    try {
        const result = await fn();
        console.log("Success: ", result);
    } catch {
        console.log(`Failed after ${RETRY} retries`);
    }
}

runScenarios();