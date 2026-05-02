import { NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { serverDb } from "@/lib/firebase-server";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.candidateId) {
    return NextResponse.json({ error: "candidateId is required" }, { status: 400 });
  }

  try {
    await addDoc(collection(serverDb, "simulatedVotes"), {
      candidateId: body.candidateId,
      userId: body.userId || null,
      timestamp: serverTimestamp(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to save vote" }, { status: 500 });
  }
}
