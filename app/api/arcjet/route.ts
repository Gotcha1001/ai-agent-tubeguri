// import { NextResponse } from "next/server";
// import { aj } from "@/config/Arcjet";

// export async function GET(req: Request) {
//   const userId = "user123";
//   const decision = await aj.protect(req, { userId, requested: 5 }); //
//   console.log("Arcjet decision", decision);

//   if (decision.isDenied()) {
//     if (decision.reason.isRateLimit()) {
//       return NextResponse.json(
//         { error: "Too Many Requests", reason: decision.reason },
//         { status: 429 }
//       );
//     }
//   }

//   return NextResponse.json({ message: "Hello world" });
// }

import { NextResponse, NextRequest } from "next/server";
import { getArcjet } from "@/config/Arcjet";

export async function GET(req: NextRequest) {
  const aj = getArcjet();
  const userId = "user123";

  // Create the adapter context with getBody method
  const context = {
    ...req,
    getBody: async () => {
      try {
        return await req.text();
      } catch {
        return "";
      }
    },
  };

  const decision = await aj.protect(context, { userId, requested: 5 });
  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: "Too Many Requests", reason: decision.reason },
        { status: 429 }
      );
    }
  }

  return NextResponse.json({ message: "Hello world" });
}
