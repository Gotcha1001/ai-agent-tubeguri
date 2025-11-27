import arcjet, { tokenBucket } from "arcjet";

export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    tokenBucket({
      mode: "LIVE",
      characteristics: ["userId"],
      refillRate: 5000, // Refill 5 tokens per interval
      interval: 30 * 24 * 60 * 60 * 1000, // Refill every 10 seconds
      capacity: 5000, // Bucket capacity of 10 tokens
    }),
  ],
});
