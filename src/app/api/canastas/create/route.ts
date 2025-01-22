import { NextResponse } from "next/server";
import { addCanasta } from "@/db/canastas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, budget } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!budget) {
      return NextResponse.json({ error: "Budget is required" }, { status: 400 });
    }

    const userId = session.user.id;
    const result = await addCanasta(userId, name, budget);

    return NextResponse.json(
      { message: "Canasta created", canastaId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
