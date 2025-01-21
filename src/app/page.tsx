"use client";
import BudgetCalculator from "@/components/BudgetCalculator";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen">
      <main className="flex flex-col gap-4 row-start-2 sm:items-center max-w-2xl w-full sm:px-0">
        <h1 className="text-3xl font-bold text-center">My Canastas</h1>
        <p className="text-gray-700 text-center">
          View and manage your Canastas here.
        </p>
        <BudgetCalculator initialBudget={300} />
      </main>
    </div>
  );
}
