"use client";
import BudgetCalculator from "@/components/BudgetCalculator";

export default function MyCanasta() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen">
      <main className="flex flex-col gap-4 row-start-2 sm:items-center max-w-2xl w-full sm:px-0">
        <h1 className="text-3xl font-bold text-center">My Canasta</h1>
        <BudgetCalculator initialBudget={300} />
      </main>
    </div>
  );
}
