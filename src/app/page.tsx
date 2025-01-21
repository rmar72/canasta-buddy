"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen">
      <main className="flex flex-col gap-4 row-start-2 sm:items-center max-w-2xl w-full sm:px-0">
        <p className="text-gray-700 text-center">
          View and manage your Canasta
          <Link href="/my-canasta" passHref>
            <Button variant="link" className="p-1 !text-700" style={{ color: "green" }}>here.</Button>
          </Link>
        </p>

      {/* Will include some analytic stats and some small sections with fun facts of saving money etc */}
      </main>
    </div>
  );
}
