import { NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { serverDb } from "@/lib/firebase-server";
import { z } from "zod";

const VoteSchema = z.object({
  candidateId: z.string().min(1).max(100),
  userId: z.string().min(1).max(128).optional().nullable(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = VoteSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: result.error.format() },
        { status: 400 }
      );
    }

    const { candidateId, userId } = result.data;

    await addDoc(collection(serverDb, "simulatedVotes"), {
      candidateId,
      userId: userId || null,
      timestamp: serverTimestamp(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Vote submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
