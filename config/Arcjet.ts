// import arcjet, { tokenBucket } from "arcjet";

// export const aj = arcjet({
//   key: process.env.ARCJET_KEY!,
//   rules: [
//     tokenBucket({
//       mode: "LIVE",
//       characteristics: ["userId"],
//       refillRate: 5000, // Refill 5 tokens per interval
//       interval: 30 * 24 * 60 * 60 * 1000, // Refill every 10 seconds
//       capacity: 5000, // Bucket capacity of 10 tokens
//     }),
//   ],
// });
import arcjet, { tokenBucket } from "arcjet";

export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  log: {
    debug: (...args: any[]) => console.debug("[Arcjet]", ...args),
    info: (...args: any[]) => console.info("[Arcjet]", ...args),
    warn: (...args: any[]) => console.warn("[Arcjet]", ...args),
    error: (...args: any[]) => console.error("[Arcjet]", ...args),
  },
  rules: [
    tokenBucket({
      mode: "LIVE",
      characteristics: ["userId"],
      refillRate: 5000, // Refill 5000 tokens per interval
      interval: 30 * 24 * 60 * 60 * 1000, // Refill every 30 days
      capacity: 5000, // Bucket capacity of 5000 tokens
    }),
  ],
});
