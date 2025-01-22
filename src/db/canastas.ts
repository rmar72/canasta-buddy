import clientPromise from "@/db/mongodb";

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
