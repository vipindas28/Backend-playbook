export async function flakyService(): Promise<string> {
    const random = Math.random();
    // 50% failure simulation
    if (random < 0.5) {
        throw new Error("Service response failed");
    }
    return "Service response successful";
}