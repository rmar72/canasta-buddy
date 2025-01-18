import { NextResponse } from 'next/server';
import clientPromise from '@/db/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('canasta-buddy'); // Replace 'test' with your database name

    const collections = await db.listCollections().toArray();

    return NextResponse.json({ collections });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error connecting to database' }, { status: 500 });
  }
}
