import { NextResponse } from "next/server";
import { saveResponseToFirestore } from "@/lib/firebase";

function generateResponseId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `RESP-${result}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const {
      angerChoice,
      angerLevel,
      smiling,
      deserved,
      customDeservedNote,
      keepSayingSorry,
      finalChoice,
      sorryCount,
      pviMessage,
    } = body;

    // Server-side validations
    const validatedAngerLevel =
      typeof angerLevel === "number" && !isNaN(angerLevel)
        ? Math.max(0, Math.min(100, Math.round(angerLevel)))
        : 50;

    const validatedSorryCount =
      typeof sorryCount === "number" && !isNaN(sorryCount)
        ? Math.max(0, Math.min(100, Math.round(sorryCount)))
        : 50;

    const responseId = generateResponseId();
    const completedAt = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const result = await saveResponseToFirestore({
      responseId,
      angerChoice: typeof angerChoice === "string" ? angerChoice.slice(0, 50) : undefined,
      angerLevel: validatedAngerLevel,
      smiling: typeof smiling === "string" ? smiling.slice(0, 50) : undefined,
      deserved: typeof deserved === "string" ? deserved.slice(0, 100) : undefined,
      customDeservedNote:
        typeof customDeservedNote === "string" ? customDeservedNote.slice(0, 250) : undefined,
      keepSayingSorry:
        typeof keepSayingSorry === "string" ? keepSayingSorry.slice(0, 50) : undefined,
      finalChoice: typeof finalChoice === "string" ? finalChoice.slice(0, 50) : undefined,
      sorryCount: validatedSorryCount,
      pviMessage: typeof pviMessage === "string" ? pviMessage.slice(0, 500) : undefined,
      completedAt,
    });

    return NextResponse.json({
      success: true,
      responseId: result.responseId,
      source: result.source,
    });
  } catch (error) {
    console.error("[API Response Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "My apology machine had a tiny technical glitch 😂 Please try again.",
      },
      { status: 500 }
    );
  }
}
