import { NextResponse } from "next/server";
import clientPromise from "@/db/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    // Validate session
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("canasta-buddy");

    // Fetch Canastas for the logged-in user
    const canastas = await db
      .collection("canastas")
      .find({ userId: session.user.id })
      .toArray();

    return NextResponse.json({ canastas });
  } catch (err) {
    console.error("Error fetching canastas:", err);
    return NextResponse.json(
      { error: "Failed to fetch Canastas" },
      { status: 500 }
    );
  }
}
