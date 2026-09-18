import { NextResponse } from "next/server";
import { getResponsesFromFirestore } from "@/lib/firebase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const authHeader = request.headers.get("authorization");
    const queryKey = searchParams.get("key");

    // The secret configured by Aji
    const expectedSecret = process.env.ADMIN_SECRET || process.env.RESPONSE_ACCESS_KEY || "aji123";

    let providedKey = "";
    if (authHeader && authHeader.startsWith("Bearer ")) {
      providedKey = authHeader.substring(7).trim();
    } else if (queryKey) {
      providedKey = queryKey.trim();
    }

    if (!providedKey || providedKey !== expectedSecret) {
      return NextResponse.json(
        { error: "Unauthorized access. Secret key required." },
        { status: 401 }
      );
    }

    const responses = await getResponsesFromFirestore();
    return NextResponse.json({ success: true, responses });
  } catch (error) {
    console.error("[API Responses GET Error]:", error);
    return NextResponse.json(
      { error: "Failed to retrieve responses." },
      { status: 500 }
    );
  }
}
