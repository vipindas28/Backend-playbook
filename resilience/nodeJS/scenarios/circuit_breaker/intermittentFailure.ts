import { flakyService } from "../../services/flakyService";
import { basicCircuitBreaker } from "../../circuit_breaker/basic_circuit_breaker";

const THRESHOLD = 3;
const COOLDOWN_MS = 5000;


async function runScenarios() {
    const wrapped = basicCircuitBreaker(flakyService, THRESHOLD)

    for (let index = 0; index < 10; index++) {
        try {
            await wrapped();
        } catch (error) {
            console.log("Request blocked or failed");
        }    
    }
}

runScenarios();