import clientPromise from "@/db/mongodb";
import bcrypt from "bcryptjs";

export async function verifyUser(email: string, password: string) {
  try {
    const client = await clientPromise;
    const db = client.db();
    console.log("Connecting to MongoDB...");

    const user = await db.collection("users").findOne({ email });
    console.log("user from DB:", user);

    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    return { id: user._id.toString(), email: user.email };
  } catch (error) {
    console.error("Error verifying user:", error);
    return null;
  }
}

export async function createUser(email: string, password: string) {
  const client = await clientPromise;
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await db.collection("users").insertOne({
    email,
    password: hashedPassword,
  });

  return { id: result.insertedId.toString(), email };
}