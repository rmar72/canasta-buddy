import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/db/mongodb";
import { ObjectId } from "mongodb";
import { FoodItem } from "@/types/canasta";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { canastaId, name, budget, items } = await req.json();

    if (!canastaId || !ObjectId.isValid(canastaId)) {
      return NextResponse.json({ error: "Invalid or missing Canasta ID" }, { status: 400 });
    }

    // Ensure at least one field is provided for the update
    if (!name && !budget && !items) {
      return NextResponse.json(
        { error: "At least one field (name, budget, or items) must be provided for update" },
        { status: 400 }
      );
    }

    // Dynamically construct the update object
    const updateData: Partial<{
      name: string;
      budget: number;
      items: Array<FoodItem>; // Adjust the type of items if you know its structure
      updatedAt: Date;
    }> = {};
    if (name) updateData.name = name;
    if (budget) updateData.budget = budget;
    if (items) updateData.items = items;
    updateData.updatedAt = new Date();

    const client = await clientPromise;
    const db = client.db("canasta-buddy");
    const collection = db.collection("canastas");

    const userId = session.user.id;

    const result = await collection.updateOne(
      { _id: ObjectId.createFromHexString(canastaId), userId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Canasta not found or you do not have access" }, { status: 404 });
    }

    const updatedCanasta = {
      _id: ObjectId.createFromHexString(canastaId),
      userId,
      ...updateData
    }

    return NextResponse.json({
      canasta: updatedCanasta,
      message: "Canasta updated successfully",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
