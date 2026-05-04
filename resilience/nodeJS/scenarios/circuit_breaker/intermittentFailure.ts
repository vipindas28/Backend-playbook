import { flakyService } from "../../services/flakyService";
import { basicCircuitBreaker } from "../../circuit_breaker/basic_circuit_breaker";
import { thresholdCircuitBreaker } from "../../circuit_breaker/threshold_circuit_breaker";

const THRESHOLD = 3;
const COOLDOWN_MS = 5000;

async function runScenarios() {
        const basicCB = basicCircuitBreaker(flakyService, THRESHOLD);
        const thresholdCB = thresholdCircuitBreaker(flakyService, THRESHOLD, COOLDOWN_MS);

        await runSafe(basicCB);
        await runSafe(thresholdCB);

}

async function runSafe(fn: () => Promise<any>) {

    for (let index = 0; index < 10; index++) {
        console.log(`Request ${index}`);
        try {
            const result = await fn();
            console.log("Success: ", result);
        } catch {
            console.log("Request blocked or failed");
        }    
        await sleep(1000);
    }
}

function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}

runScenarios();