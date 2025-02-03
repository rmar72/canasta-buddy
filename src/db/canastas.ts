import clientPromise from "@/db/mongodb";
import { Canasta } from "@/types/canasta";


export async function addCanasta(userId: string, name: string, budget: number) {
  const client = await clientPromise;
  const db = client.db("canasta-buddy");
  const collection = db.collection("canastas");

  const newCanasta = {
    userId,
    name,
    budget,
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [],
  };

  const result = await collection.insertOne(newCanasta);
  return result;
}

export async function updateCanasta(
  canastaId: string,
  updatedData: Partial<Canasta>
) {
  const response = await fetch("/api/canastas/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ canastaId, ...updatedData }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update canasta");
  }

  return await response.json();
}