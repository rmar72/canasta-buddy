import { NextResponse } from "next/server";
import clientPromise from "@/db/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  const { canastaId, item } = await request.json();

  if (!canastaId || !item) {
    return NextResponse.json({ error: "Missing canastaId or item" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const objectId = ObjectId.createFromHexString(canastaId);
    const result = await db.collection("canastas").updateOne(
      { _id: objectId },
      { $push: { items: item }, $set: { updatedAt: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Failed to add item" }, { status: 400 });
    }

    return NextResponse.json({ message: "Item added successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
