import clientPromise from "@/db/mongodb";
// import bcrypt from "bcryptjs";

export async function verifyUser(email: string, password: string) {
  try {
    const client = await clientPromise;
    const db = client.db();
    console.log("Connecting to MongoDB...");

    const user = await db.collection("users").findOne({ email });
    console.log("user from DB:", user);

    if (!user) return null;

    // const isValid = await bcrypt.compare(password, user.password);
    // if (!isValid) return null;
    // In production, use a hashed password comparison (e.g., bcrypt)
    if (user.password !== password) return null;

    return { id: user._id.toString(), email: user.email };
  } catch (error) {
    console.error("Error verifying user:", error);
    return null;
  }
}
