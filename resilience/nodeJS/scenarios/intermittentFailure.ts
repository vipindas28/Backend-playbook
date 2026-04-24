import { flakyService } from "../services/flakyService";
import { fixedRetry } from "../retry/fixed_retry";

async function runScenarios() {
    try {
        const result = await fixedRetry(flakyService, 3, 1000);
        console.log("Final Result: ", result);
    } catch(e) {
        console.error("All retries failed:", e);
    }
}

runScenarios();