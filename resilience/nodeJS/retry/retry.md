# Retry Strategies 

In system design and resilience, a retry strategy determines how a client reacts when a service call fails due to a transient error

## Fixed Retry (Linear Retry)

The system waits for a constant, predefined amount of time between every attempt. 

🥇 **Best for:** very short-lived glitches in low-traffic systems where the recovery time is predictable.

🟢 **Pros:** Extremely simple to implement and understand.

🔴 **Cons:** Inefficient, if a service is down because it is overloaded, hitting it every 2 seconds consistently doesn't give it enough time to recover. It can lead to a ***retry storm***.

## Exponential Backoff

The wait time increases exponentially with each subsequent failure.  

🥇 **Best for:** Systems where failures might last longer, and you want to reduce the load on the failing service over time.

🟢 **Pros:** Gives the downstream service "breathing room" to recover.

🔴 **Cons:**  It can lead to ***Thundering Herds***. If hundred clients fail at the exact same time, they will all retry at the exact same time creating massive spikes of traffic that can crash the service again. 

## Exponential Backoff with Jitter

This adds a layer of randomness to the exponential backoff calculation. 

🥇 **Best for:** High-concurrency distributed systems.

🟢 **Pros:** It breaks the synchronization between clients. By spreading the retries out over a time window.

🔴 **Cons:** Slightly more complex to calculate mathematically.

